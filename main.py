from app.orchestrator.workflow import run_research_workflow


def main():

    print("=" * 60)
    print("🐝 RESEARCHHIVE AI")
    print("Multi-Agent Research System")
    print("=" * 60)

    topic = input("\nEnter your research topic: ")

    result = run_research_workflow(topic)

    print("\n" + "=" * 70)
    print("📚 FINAL DEEP RESEARCH REPORT")
    print("=" * 70 + "\n")

    print(result["research"])


if __name__ == "__main__":
    main()