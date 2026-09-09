from app.agents.scout import create_scout_agent
from app.agents.researcher import create_researcher_agent
from app.services.research_pipeline import collect_research_documents
from app.agents.critic import run_critic
from app.agents.writer import run_writer


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

    # ==========================================
    # STEP 6: CRITIC AGENT
    # ==========================================

    print("\n" + "=" * 60)
    print("🕵️ CRITIC AGENT")
    print("=" * 60)

    critic_result = run_critic(
        topic=topic,
        research_report=final_research
    )

    print(f"\n⭐ Overall Score: {critic_result.overall_score}/10")

    print("\n✅ Strengths:")
    for item in critic_result.strengths:
        print(f"- {item}")

    print("\n❌ Weaknesses:")
    for item in critic_result.weaknesses:
        print(f"- {item}")

    print("\n🔍 Missing Information:")
    for item in critic_result.missing_information:
        print(f"- {item}")

    print("\n⚠️ Unsupported Claims:")
    for item in critic_result.unsupported_claims:
        print(f"- {item}")

    print("\n💡 Recommendations:")
    for item in critic_result.recommendations:
        print(f"- {item}")

    # ==========================================
    # STEP 7: WRITER AGENT
    # ==========================================

    print("\n" + "=" * 60)
    print("✍️ WRITER AGENT")
    print("=" * 60)

    final_report = run_writer(
        topic=topic,
        research_report=final_research,
        critic_feedback=critic_result
    )

    return {
    "topic": topic,
    "search_queries": search_queries,
    "documents": unique_documents,
    "research": final_research,
    "critic_feedback": critic_result,
    "final_report": final_report
    }