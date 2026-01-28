"""Main hardware idea generation engine."""

import json
import os
from typing import List, Optional
import openai
from .models import HardwareIdea, IdeaGenerationRequest, FeasibilityAnalysis


class HardwareIdeaGenerator:
    """Generates creative hardware product ideas using AI."""
    
    CATEGORIES = [
        "iot_sensors",
        "wearables",
        "smart_home",
        "robotics",
        "environmental_monitoring",
        "health_tech",
        "maker_tools",
        "pet_tech",
        "sports_fitness",
        "automotive"
    ]
    
    def __init__(self, api_key: Optional[str] = None, model: str = "gpt-4"):
        """Initialize the idea generator.
        
        Args:
            api_key: OpenAI API key (defaults to OPENAI_API_KEY env var)
            model: OpenAI model to use
        """
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            raise ValueError("OpenAI API key required")
        
        openai.api_key = self.api_key
        self.model = model
    
    def generate_ideas(
        self,
        theme: Optional[str] = None,
        category: Optional[str] = None,
        num_ideas: int = 5,
        target_price_range: tuple[float, float] = (10.0, 200.0)
    ) -> List[HardwareIdea]:
        """Generate hardware product ideas.
        
        Args:
            theme: Optional theme or problem area (e.g., "sustainable living")
            category: Optional category to focus on
            num_ideas: Number of ideas to generate
            target_price_range: (min, max) target retail price in USD
            
        Returns:
            List of HardwareIdea objects
        """
        prompt = self._build_generation_prompt(theme, category, num_ideas, target_price_range)
        
        response = openai.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are a hardware product designer and entrepreneur with expertise in IoT, electronics, and product development."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.8,
            max_tokens=4000
        )
        
        ideas_text = response.choices[0].message.content
        ideas = self._parse_ideas(ideas_text)
        return ideas[:num_ideas]
    
    def analyze_feasibility(self, idea_description: str) -> FeasibilityAnalysis:
        """Analyze the feasibility of a hardware idea.
        
        Args:
            idea_description: Description of the hardware idea
            
        Returns:
            FeasibilityAnalysis with scores and recommendations
        """
        prompt = f"""Analyze the feasibility of this hardware product idea:

"{idea_description}"

Provide a detailed feasibility analysis with scores (0-10) for:
1. Technical Complexity (how hard to build?)
2. Manufacturing Cost (how affordable to manufacture?)
3. Market Demand (how much do people want this?)
4. Differentiation (how unique/different from existing products?)
5. Regulatory Hurdles (any compliance/safety issues?)

Also provide:
- Overall feasibility score (weighted average)
- Summary of key challenges and opportunities
- 3-5 specific recommendations for improving feasibility

Return as JSON with structure:
{{
    "technical_complexity": float,
    "manufacturing_cost": float,
    "market_demand": float,
    "differentiation": float,
    "regulatory_hurdles": float,
    "overall_score": float,
    "summary": "text",
    "recommendations": ["rec1", "rec2", ...]
}}
"""
        
        response = openai.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are a hardware product feasibility analyst with deep experience in electronics manufacturing and market analysis."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            response_format={"type": "json_object"}
        )
        
        analysis_data = json.loads(response.choices[0].message.content)
        return FeasibilityAnalysis(**analysis_data)
    
    def suggest_components(self, idea_description: str, budget: float) -> List[dict]:
        """Suggest specific components for implementing an idea.
        
        Args:
            idea_description: Description of the hardware idea
            budget: Target BOM budget in USD
            
        Returns:
            List of component suggestions with estimated costs
        """
        prompt = f"""For this hardware idea: "{idea_description}"

Suggest specific components needed to build it with a BOM budget of ${budget:.2f}.

Include:
- Microcontroller/processor
- Sensors/actuators
- Power supply/battery
- Connectivity (WiFi, BLE, etc.)
- PCB, enclosure, connectors
- Any specialized ICs or modules

For each component provide:
- Name/part number
- Function
- Estimated cost
- Recommended supplier

Return as JSON array.
"""
        
        response = openai.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are an electronics engineer specializing in component selection and BOM optimization."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.4,
            response_format={"type": "json_object"}
        )
        
        result = json.loads(response.choices[0].message.content)
        return result.get("components", [])
    
    def _build_generation_prompt(
        self,
        theme: Optional[str],
        category: Optional[str],
        num_ideas: int,
        price_range: tuple[float, float]
    ) -> str:
        """Build the prompt for idea generation."""
        prompt = f"Generate {num_ideas} creative but practical hardware product ideas.\n\n"
        
        if theme:
            prompt += f"Theme/Problem Area: {theme}\n"
        
        if category:
            prompt += f"Category: {category}\n"
        
        prompt += f"Target Retail Price Range: ${price_range[0]:.2f} - ${price_range[1]:.2f}\n\n"
        
        prompt += """For each idea, provide:
1. Name (catchy, descriptive)
2. Description (2-3 sentences)
3. Category (iot_sensors, wearables, smart_home, robotics, etc.)
4. Feasibility Score (0-10, considering complexity, cost, demand)
5. Estimated BOM Cost (components only)
6. Key Components (list 4-6 main parts)
7. Target Market (who would buy this?)
8. Unique Selling Points (3-5 USPs)
9. Similar Products (existing competitors)
10. Estimated Retail Price
11. Time to Prototype
12. Technical Challenges

Format as JSON array. Be creative but realistic - ideas should be buildable by a skilled maker/engineer.
"""
        return prompt
    
    def _parse_ideas(self, ideas_text: str) -> List[HardwareIdea]:
        """Parse generated ideas from AI response."""
        try:
            # Try to extract JSON from the response
            start = ideas_text.find('[')
            end = ideas_text.rfind(']') + 1
            
            if start == -1 or end == 0:
                # Try to find JSON object
                start = ideas_text.find('{')
                end = ideas_text.rfind('}') + 1
                json_str = ideas_text[start:end]
                data = json.loads(json_str)
                if "ideas" in data:
                    ideas_data = data["ideas"]
                else:
                    ideas_data = [data]
            else:
                json_str = ideas_text[start:end]
                ideas_data = json.loads(json_str)
            
            ideas = []
            for idea_dict in ideas_data:
                try:
                    idea = HardwareIdea(**idea_dict)
                    ideas.append(idea)
                except Exception as e:
                    print(f"Warning: Skipping invalid idea: {e}")
                    continue
            
            return ideas
        except Exception as e:
            print(f"Error parsing ideas: {e}")
            print(f"Response was: {ideas_text[:500]}")
            return []
