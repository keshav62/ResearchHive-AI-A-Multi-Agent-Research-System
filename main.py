from app.agents.researcher import create_researcher_agent
from app.services.research_pipeline import collect_research_documents


def main():

    topic = input("Enter your research topic: ")

    # Step 1: Tavily Search
    # Step 2: Get URLs
    # Step 3: Scrape URLs
    documents = collect_research_documents(
        topic=topic,
        max_results=5
    )

    if not documents:
        print("\n❌ No research documents were collected.")
        return

    print("\n" + "=" * 60)
    print("📄 DOCUMENTS COLLECTED")
    print("=" * 60)

    # Combine documents
    research_content = ""

    for index, document in enumerate(documents, start=1):

        research_content += f"""

SOURCE {index}

TITLE: {document["title"]}

URL: {document["url"]}

CONTENT:
{document["content"][:8000]}

{'-' * 60}
"""

    # Create Researcher Agent
    researcher_agent = create_researcher_agent()

    print("\n🔍 Researcher Agent is analyzing the documents...\n")

    response = researcher_agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": f"""
Research Topic:

{topic}

Research Documents:

{research_content}

Perform deep research on this topic using the documents above.
"""
                }
            ]
        }
    )

    print("\n" + "=" * 70)
    print("🔍 DEEP RESEARCH REPORT")
    print("=" * 70 + "\n")

    print(response["messages"][-1].content)


if __name__ == "__main__":
    main()