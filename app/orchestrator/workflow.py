from app.agents.scout import create_scout_agent
from app.agents.researcher import create_researcher_agent
from app.services.research_pipeline import collect_research_documents


def run_research_workflow(topic: str):

    # ==========================================
    # STEP 1: SCOUT AGENT
    # ==========================================

    print("\n" + "=" * 60)
    print("📰 SCOUT AGENT")
    print("=" * 60)

    scout_agent = create_scout_agent()

    scout_response = scout_agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": topic
                }
            ]
        }
    )

    # Get structured output from Scout
    scout_result = scout_response["structured_response"]

    search_queries = scout_result.search_queries

    print("\nGenerated Search Queries:\n")

    for index, query in enumerate(search_queries, start=1):
        print(f"{index}. {query}")

    # ==========================================
    # STEP 2: COLLECT DOCUMENTS
    # ==========================================

    print("\n" + "=" * 60)
    print("🔎 COLLECTING RESEARCH DOCUMENTS")
    print("=" * 60)

    all_documents = []

    for query in search_queries:

        print(f"\nSearching: {query}")

        documents = collect_research_documents(
            topic=query,
            max_results=2
        )

        all_documents.extend(documents)

    # ==========================================
    # STEP 3: REMOVE DUPLICATE URLS
    # ==========================================

    unique_documents = []
    seen_urls = set()

    for document in all_documents:

        url = document.get("url")

        if url and url not in seen_urls:

            seen_urls.add(url)
            unique_documents.append(document)

    print(f"\n📄 Total unique documents: {len(unique_documents)}")

    # ==========================================
    # STEP 4: PREPARE DOCUMENTS FOR RESEARCHER
    # ==========================================

    print("\nPreparing documents for Researcher Agent...")

    MAX_DOCUMENTS = 8
    MAX_CHARS_PER_DOCUMENT = 2500

    research_content = ""

    documents_for_research = unique_documents[:MAX_DOCUMENTS]

    for index, document in enumerate(documents_for_research, start=1):

        content = document.get("content", "")

        # Limit the content size
        content = content[:MAX_CHARS_PER_DOCUMENT]

        research_content += f"""

    SOURCE {index}

    TITLE: {document.get("title", "Unknown")}

    URL: {document.get("url", "")}

    CONTENT:
    {content}

    {'-' * 60}
    """

    print(
        f"\n📄 Sending {len(documents_for_research)} "
        f"documents to the Researcher Agent."
    )

    # ==========================================
    # STEP 5: RESEARCHER AGENT
    # ==========================================

    print("\n" + "=" * 60)
    print("🔍 RESEARCHER AGENT")
    print("=" * 60)

    researcher_agent = create_researcher_agent()

    researcher_response = researcher_agent.invoke(
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

    final_research = researcher_response["messages"][-1].content

    return {
        "topic": topic,
        "search_queries": search_queries,
        "documents": unique_documents,
        "research": final_research
    }