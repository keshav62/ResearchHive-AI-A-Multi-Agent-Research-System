from langchain.agents import create_agent

from app.config import get_llm
from app.prompts.scout_prompt import SCOUT_PROMPT
from app.tools.tavily_search import search_tool


def create_scout_agent():

    llm = get_llm()

    scout_agent = create_agent(
        model=llm,
        tools=[search_tool],
        system_prompt=SCOUT_PROMPT,
    )

    return scout_agent