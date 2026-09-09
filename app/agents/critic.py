from langchain.agents import create_agent

from app.config import get_llm
from app.prompts.critic_prompt import CRITIC_PROMPT
from app.schemas.critic_schema import CriticResult


def create_critic_agent():

    llm = get_llm()

    critic_agent = create_agent(
        model=llm,
        tools=[],
        system_prompt=CRITIC_PROMPT,
        response_format=CriticResult
    )

    return critic_agent



def run_critic(
    topic: str,
    research_report: str
):

    critic_agent = create_critic_agent()

    response = critic_agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": f"""
Research Topic:

{topic}

Research Report:

{research_report}

Review this research report carefully.
"""
                }
            ]
        }
    )

    return response["structured_response"]