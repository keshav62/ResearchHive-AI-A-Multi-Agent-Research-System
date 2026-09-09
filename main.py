from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas.research_schema import ResearchRequest
from app.orchestrator.workflow import run_research_workflow


app = FastAPI(
    title="ResearchHive AI API",
    description="Multi-Agent Research System API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "ResearchHive AI API is running 🐝"
    }


@app.post("/research")
def research(request: ResearchRequest):

    topic = request.topic

    result = run_research_workflow(topic)

    return {
        "topic": result["topic"],
        "search_queries": result["search_queries"],
        "research": result["research"],
        "critic_feedback": {
            "overall_score": result["critic_feedback"].overall_score,
            "strengths": result["critic_feedback"].strengths,
            "weaknesses": result["critic_feedback"].weaknesses,
            "missing_information": result["critic_feedback"].missing_information,
            "unsupported_claims": result["critic_feedback"].unsupported_claims,
            "contradictions": result["critic_feedback"].contradictions,
            "recommendations": result["critic_feedback"].recommendations,
        },
        "final_report": result["final_report"]
    }