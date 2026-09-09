import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProgressTracker from '../components/ProgressTracker';
import { startResearch } from '../services/api';
import { AlertCircle } from 'lucide-react';
import './ResearchProgress.css';

// Simulated step timing (ms) — replaced by real API call which resolves after all steps
const STEP_DURATIONS = [4000, 5000, 6000, 12000, 8000, 10000];

export default function ResearchProgress() {
  const { state } = useLocation();
  const navigate  = useNavigate();
  const topic     = state?.topic || 'Unknown topic';

  const [activeStep, setActiveStep]       = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [stats, setStats]                 = useState({ queries: '...', sources: '...' });
  const [error, setError]                 = useState(null);

  const stepTimerRef = useRef(null);
  const apiDoneRef   = useRef(false);
  const resultRef    = useRef(null);

  // Start the real API call immediately
  useEffect(() => {
    let cancelled = false;

    startResearch(topic)
      .then((result) => {
        if (cancelled) return;
        resultRef.current = result;
        apiDoneRef.current = true;
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || 'Research failed. Please try again.');
        apiDoneRef.current = true;
      });

    return () => { cancelled = true; };
  }, [topic]);

  // Advance steps in simulation; when last step completes AND API is done, navigate
  useEffect(() => {
    const totalSteps = STEP_DURATIONS.length;
    let currentStep  = 0;

    // Simulated stat updates
    const statUpdates = [
      { queries: 8,  sources: '...' },
      { queries: 8,  sources: 12 },
      { queries: 8,  sources: 12 },
      { queries: 8,  sources: 12 },
      { queries: 8,  sources: 12 },
      { queries: 8,  sources: 12 },
    ];

    function advanceStep() {
      if (currentStep >= totalSteps) {
        // All steps visually done — wait for API if still running
        const wait = () => {
          if (apiDoneRef.current) {
            if (resultRef.current) {
              // Save to history
              const history = JSON.parse(localStorage.getItem('rh-history') || '[]');
              history.unshift({
                id: Date.now(),
                topic,
                date: new Date().toISOString(),
                result: resultRef.current,
              });
              localStorage.setItem('rh-history', JSON.stringify(history.slice(0, 50)));
              navigate('/results', { state: { result: resultRef.current } });
            }
          } else {
            stepTimerRef.current = setTimeout(wait, 500);
          }
        };
        wait();
        return;
      }

      setActiveStep(currentStep);
      setStats(statUpdates[currentStep] || stats);

      stepTimerRef.current = setTimeout(() => {
        setCompletedSteps(prev => [...prev, currentStep]);
        currentStep++;
        advanceStep();
      }, STEP_DURATIONS[currentStep]);
    }

    advanceStep();

    return () => {
      if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
    };
  }, []);

  if (error) {
    return (
      <div className="research-progress">
        <Header pageTitle="Research in Progress" />
        <main className="research-progress__main">
          <div className="research-progress__error card">
            <AlertCircle size={32} className="research-progress__error-icon" />
            <h2>Research Failed</h2>
            <p>{error}</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/')}
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="research-progress">
      <Header
        pageTitle="Research in Progress"
        pageSubtitle="AI agents are working on your research"
      />
      <main className="research-progress__main">
        {/* Topic banner */}
        <div className="research-progress__topic card fade-in">
          <div className="research-progress__topic-label">Research Topic</div>
          <h2 className="research-progress__topic-value">"{topic}"</h2>
          <div className="research-progress__topic-status">
            <span className="spinner spinner-sm" />
            <span>Agents are actively processing your request...</span>
          </div>
        </div>

        {/* Tracker */}
        <div className="research-progress__tracker fade-in" style={{ animationDelay: '0.1s' }}>
          <ProgressTracker
            activeStep={activeStep}
            completedSteps={completedSteps}
            stats={stats}
          />
        </div>
      </main>
    </div>
  );
}
