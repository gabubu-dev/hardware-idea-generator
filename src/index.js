/**
 * Hardware Idea Generator - Main Entry Point
 */

import { IdeaGenerator } from './generators/idea-generator.js';
import { FeasibilityAnalyzer } from './analysis/feasibility.js';
import { TemplateManager } from './generators/templates.js';

export { IdeaGenerator, FeasibilityAnalyzer, TemplateManager };

// Main function for direct execution
export async function main() {
  console.log('🔧 Hardware Idea Generator\n');
  
  const generator = new IdeaGenerator();
  const analyzer = new FeasibilityAnalyzer();
  
  // Generate a sample idea
  const idea = generator.generate({
    skillLevel: 'intermediate',
    budget: 75,
    category: 'IoT',
    timeAvailable: 'weekend'
  });
  
  console.log('Generated Idea:');
  console.log('─'.repeat(50));
  console.log(`📦 ${idea.title}`);
  console.log(`\n${idea.description}\n`);
  
  // Analyze feasibility
  const analysis = analyzer.analyze(idea);
  
  console.log('Feasibility Analysis:');
  console.log('─'.repeat(50));
  console.log(`💰 Cost: $${analysis.estimatedCost.min}-${analysis.estimatedCost.max}`);
  console.log(`⏱️  Time: ${analysis.estimatedTime}`);
  console.log(`🎯 Complexity: ${analysis.complexityScore}/10`);
  console.log(`📊 Feasibility: ${analysis.feasibilityRating}/10`);
  console.log(`\n✨ ${analysis.recommendation}\n`);
  
  if (analysis.components.length > 0) {
    console.log('Required Components:');
    console.log('─'.repeat(50));
    analysis.components.forEach(comp => {
      console.log(`  • ${comp.name} (${comp.quantity}) - ~$${comp.estimatedCost}`);
    });
    console.log();
  }
  
  if (analysis.risks.length > 0) {
    console.log('⚠️  Potential Challenges:');
    analysis.risks.forEach(risk => console.log(`  • ${risk}`));
    console.log();
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
