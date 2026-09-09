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