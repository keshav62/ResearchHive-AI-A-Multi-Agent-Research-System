from langchain.agents import create_agent

from app.config import get_llm
from app.prompts.researcher_prompt import RESEARCHER_PROMPT
from app.tools.tavily_search import search_tool


def create_researcher_agent():

    llm = get_llm()

    researcher_agent = create_agent(
        model=llm,
        tools=[search_tool],
        system_prompt=RESEARCHER_PROMPT,
    )

    return researcher_agent