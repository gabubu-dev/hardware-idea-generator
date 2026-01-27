/**
 * AI-Driven Hardware Idea Generator
 * Generates creative hardware project ideas based on user constraints
 */

import { PROJECT_TEMPLATES } from '../data/project-types.js';
import { COMPONENTS_DB } from '../data/components.js';
import { generatePrompt } from './prompts.js';

export class IdeaGenerator {
  constructor() {
    this.templates = PROJECT_TEMPLATES;
    this.components = COMPONENTS_DB;
  }

  /**
   * Generate a hardware project idea
   * @param {Object} constraints - User constraints
   * @returns {Object} Generated project idea
   */
  generate(constraints = {}) {
    const {
      skillLevel = 'beginner',
      budget = 50,
      category = 'general',
      timeAvailable = 'weekend',
      interests = []
    } = constraints;

    // AI-driven selection logic
    const filteredTemplates = this._filterTemplates(skillLevel, budget, category);
    const selectedTemplate = this._selectBestTemplate(filteredTemplates, constraints);
    
    // Generate unique variation
    const idea = this._generateVariation(selectedTemplate, constraints);
    
    // Add components
    idea.components = this._selectComponents(idea, budget);
    
    // Add learning resources
    idea.learningResources = this._generateLearningResources(idea, skillLevel);
    
    return idea;
  }

  /**
   * Generate multiple ideas at once
   */
  generateBatch(constraints, count = 5) {
    const ideas = [];
    const categories = ['IoT', 'Robotics', 'Audio', 'Display', 'Automation'];
    const usedTitles = new Set();
    
    let attempts = 0;
    while (ideas.length < count && attempts < count * 3) {
      const category = categories[attempts % categories.length];
      const idea = this.generate({ ...constraints, category });
      
      // Only add if we haven't seen this title before
      if (!usedTitles.has(idea.title)) {
        ideas.push(idea);
        usedTitles.add(idea.title);
      }
      attempts++;
    }
    
    return ideas;
  }

  /**
   * Filter templates based on constraints
   */
  _filterTemplates(skillLevel, budget, category) {
    const skillLevels = { beginner: 1, intermediate: 2, advanced: 3 };
    const userLevel = skillLevels[skillLevel] || 1;

    return this.templates.filter(template => {
      const templateLevel = skillLevels[template.skillLevel] || 1;
      const budgetMatch = template.estimatedCost.max <= budget * 1.2; // 20% tolerance
      const categoryMatch = category === 'general' || template.category === category;
      const levelMatch = templateLevel <= userLevel + 1; // Allow one level above
      
      return budgetMatch && categoryMatch && levelMatch;
    });
  }

  /**
   * Select the best template using AI-driven scoring
   */
  _selectBestTemplate(templates, constraints) {
    if (templates.length === 0) {
      // Fallback to a simple project
      return this._createFallbackTemplate(constraints);
    }

    // Score each template
    const scored = templates.map(template => ({
      template,
      score: this._scoreTemplate(template, constraints)
    }));

    // Sort by score and add some randomness for variety
    scored.sort((a, b) => b.score - a.score);
    
    // Select from top 3 with weighted randomness
    const topTemplates = scored.slice(0, Math.min(3, scored.length));
    const totalScore = topTemplates.reduce((sum, item) => sum + item.score, 0);
    
    let random = Math.random() * totalScore;
    for (const item of topTemplates) {
      random -= item.score;
      if (random <= 0) {
        return item.template;
      }
    }
    
    return topTemplates[0].template;
  }

  /**
   * Score a template based on how well it matches constraints
   */
  _scoreTemplate(template, constraints) {
    let score = 10;
    
    // Budget match (closer is better)
    const budgetDiff = Math.abs(template.estimatedCost.max - constraints.budget);
    score += (100 - budgetDiff) / 10;
    
    // Category exact match bonus
    if (template.category === constraints.category) {
      score += 5;
    }
    
    // Interest matching
    if (constraints.interests && constraints.interests.length > 0) {
      const interestMatch = constraints.interests.some(interest =>
        template.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase()))
      );
      if (interestMatch) score += 8;
    }
    
    // Popularity bonus (more popular = more resources available)
    score += template.popularity || 0;
    
    return score;
  }

  /**
   * Generate a unique variation of a template
   */
  _generateVariation(template, constraints) {
    const variations = this._getVariations(template);
    const variation = variations[Math.floor(Math.random() * variations.length)];
    
    return {
      id: this._generateId(),
      title: variation.title || template.title,
      description: variation.description || template.description,
      category: template.category,
      skillLevel: template.skillLevel,
      estimatedCost: template.estimatedCost,
      estimatedTime: template.estimatedTime,
      features: variation.features || template.features,
      tags: template.tags,
      steps: template.steps || [],
      components: [],
      learningResources: []
    };
  }

  /**
   * Get variations for a template
   */
  _getVariations(template) {
    const variations = template.variations || [
      {
        title: template.title,
        description: template.description,
        features: template.features
      }
    ];
    return variations;
  }

  /**
   * Select appropriate components
   */
  _selectComponents(idea, budget) {
    const category = idea.category;
    const relevantComponents = this.components.filter(comp => 
      comp.categories.includes(category) || comp.categories.includes('general')
    );

    const selected = [];
    let totalCost = 0;
    const maxCost = budget * 0.8; // Leave 20% buffer

    // Add essential components based on category
    const essentials = this._getEssentialComponents(category);
    for (const essentialName of essentials) {
      const comp = relevantComponents.find(c => c.name.includes(essentialName));
      if (comp && totalCost + comp.price <= maxCost) {
        selected.push({
          name: comp.name,
          quantity: 1,
          estimatedCost: comp.price,
          purpose: comp.purpose
        });
        totalCost += comp.price;
      }
    }

    return selected;
  }

  /**
   * Get essential components for a category
   */
  _getEssentialComponents(category) {
    const essentials = {
      'IoT': ['ESP32', 'Sensor', 'Breadboard'],
      'Robotics': ['Arduino', 'Motor', 'Sensor'],
      'Audio': ['Arduino', 'Speaker', 'Amplifier'],
      'Display': ['Arduino', 'LED', 'Display'],
      'Automation': ['Relay', 'Sensor', 'Arduino']
    };
    return essentials[category] || ['Arduino', 'Breadboard'];
  }

  /**
   * Generate learning resources
   */
  _generateLearningResources(idea, skillLevel) {
    const resources = [
      {
        type: 'tutorial',
        title: `Getting Started with ${idea.category} Projects`,
        description: 'Basic concepts and setup guide',
        difficulty: skillLevel
      },
      {
        type: 'documentation',
        title: 'Component Datasheets',
        description: 'Technical specifications for components',
        difficulty: 'all'
      }
    ];

    if (skillLevel === 'beginner') {
      resources.push({
        type: 'video',
        title: 'Beginner Electronics Course',
        description: 'Step-by-step video tutorials',
        difficulty: 'beginner'
      });
    }

    return resources;
  }

  /**
   * Create fallback template when no matches found
   */
  _createFallbackTemplate(constraints) {
    return {
      title: 'LED Blink Project',
      description: 'A simple beginner-friendly LED blinking project to get started with electronics.',
      category: 'Display',
      skillLevel: 'beginner',
      estimatedCost: { min: 10, max: 20 },
      estimatedTime: '2-4 hours',
      features: ['Simple circuit', 'Beginner friendly', 'Quick to build'],
      tags: ['beginner', 'led', 'basic'],
      popularity: 10
    };
  }

  /**
   * Generate unique ID
   */
  _generateId() {
    return 'HW' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
}
