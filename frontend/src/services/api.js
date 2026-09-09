// API Service Layer — connects to FastAPI backend
const BASE_URL = 'http://127.0.0.1:8000';

/**
 * Start a research request
 * @param {string} topic - The research topic
 * @returns {Promise<Object>} Research results
 */
export async function startResearch(topic) {
  const response = await fetch(`${BASE_URL}/research`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `Server error: ${response.status}`);
  }

  return response.json();
}

/**
 * Health check — verify backend is reachable
 * @returns {Promise<boolean>}
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${BASE_URL}/health`, { method: 'GET' });
    return response.ok;
  } catch {
    return false;
  }
}

export default { startResearch, checkHealth };
