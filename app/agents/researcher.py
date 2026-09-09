from langchain.agents import create_agent

from app.config import get_llm
from app.prompts.researcher_prompt import RESEARCHER_PROMPT


def create_researcher_agent():

    llm = get_llm()

    researcher_agent = create_agent(
        model=llm,
        tools=[],
        system_prompt=RESEARCHER_PROMPT,
    )

    return researcher_agent


def run_researcher(topic: str, research_content: str):

    researcher_agent = create_researcher_agent()

    response = researcher_agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": f"""
Research Topic:
{topic}

Collected Research Documents:

{research_content}

Perform deep research using the collected documents.

Analyze the information carefully and provide a detailed,
well-structured research report.
"""
                }
            ]
        }
    )

    return response["messages"][-1].content