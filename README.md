<<<<<<< HEAD
# Hardware Idea Generator 🔧⚡

An AI-driven hardware project idea generator with feasibility analysis, templates, and comprehensive project planning tools.

## Features

- 🤖 **AI-Driven Idea Generation**: Generate creative hardware project ideas based on your interests, skill level, and available resources
- 📋 **Project Templates**: Ready-to-use templates for common hardware project types
- 🎯 **Feasibility Analysis**: Automated analysis of cost, complexity, time, and required skills
- 📊 **Component Recommendations**: Suggested parts and materials for each project
- 💡 **Working Examples**: Pre-configured example projects to get started quickly
=======
# Hardware Idea Generator

An AI-powered tool that generates creative and practical hardware product ideas based on current trends, market gaps, and technological capabilities. Perfect for hardware entrepreneurs, makers, and product designers looking for their next project.

## Features

- **Trend Analysis**: Analyzes current hardware trends from news, patents, and crowdfunding platforms
- **Market Gap Detection**: Identifies underserved niches and customer pain points
- **Feasibility Scoring**: Evaluates ideas based on technical complexity, cost, and manufacturability
- **Component Suggestions**: Recommends specific chips, sensors, and components for implementation
- **Competitor Analysis**: Finds similar existing products and analyzes differentiation opportunities
- **BOM Estimation**: Provides rough Bill of Materials cost estimates
- **AI-Powered Generation**: Uses LLMs to generate creative yet practical hardware concepts
>>>>>>> b8df695ac6df6a38bc088d2c1998784ea6d610fb

## Installation

```bash
<<<<<<< HEAD
npm install
=======
git clone https://github.com/gabubu-dev/hardware-idea-generator.git
cd hardware-idea-generator
pip install -r requirements.txt
```

## Quick Start

```python
from src.idea_generator import HardwareIdeaGenerator

# Initialize generator
generator = HardwareIdeaGenerator()

# Generate ideas based on a theme
ideas = generator.generate_ideas(
    theme="smart home automation",
    num_ideas=5,
    target_price_range=(20, 100)
)

# Print ideas with feasibility scores
for idea in ideas:
    print(f"\n{idea.name}")
    print(f"Description: {idea.description}")
    print(f"Feasibility Score: {idea.feasibility_score}/10")
    print(f"Estimated BOM Cost: ${idea.estimated_cost}")
    print(f"Key Components: {', '.join(idea.components)}")
>>>>>>> b8df695ac6df6a38bc088d2c1998784ea6d610fb
```

## Usage

<<<<<<< HEAD
### Generate New Project Ideas

```bash
npm run generate
```

Interactive mode will prompt you for:
- Skill level (beginner/intermediate/advanced)
- Budget range
- Project category (IoT, Robotics, Audio, etc.)
- Available time

### Analyze Project Feasibility

```bash
npm run analyze
```

Analyzes a project idea and provides:
- Cost estimation
- Complexity rating
- Time requirements
- Skill requirements
- Risk assessment

### Use Project Templates

```bash
npm run template
```

Browse and use pre-built templates:
- Arduino-based projects
- ESP32/ESP8266 IoT devices
- Raspberry Pi projects
- Custom PCB designs
- Robotics projects

### Run Examples

```bash
npm run example
```

## Project Structure

```
hardware-idea-generator/
├── src/
│   ├── index.js              # Main entry point
│   ├── cli.js                # CLI interface
│   ├── generators/
│   │   ├── idea-generator.js # AI-driven idea generation
│   │   ├── templates.js      # Project templates
│   │   └── prompts.js        # Prompt engineering
│   ├── analysis/
│   │   ├── feasibility.js    # Feasibility analyzer
│   │   ├── cost-estimator.js # Cost estimation
│   │   └── complexity.js     # Complexity scoring
│   ├── data/
│   │   ├── components.js     # Component database
│   │   └── project-types.js  # Project categories
│   └── examples/
│       ├── run-example.js    # Example runner
│       └── projects/         # Example projects
├── templates/                # Project templates
├── docs/                     # Documentation
└── README.md
```

## Example Project Ideas

The generator can create ideas like:

1. **Smart Plant Watering System** (Beginner, $30-50)
   - Soil moisture sensor + Arduino + relay + pump
   - Automatic watering based on soil conditions
   
2. **LED Music Visualizer** (Intermediate, $40-70)
   - Microphone + Arduino/ESP32 + LED strips
   - Real-time audio reactive lighting

3. **Home Security System** (Advanced, $100-200)
   - PIR sensors + camera + ESP32 + cloud integration
   - Motion detection with notifications

## API Usage

```javascript
import { IdeaGenerator, FeasibilityAnalyzer } from './src/index.js';

// Generate ideas
const generator = new IdeaGenerator();
const idea = generator.generate({
  skillLevel: 'intermediate',
  budget: 100,
  category: 'IoT',
  timeAvailable: 'weekend'
});

// Analyze feasibility
const analyzer = new FeasibilityAnalyzer();
const analysis = analyzer.analyze(idea);
console.log(analysis);
```

## Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this for any purpose.
=======
### Command Line Interface

Generate random ideas:
```bash
python -m src.cli generate --num 10 --output ideas.json
```

Generate ideas for a specific category:
```bash
python -m src.cli generate --category "wearables" --num 5
```

Analyze idea feasibility:
```bash
python -m src.cli analyze "Smart doorbell with facial recognition" --detailed
```

Get component recommendations:
```bash
python -m src.cli components "Temperature monitoring device" --budget 30
```

### Configuration

Create a `config.json` file:

```json
{
  "openai_api_key": "your-api-key",
  "serpapi_key": "your-serpapi-key",
  "model": "gpt-4",
  "categories": [
    "iot_sensors",
    "wearables",
    "smart_home",
    "robotics",
    "environmental_monitoring",
    "health_tech"
  ],
  "feasibility_factors": {
    "technical_complexity": 0.3,
    "manufacturing_cost": 0.25,
    "market_demand": 0.25,
    "differentiation": 0.2
  }
}
```

## Architecture

```
src/
├── idea_generator.py      # Main idea generation logic
├── trend_analyzer.py      # Analyzes current hardware trends
├── feasibility_scorer.py  # Scores ideas on multiple dimensions
├── component_db.py        # Database of common components and costs
├── market_analyzer.py     # Market research and competitor analysis
├── bom_estimator.py       # Bill of Materials cost estimation
├── cli.py                 # Command line interface
└── models.py              # Data models for ideas and components
```

## Generated Idea Structure

Each generated idea includes:

```python
{
    "name": "Smart Plant Monitor",
    "description": "IoT device that monitors soil moisture, light, and temperature",
    "category": "iot_sensors",
    "feasibility_score": 8.5,
    "estimated_cost": 15.75,
    "components": [
        "ESP32 microcontroller ($3)",
        "Soil moisture sensor ($2)",
        "Light sensor ($1.50)",
        "Temperature/humidity sensor ($2.25)",
        "Battery + charging circuit ($5)",
        "PCB and enclosure ($2)"
    ],
    "target_market": "Home gardeners, plant enthusiasts",
    "unique_selling_points": [
        "AI-powered watering recommendations",
        "Multi-plant monitoring via app",
        "Solar charging option"
    ],
    "similar_products": [
        "Xiaomi Plant Monitor - $25",
        "Parrot Flower Power - $40"
    ],
    "estimated_retail_price": 35,
    "time_to_prototype": "2-3 months",
    "technical_challenges": [
        "Waterproofing",
        "Battery life optimization",
        "Accurate soil moisture calibration"
    ]
}
```

## Idea Categories

- **IoT Sensors**: Environmental monitoring, security, tracking
- **Wearables**: Fitness, health monitoring, smart accessories
- **Smart Home**: Automation, energy management, comfort
- **Robotics**: Personal robots, educational, industrial automation
- **Environmental**: Air/water quality, weather stations, conservation
- **Health Tech**: Medical devices, wellness trackers, diagnostic tools

## Features

### Trend Analysis
Scrapes and analyzes:
- Kickstarter/Indiegogo campaigns
- Patent filings
- Tech news articles
- Reddit discussions (r/hardware, r/hwstartups)
- Product Hunt launches

### Feasibility Scoring

Evaluates ideas on:
- **Technical Complexity** (1-10): How difficult to build?
- **Manufacturing Cost** (1-10): Can it be made affordably?
- **Market Demand** (1-10): Do people want this?
- **Differentiation** (1-10): How unique is it?
- **Regulatory Hurdles** (1-10): Any compliance issues?

### Component Database

Built-in database of 500+ common components with:
- Current pricing (LCSC, Mouser, Digikey)
- Availability
- Typical use cases
- Alternative parts

## Examples

### Example 1: Generate Ideas for Smart Home

```bash
python -m src.cli generate --category "smart_home" --num 5 --max-cost 50
```

### Example 2: Analyze Your Idea

```bash
python -m src.cli analyze "A smart mirror that shows health metrics" --output analysis.json
```

### Example 3: Get BOM for Idea

```bash
python -m src.cli bom "Wireless temperature sensor network" --export-csv bom.csv
```

## Development

### Running Tests

```bash
pytest tests/
```

### Adding New Component Sources

Edit `src/component_db.py` to add new suppliers or update pricing.

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Submit a pull request

## Roadmap

- [ ] Integration with PCB design tools (KiCad)
- [ ] 3D model generation for enclosures
- [ ] Manufacturing partner recommendations
- [ ] Crowdfunding campaign text generation
- [ ] Patent similarity search
- [ ] Cost optimization suggestions

## License

MIT License - see LICENSE file for details

## Acknowledgments

- Component pricing data from LCSC, Mouser, and Digikey
- Trend data from Kickstarter, Indiegogo, and Product Hunt APIs
- Powered by OpenAI GPT-4 for creative ideation

## Inspiration

Inspired by successful hardware startups and the maker community. Many billion-dollar companies started with a simple hardware idea - let's find the next one!
>>>>>>> b8df695ac6df6a38bc088d2c1998784ea6d610fb
