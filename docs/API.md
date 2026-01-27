# API Documentation

Complete API reference for the Hardware Idea Generator.

## Table of Contents

- [IdeaGenerator](#ideagenerator)
- [FeasibilityAnalyzer](#feasibilityanalyzer)
- [TemplateManager](#templatemanager)
- [CostEstimator](#costestimator)
- [ComplexityAnalyzer](#complexityanalyzer)

---

## IdeaGenerator

Main class for generating hardware project ideas.

### Constructor

```javascript
import { IdeaGenerator } from './src/index.js';
const generator = new IdeaGenerator();
```

### Methods

#### `generate(constraints)`

Generate a single hardware project idea.

**Parameters:**
- `constraints` (Object):
  - `skillLevel` (String): 'beginner', 'intermediate', or 'advanced'
  - `budget` (Number): Maximum budget in dollars
  - `category` (String): 'IoT', 'Robotics', 'Audio', 'Display', 'Automation', or 'general'
  - `timeAvailable` (String): 'weekend', 'week', or 'month'
  - `interests` (Array<String>): Optional array of interest keywords

**Returns:** Project idea object

**Example:**
```javascript
const idea = generator.generate({
  skillLevel: 'intermediate',
  budget: 75,
  category: 'IoT',
  timeAvailable: 'weekend',
  interests: ['plants', 'sensors']
});

console.log(idea.title); // "Smart Plant Monitoring System"
```

#### `generateBatch(constraints, count)`

Generate multiple project ideas at once.

**Parameters:**
- `constraints` (Object): Same as `generate()`
- `count` (Number): Number of ideas to generate (default: 5)

**Returns:** Array of project idea objects

**Example:**
```javascript
const ideas = generator.generateBatch({
  skillLevel: 'beginner',
  budget: 50
}, 10);

ideas.forEach(idea => {
  console.log(`${idea.title} ($${idea.estimatedCost.min}-${idea.estimatedCost.max})`);
});
```

### Project Idea Object Structure

```javascript
{
  id: 'HW-unique-id',
  title: 'Smart Plant Watering System',
  description: 'Automatically water plants based on soil moisture...',
  category: 'IoT',
  skillLevel: 'beginner',
  estimatedCost: { min: 30, max: 50 },
  estimatedTime: '4-6 hours',
  features: [
    'Automatic watering',
    'Soil monitoring',
    'WiFi notifications'
  ],
  tags: ['arduino', 'sensor', 'automation', 'wifi'],
  components: [
    {
      name: 'ESP32 DevKit',
      quantity: 1,
      estimatedCost: 10,
      purpose: 'Main microcontroller'
    }
  ],
  learningResources: [
    {
      type: 'tutorial',
      title: 'Getting Started with IoT',
      description: 'Basic concepts',
      difficulty: 'beginner'
    }
  ]
}
```

---

## FeasibilityAnalyzer

Analyzes project feasibility across multiple dimensions.

### Constructor

```javascript
import { FeasibilityAnalyzer } from './src/index.js';
const analyzer = new FeasibilityAnalyzer();
```

### Methods

#### `analyze(idea)`

Perform comprehensive feasibility analysis on a project idea.

**Parameters:**
- `idea` (Object): Project idea object from IdeaGenerator

**Returns:** Analysis object

**Example:**
```javascript
const idea = generator.generate({ skillLevel: 'intermediate' });
const analysis = analyzer.analyze(idea);

console.log(`Feasibility: ${analysis.feasibilityRating}/10`);
console.log(`Complexity: ${analysis.complexityScore}/10`);
console.log(`Success Probability: ${analysis.successProbability}`);
```

#### `compareProjects(ideas)`

Compare multiple project ideas and rank by feasibility.

**Parameters:**
- `ideas` (Array<Object>): Array of project idea objects

**Returns:** Comparison object with rankings

**Example:**
```javascript
const ideas = generator.generateBatch({ budget: 60 }, 5);
const comparison = analyzer.compareProjects(ideas);

console.log(`Most feasible: ${comparison.recommendation.projectTitle}`);
console.log(`Average feasibility: ${comparison.summary.averageFeasibility}`);
```

### Analysis Object Structure

```javascript
{
  projectId: 'HW-unique-id',
  projectTitle: 'Smart Plant Watering System',
  estimatedCost: {
    min: 30,
    max: 50
  },
  costBreakdown: {
    components: 31,
    tools: 10,
    shipping: 4.65,
    contingency: 6.2,
    total: 51.85
  },
  components: [...], // Component list with costs
  estimatedTime: '4-6 hours',
  complexityScore: 6.5,
  complexityFactors: {
    technical: 6,
    assembly: 5,
    programming: 7,
    debugging: 6,
    integration: 7,
    rating: 'Complex'
  },
  requiredSkills: [
    'Basic electronics',
    'Soldering',
    'WiFi configuration',
    'Programming (C/C++ or Python)'
  ],
  risks: [
    'Network configuration can be tricky',
    'May require cloud service setup'
  ],
  feasibilityRating: 8.5,
  recommendation: '✅ Highly feasible project - great choice!',
  successProbability: '75%'
}
```

---

## TemplateManager

Manages pre-built project templates with code examples.

### Constructor

```javascript
import { TemplateManager } from './src/index.js';
const manager = new TemplateManager();
```

### Methods

#### `getAll()`

Get all available templates.

**Returns:** Array of template objects

#### `getByCategory(category)`

Filter templates by category.

**Parameters:**
- `category` (String): Category name

**Returns:** Array of template objects

#### `getBySkillLevel(skillLevel)`

Filter templates by skill level.

**Parameters:**
- `skillLevel` (String): Skill level

**Returns:** Array of template objects

#### `getById(id)`

Get a specific template by ID.

**Parameters:**
- `id` (String): Template ID

**Returns:** Template object or undefined

#### `createFromTemplate(templateId, customizations)`

Create a project from a template with customizations.

**Parameters:**
- `templateId` (String): Template ID
- `customizations` (Object): Custom fields to override

**Returns:** Project object

**Example:**
```javascript
const templates = manager.getByCategory('IoT');
console.log(`Found ${templates.length} IoT templates`);

const weatherTemplate = manager.getById('esp32-weather');
const myProject = manager.createFromTemplate('esp32-weather', {
  name: 'My Custom Weather Station',
  location: 'Backyard'
});
```

### Template Object Structure

```javascript
{
  id: 'esp32-weather',
  name: 'WiFi Weather Station',
  category: 'IoT',
  platform: 'ESP32',
  skillLevel: 'intermediate',
  description: 'Internet-connected weather station...',
  files: {
    'main.ino': '// Arduino code here...',
    'config.h': '// Configuration...',
    'README.md': 'Project documentation'
  },
  components: [
    { name: 'ESP32', quantity: 1, cost: 10 }
  ],
  estimatedCost: { min: 30, max: 50 },
  estimatedTime: '4-6 hours'
}
```

---

## CostEstimator

Estimates project costs with detailed breakdown.

### Constructor

```javascript
import { CostEstimator } from './src/analysis/cost-estimator.js';
const estimator = new CostEstimator();
```

### Methods

#### `estimate(idea)`

Calculate total project cost with breakdown.

**Parameters:**
- `idea` (Object): Project idea object

**Returns:** Cost estimation object

#### `estimateComponentCost(componentName)`

Look up cost of a specific component.

**Parameters:**
- `componentName` (String): Component name (partial match)

**Returns:** Number (price) or null if not found

#### `suggestAlternatives(components)`

Find cheaper alternatives for components.

**Parameters:**
- `components` (Array<Object>): Component list

**Returns:** Array of alternative suggestions

#### `optimizeForBudget(components, maxBudget)`

Select components that fit within budget.

**Parameters:**
- `components` (Array<Object>): Full component list
- `maxBudget` (Number): Maximum budget

**Returns:** Optimization result with selected/skipped components

**Example:**
```javascript
const idea = generator.generate({ budget: 50 });
const cost = estimator.estimate(idea);

console.log(`Total: $${cost.total.min}-${cost.total.max}`);
console.log(`Components: $${cost.breakdown.components}`);
console.log(`Shipping: $${cost.breakdown.shipping}`);

// Find cheaper alternatives
const alternatives = estimator.suggestAlternatives(idea.components);
alternatives.forEach(alt => {
  console.log(`${alt.original} → ${alt.alternatives[0].name}`);
  console.log(`  Save $${alt.alternatives[0].savings}`);
});
```

---

## ComplexityAnalyzer

Analyzes project complexity across multiple dimensions.

### Constructor

```javascript
import { ComplexityAnalyzer } from './src/analysis/complexity.js';
const analyzer = new ComplexityAnalyzer();
```

### Methods

#### `analyze(idea)`

Analyze project complexity.

**Parameters:**
- `idea` (Object): Project idea object

**Returns:** Complexity analysis object

#### `suggestSimplifications(idea, analysis)`

Suggest ways to reduce project complexity.

**Parameters:**
- `idea` (Object): Project idea object
- `analysis` (Object): Complexity analysis result

**Returns:** Array of simplification suggestions

**Example:**
```javascript
const idea = generator.generate({ skillLevel: 'advanced' });
const complexity = analyzer.analyze(idea);

console.log(`Overall: ${complexity.overallScore}/10`);
console.log(`Rating: ${complexity.rating}`);
console.log(`Technical: ${complexity.factors.technical}/10`);
console.log(`Programming: ${complexity.factors.programming}/10`);

if (complexity.overallScore > 7) {
  const suggestions = analyzer.suggestSimplifications(idea, complexity);
  console.log('Simplification tips:');
  suggestions.forEach(tip => console.log(`  • ${tip}`));
}
```

### Complexity Analysis Object

```javascript
{
  overallScore: 6.5,
  rating: 'Complex',
  factors: {
    technical: 6,
    assembly: 5,
    programming: 7,
    debugging: 6,
    integration: 7,
    rating: 'Complex'
  },
  details: [
    'Advanced technical knowledge required',
    'Significant programming skills needed'
  ]
}
```

---

## Data Structures

### Component Database

Access the component database directly:

```javascript
import { COMPONENTS_DB } from './src/data/components.js';

// Find all sensors
const sensors = COMPONENTS_DB.filter(c => 
  c.categories.includes('sensor') || c.name.includes('Sensor')
);

console.log(`Found ${sensors.length} sensors`);
```

### Project Templates

Access project templates:

```javascript
import { PROJECT_TEMPLATES, PROJECT_CATEGORIES } from './src/data/project-types.js';

// Get all IoT projects
const iotProjects = PROJECT_TEMPLATES.filter(p => p.category === 'IoT');

// List categories
PROJECT_CATEGORIES.forEach(cat => {
  console.log(`${cat.name}: ${cat.description}`);
});
```

---

## Complete Example

Here's a complete example using multiple components:

```javascript
import { 
  IdeaGenerator, 
  FeasibilityAnalyzer, 
  TemplateManager 
} from './src/index.js';

// Initialize
const generator = new IdeaGenerator();
const analyzer = new FeasibilityAnalyzer();
const templates = new TemplateManager();

// Generate multiple ideas
const ideas = generator.generateBatch({
  skillLevel: 'intermediate',
  budget: 75,
  category: 'IoT'
}, 5);

// Analyze and compare
const comparison = analyzer.compareProjects(ideas);

console.log('Top 3 Projects:');
comparison.analyses.slice(0, 3).forEach((analysis, i) => {
  console.log(`\n${i + 1}. ${analysis.projectTitle}`);
  console.log(`   Feasibility: ${analysis.feasibilityRating}/10`);
  console.log(`   Complexity: ${analysis.complexityScore}/10`);
  console.log(`   Cost: $${analysis.estimatedCost.min}-${analysis.estimatedCost.max}`);
  console.log(`   ${analysis.recommendation}`);
});

// Get template for best project
const bestProject = comparison.recommendation;
console.log(`\nBest Project: ${bestProject.projectTitle}`);

// Check if similar template exists
const similarTemplates = templates.getByCategory(bestProject.category);
console.log(`\nFound ${similarTemplates.length} similar templates`);
```

---

## Error Handling

All methods may throw errors for invalid input:

```javascript
try {
  const idea = generator.generate({
    skillLevel: 'invalid',  // Will use default 'beginner'
    budget: -50,            // Invalid, will use default
  });
} catch (error) {
  console.error('Error generating idea:', error);
}
```

---

## TypeScript Support

While the project is written in JavaScript, you can use JSDoc for type hints:

```javascript
/**
 * @typedef {Object} ProjectIdea
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {string} skillLevel
 * @property {{min: number, max: number}} estimatedCost
 * @property {string} estimatedTime
 * @property {string[]} features
 * @property {Object[]} components
 */

/** @type {ProjectIdea} */
const idea = generator.generate({ skillLevel: 'beginner' });
```
