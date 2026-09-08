from langchain.agents import create_agent

from app.config import get_llm
from app.prompts.scout_prompt import SCOUT_PROMPT
from app.schemas.scout_schema import ScoutResult


def create_scout_agent():

    llm = get_llm()

    scout_agent = create_agent(
        model=llm,
        tools=[],
        system_prompt=SCOUT_PROMPT,
        response_format=ScoutResult
    )

    return scout_agent