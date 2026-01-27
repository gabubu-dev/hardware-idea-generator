"""Data models for hardware ideas and components."""

from typing import List, Optional
from pydantic import BaseModel, Field


class Component(BaseModel):
    """Hardware component model."""
    name: str
    description: str
    estimated_cost: float = Field(gt=0)
    supplier: str = "Generic"
    part_number: Optional[str] = None
    availability: str = "In Stock"


class HardwareIdea(BaseModel):
    """Generated hardware product idea."""
    name: str
    description: str
    category: str
    feasibility_score: float = Field(ge=0, le=10)
    estimated_cost: float = Field(gt=0)
    components: List[str]
    target_market: str
    unique_selling_points: List[str]
    similar_products: List[str] = Field(default_factory=list)
    estimated_retail_price: Optional[float] = None
    time_to_prototype: Optional[str] = None
    technical_challenges: List[str] = Field(default_factory=list)
    market_demand_score: float = Field(ge=0, le=10, default=5.0)
    technical_complexity_score: float = Field(ge=0, le=10, default=5.0)
    differentiation_score: float = Field(ge=0, le=10, default=5.0)


class IdeaGenerationRequest(BaseModel):
    """Request parameters for idea generation."""
    theme: Optional[str] = None
    category: Optional[str] = None
    num_ideas: int = Field(default=5, ge=1, le=50)
    target_price_range: tuple[float, float] = Field(default=(10.0, 200.0))
    include_feasibility: bool = True
    include_bom: bool = True


class FeasibilityAnalysis(BaseModel):
    """Detailed feasibility analysis for an idea."""
    technical_complexity: float = Field(ge=0, le=10)
    manufacturing_cost: float = Field(ge=0, le=10)
    market_demand: float = Field(ge=0, le=10)
    differentiation: float = Field(ge=0, le=10)
    regulatory_hurdles: float = Field(ge=0, le=10)
    overall_score: float = Field(ge=0, le=10)
    summary: str
    recommendations: List[str]
