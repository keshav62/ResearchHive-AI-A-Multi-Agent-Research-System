from pydantic import BaseModel, Field


class CriticResult(BaseModel):

    overall_score: int = Field(
        description="Overall research quality score from 1 to 10"
    )

    strengths: list[str] = Field(
        description="Strong aspects of the research report"
    )

    weaknesses: list[str] = Field(
        description="Weak aspects of the research report"
    )

    missing_information: list[str] = Field(
        description="Important information missing from the report"
    )

    unsupported_claims: list[str] = Field(
        description="Claims that appear unsupported by the provided sources"
    )

    contradictions: list[str] = Field(
        description="Contradictions or inconsistencies found in the report"
    )

    recommendations: list[str] = Field(
        description="Specific recommendations for improving the report"
    )