from langchain.agents import create_agent

from app.config import get_llm
from app.prompts.writer_prompt import WRITER_PROMPT


def create_writer_agent():

    llm = get_llm()

    writer_agent = create_agent(
        model=llm,
        tools=[],
        system_prompt=WRITER_PROMPT,
    )

    return writer_agent

def run_writer(
    topic: str,
    research_report: str,
    critic_feedback
):

    writer_agent = create_writer_agent()

    response = writer_agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": f"""
            Research Topic:

            {topic}


            RESEARCH REPORT:

            {research_report}


            CRITIC FEEDBACK:

            Overall Score: {critic_feedback.overall_score}/10

            Strengths:
            {chr(10).join(f"- {item}" for item in critic_feedback.strengths)}

            Weaknesses:
            {chr(10).join(f"- {item}" for item in critic_feedback.weaknesses)}

            Missing Information:
            {chr(10).join(f"- {item}" for item in critic_feedback.missing_information)}

            Unsupported Claims:
            {chr(10).join(f"- {item}" for item in critic_feedback.unsupported_claims)}

            Contradictions:
            {chr(10).join(f"- {item}" for item in critic_feedback.contradictions)}

            Recommendations:
            {chr(10).join(f"- {item}" for item in critic_feedback.recommendations)}


            Create the final improved research report.
            """
                }
            ]
        }
    )

    return response["messages"][-1].content