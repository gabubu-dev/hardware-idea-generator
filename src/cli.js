#!/usr/bin/env node

/**
 * CLI Interface for Hardware Idea Generator
 */

import { Command } from 'commander';
import { IdeaGenerator, FeasibilityAnalyzer, TemplateManager } from './index.js';
import { PROJECT_CATEGORIES } from './data/project-types.js';

const program = new Command();

program
  .name('hardware-idea-generator')
  .description('AI-driven hardware project idea generator')
  .version('1.0.0');

// Generate command
program
  .command('generate')
  .description('Generate hardware project ideas')
  .option('-s, --skill <level>', 'Skill level (beginner/intermediate/advanced)', 'beginner')
  .option('-b, --budget <amount>', 'Budget in dollars', '50')
  .option('-c, --category <type>', 'Project category (IoT/Robotics/Audio/Display/Automation)', 'general')
  .option('-t, --time <duration>', 'Available time (weekend/week/month)', 'weekend')
  .option('-n, --number <count>', 'Number of ideas to generate', '1')
  .action((options) => {
    console.log('🔧 Hardware Idea Generator\n');
    
    const generator = new IdeaGenerator();
    const analyzer = new FeasibilityAnalyzer();
    
    const count = parseInt(options.number);
    const budget = parseInt(options.budget);
    
    if (count > 1) {
      const ideas = generator.generateBatch({
        skillLevel: options.skill,
        budget: budget,
        timeAvailable: options.time
      }, count);
      
      console.log(`Generated ${ideas.length} project ideas:\n`);
      ideas.forEach((idea, index) => {
        console.log(`${index + 1}. ${idea.title}`);
        console.log(`   Category: ${idea.category} | Cost: $${idea.estimatedCost.min}-${idea.estimatedCost.max}`);
        console.log(`   ${idea.description}\n`);
      });
    } else {
      const idea = generator.generate({
        skillLevel: options.skill,
        budget: budget,
        category: options.category === 'general' ? undefined : options.category,
        timeAvailable: options.time
      });
      
      console.log('✨ Generated Project Idea\n');
      console.log('─'.repeat(60));
      console.log(`📦 ${idea.title}`);
      console.log(`📁 Category: ${idea.category}`);
      console.log(`🎓 Skill Level: ${idea.skillLevel}`);
      console.log(`\n${idea.description}\n`);
      
      console.log('Features:');
      idea.features.forEach(f => console.log(`  • ${f}`));
      
      if (idea.components.length > 0) {
        console.log('\nRequired Components:');
        idea.components.forEach(c => {
          console.log(`  • ${c.name} (${c.quantity}x) - $${c.estimatedCost}`);
        });
      }
      
      console.log('\n─'.repeat(60));
      console.log(`💰 Estimated Cost: $${idea.estimatedCost.min}-${idea.estimatedCost.max}`);
      console.log(`⏱️  Estimated Time: ${idea.estimatedTime}`);
      console.log('\nRun "npm run analyze" to get detailed feasibility analysis');
    }
  });

// Analyze command
program
  .command('analyze')
  .description('Analyze project feasibility')
  .option('-s, --skill <level>', 'Skill level', 'intermediate')
  .option('-c, --category <type>', 'Project category', 'IoT')
  .action((options) => {
    console.log('📊 Feasibility Analysis\n');
    
    const generator = new IdeaGenerator();
    const analyzer = new FeasibilityAnalyzer();
    
    const idea = generator.generate({
      skillLevel: options.skill,
      category: options.category
    });
    
    const analysis = analyzer.analyze(idea);
    
    console.log(`Project: ${analysis.projectTitle}`);
    console.log('─'.repeat(60));
    console.log(`\n💰 Cost Analysis:`);
    console.log(`   Estimated: $${analysis.estimatedCost.min}-${analysis.estimatedCost.max}`);
    console.log(`   Components: $${analysis.costBreakdown.components}`);
    console.log(`   Tools: $${analysis.costBreakdown.tools}`);
    console.log(`   Shipping: $${analysis.costBreakdown.shipping}`);
    
    console.log(`\n⏱️  Time Estimate: ${analysis.estimatedTime}`);
    console.log(`🎯 Complexity: ${analysis.complexityScore}/10 (${analysis.complexityFactors.rating})`);
    console.log(`📈 Feasibility Rating: ${analysis.feasibilityRating}/10`);
    console.log(`🎲 Success Probability: ${analysis.successProbability}`);
    
    console.log(`\n✨ ${analysis.recommendation}`);
    
    if (analysis.risks.length > 0) {
      console.log('\n⚠️  Potential Challenges:');
      analysis.risks.forEach(risk => console.log(`   • ${risk}`));
    }
    
    if (analysis.requiredSkills.length > 0) {
      console.log('\n🎓 Required Skills:');
      analysis.requiredSkills.forEach(skill => console.log(`   • ${skill}`));
    }
  });

// Template command
program
  .command('template')
  .description('Browse and use project templates')
  .option('-l, --list', 'List all templates')
  .option('-c, --category <type>', 'Filter by category')
  .option('-s, --skill <level>', 'Filter by skill level')
  .action((options) => {
    const manager = new TemplateManager();
    let templates = manager.getAll();
    
    if (options.category) {
      templates = manager.getByCategory(options.category);
    }
    
    if (options.skill) {
      templates = manager.getBySkillLevel(options.skill);
    }
    
    console.log('📋 Available Project Templates\n');
    console.log('─'.repeat(60));
    
    templates.forEach(template => {
      console.log(`\n${template.name}`);
      console.log(`  Category: ${template.category} | Platform: ${template.platform}`);
      console.log(`  Skill: ${template.skillLevel} | Cost: $${template.estimatedCost.min}-${template.estimatedCost.max}`);
      console.log(`  ${template.description}`);
    });
    
    console.log('\n─'.repeat(60));
    console.log(`Total templates: ${templates.length}`);
  });

// Categories command
program
  .command('categories')
  .description('List all project categories')
  .action(() => {
    console.log('📂 Project Categories\n');
    console.log('─'.repeat(60));
    
    PROJECT_CATEGORIES.forEach(cat => {
      console.log(`\n${cat.name}`);
      console.log(`  ${cat.description}`);
      console.log(`  Difficulty: ${cat.difficulty} | Popularity: ${cat.popularity}/10`);
    });
  });

program.parse();
