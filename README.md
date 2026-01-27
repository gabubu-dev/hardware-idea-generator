# Hardware Idea Generator 🔧⚡

An AI-driven hardware project idea generator with feasibility analysis, templates, and comprehensive project planning tools.

## Features

- 🤖 **AI-Driven Idea Generation**: Generate creative hardware project ideas based on your interests, skill level, and available resources
- 📋 **Project Templates**: Ready-to-use templates for common hardware project types
- 🎯 **Feasibility Analysis**: Automated analysis of cost, complexity, time, and required skills
- 📊 **Component Recommendations**: Suggested parts and materials for each project
- 💡 **Working Examples**: Pre-configured example projects to get started quickly

## Installation

```bash
npm install
```

## Usage

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
