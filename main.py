from app.orchestrator.workflow import run_research_workflow


def main():

    print("=" * 60)
    print("🐝 RESEARCHHIVE AI")
    print("Multi-Agent Research System")
    print("=" * 60)

    while True:

        topic = input("\nEnter your research topic: ")

        if topic.lower() == "exit":
            print("\nGoodbye! 👋")
            break

        result = run_research_workflow(topic)

        print("\n" + "=" * 70)
        print("📚 FINAL RESEARCH REPORT")
        print("=" * 70 + "\n")

        print(result["final_report"])


if __name__ == "__main__":
    main()