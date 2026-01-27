#!/usr/bin/env node

/**
 * Example Runner
 * Demonstrates the hardware idea generator capabilities
 */

import { IdeaGenerator, FeasibilityAnalyzer, TemplateManager } from '../index.js';

console.log('🔧 Hardware Idea Generator - Examples\n');
console.log('═'.repeat(70));

// Example 1: Generate ideas for different skill levels
console.log('\n📚 Example 1: Ideas for Different Skill Levels\n');

const generator = new IdeaGenerator();
const skillLevels = ['beginner', 'intermediate', 'advanced'];

skillLevels.forEach(skill => {
  const idea = generator.generate({
    skillLevel: skill,
    budget: 75,
    category: 'IoT'
  });
  
  console.log(`${skill.toUpperCase()}: ${idea.title}`);
  console.log(`  ${idea.description.substring(0, 80)}...`);
  console.log(`  Cost: $${idea.estimatedCost.min}-${idea.estimatedCost.max} | Time: ${idea.estimatedTime}\n`);
});

// Example 2: Compare multiple ideas
console.log('═'.repeat(70));
console.log('\n🔍 Example 2: Compare Multiple Project Ideas\n');

const ideas = generator.generateBatch({ skillLevel: 'intermediate', budget: 60 }, 3);
const analyzer = new FeasibilityAnalyzer();

const comparison = analyzer.compareProjects(ideas);

console.log('Comparison Results:');
console.log(`  Total projects analyzed: ${comparison.summary.totalAnalyzed}`);
console.log(`  Average feasibility: ${comparison.summary.averageFeasibility}/10`);
console.log(`  Most feasible: ${comparison.summary.mostFeasible}`);
console.log(`  Least complex: ${comparison.summary.leastComplex}\n`);

comparison.analyses.slice(0, 3).forEach((analysis, index) => {
  console.log(`${index + 1}. ${analysis.projectTitle}`);
  console.log(`   Feasibility: ${analysis.feasibilityRating}/10`);
  console.log(`   Complexity: ${analysis.complexityScore}/10`);
  console.log(`   Cost: $${analysis.estimatedCost.min}-${analysis.estimatedCost.max}\n`);
});

// Example 3: Detailed feasibility analysis
console.log('═'.repeat(70));
console.log('\n📊 Example 3: Detailed Feasibility Analysis\n');

const detailedIdea = generator.generate({
  skillLevel: 'intermediate',
  budget: 100,
  category: 'Robotics'
});

const detailedAnalysis = analyzer.analyze(detailedIdea);

console.log(`Project: ${detailedAnalysis.projectTitle}`);
console.log('─'.repeat(70));
console.log(`\nCost Breakdown:`);
console.log(`  Components: $${detailedAnalysis.costBreakdown.components}`);
console.log(`  Tools: $${detailedAnalysis.costBreakdown.tools}`);
console.log(`  Shipping: $${detailedAnalysis.costBreakdown.shipping}`);
console.log(`  Contingency: $${detailedAnalysis.costBreakdown.contingency}`);
console.log(`  Total: $${detailedAnalysis.estimatedCost.min}-${detailedAnalysis.estimatedCost.max}`);

console.log(`\nComplexity Analysis:`);
console.log(`  Overall Score: ${detailedAnalysis.complexityScore}/10`);
console.log(`  Rating: ${detailedAnalysis.complexityFactors.rating}`);
console.log(`  Technical: ${detailedAnalysis.complexityFactors.technical}/10`);
console.log(`  Programming: ${detailedAnalysis.complexityFactors.programming}/10`);
console.log(`  Assembly: ${detailedAnalysis.complexityFactors.assembly}/10`);

console.log(`\n${detailedAnalysis.recommendation}`);
console.log(`Success Probability: ${detailedAnalysis.successProbability}`);

if (detailedAnalysis.risks.length > 0) {
  console.log(`\nPotential Challenges:`);
  detailedAnalysis.risks.slice(0, 3).forEach(risk => {
    console.log(`  ⚠️  ${risk}`);
  });
}

// Example 4: Browse templates
console.log('\n═'.repeat(70));
console.log('\n📋 Example 4: Project Templates\n');

const templateManager = new TemplateManager();
const templates = templateManager.getAll();

console.log(`Available templates: ${templates.length}\n`);

const sampleTemplates = templates.slice(0, 4);
sampleTemplates.forEach(template => {
  console.log(`${template.name} (${template.platform})`);
  console.log(`  Category: ${template.category} | Skill: ${template.skillLevel}`);
  console.log(`  ${template.description.substring(0, 70)}...`);
  console.log(`  Cost: $${template.estimatedCost.min}-${template.estimatedCost.max}\n`);
});

// Example 5: Category-specific generation
console.log('═'.repeat(70));
console.log('\n🎯 Example 5: Category-Specific Ideas\n');

const categories = ['IoT', 'Robotics', 'Audio', 'Display'];

categories.forEach(category => {
  const categoryIdea = generator.generate({
    skillLevel: 'intermediate',
    budget: 50,
    category: category
  });
  
  console.log(`${category}: ${categoryIdea.title}`);
  console.log(`  ${categoryIdea.description.substring(0, 80)}...`);
  console.log(`  Features: ${categoryIdea.features.slice(0, 2).join(', ')}\n`);
});

console.log('═'.repeat(70));
console.log('\n✅ Examples completed! Try the CLI for interactive use:');
console.log('   npm run generate -- --skill intermediate --budget 75');
console.log('   npm run analyze -- --category IoT');
console.log('   npm run template -- --list\n');
