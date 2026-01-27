/**
 * Feasibility Analyzer
 * Analyzes hardware project feasibility across multiple dimensions
 */

import { CostEstimator } from './cost-estimator.js';
import { ComplexityAnalyzer } from './complexity.js';

export class FeasibilityAnalyzer {
  constructor() {
    this.costEstimator = new CostEstimator();
    this.complexityAnalyzer = new ComplexityAnalyzer();
  }

  /**
   * Perform comprehensive feasibility analysis
   * @param {Object} idea - Project idea to analyze
   * @returns {Object} Feasibility analysis results
   */
  analyze(idea) {
    const costAnalysis = this.costEstimator.estimate(idea);
    const complexityAnalysis = this.complexityAnalyzer.analyze(idea);
    
    const timeEstimate = this._estimateTime(idea, complexityAnalysis);
    const risks = this._identifyRisks(idea, complexityAnalysis);
    const requiredSkills = this._identifyRequiredSkills(idea);
    const feasibilityRating = this._calculateFeasibilityRating(
      costAnalysis,
      complexityAnalysis,
      risks
    );

    return {
      projectId: idea.id,
      projectTitle: idea.title,
      estimatedCost: costAnalysis.total,
      costBreakdown: costAnalysis.breakdown,
      components: idea.components || [],
      estimatedTime: timeEstimate,
      complexityScore: complexityAnalysis.overallScore,
      complexityFactors: complexityAnalysis.factors,
      requiredSkills: requiredSkills,
      risks: risks,
      feasibilityRating: feasibilityRating,
      recommendation: this._generateRecommendation(feasibilityRating, risks),
      successProbability: this._calculateSuccessProbability(
        complexityAnalysis,
        idea.skillLevel,
        risks
      )
    };
  }

  /**
   * Estimate project time
   */
  _estimateTime(idea, complexityAnalysis) {
    const baseHours = {
      beginner: 4,
      intermediate: 8,
      advanced: 16
    };

    const base = baseHours[idea.skillLevel] || 8;
    const complexityMultiplier = complexityAnalysis.overallScore / 5;
    const totalHours = Math.round(base * complexityMultiplier);

    if (totalHours <= 4) return '2-4 hours';
    if (totalHours <= 8) return '4-8 hours';
    if (totalHours <= 16) return '1-2 days';
    if (totalHours <= 40) return '1 week';
    return '2+ weeks';
  }

  /**
   * Identify potential risks
   */
  _identifyRisks(idea, complexityAnalysis) {
    const risks = [];

    // Budget risks
    if (idea.estimatedCost.max > 100) {
      risks.push('High cost - consider starting with a smaller version');
    }

    // Complexity risks
    if (complexityAnalysis.overallScore > 7 && idea.skillLevel === 'beginner') {
      risks.push('Project may be too complex for skill level');
    }

    // Component availability
    if (idea.components && idea.components.length > 10) {
      risks.push('Many components required - procurement may take time');
    }

    // Category-specific risks
    const categoryRisks = {
      IoT: ['Network configuration can be tricky', 'May require cloud service setup'],
      Robotics: ['Motor tuning requires patience', 'Mechanical assembly can be challenging'],
      Audio: ['Audio quality depends on component quality', 'Noise interference is common'],
      Automation: ['Requires safety considerations', 'Testing can be time-consuming']
    };

    if (categoryRisks[idea.category]) {
      risks.push(...categoryRisks[idea.category]);
    }

    // Power supply risks
    if (idea.title.toLowerCase().includes('battery')) {
      risks.push('Battery life optimization may require iteration');
    }

    return risks.slice(0, 5); // Limit to top 5 risks
  }

  /**
   * Identify required skills
   */
  _identifyRequiredSkills(idea) {
    const skills = new Set();

    // Base skills
    skills.add('Basic electronics');
    skills.add('Soldering');

    // Category-specific skills
    const categorySkills = {
      IoT: ['WiFi/network configuration', 'API integration', 'Cloud platforms'],
      Robotics: ['Motor control', 'Sensor integration', 'Mechanical assembly'],
      Audio: ['Audio signal processing', 'Amplifier circuits', 'Acoustic principles'],
      Display: ['LED control', 'Display protocols (SPI/I2C)', 'Visual design'],
      Automation: ['Relay control', 'Safety systems', 'Real-time processing']
    };

    if (categorySkills[idea.category]) {
      categorySkills[idea.category].forEach(skill => skills.add(skill));
    }

    // Programming skills
    if (idea.category !== 'Display' || idea.skillLevel !== 'beginner') {
      skills.add('Programming (C/C++ or Python)');
    }

    // Advanced skills
    if (idea.skillLevel === 'advanced') {
      skills.add('PCB design');
      skills.add('Debugging complex systems');
    }

    return Array.from(skills);
  }

  /**
   * Calculate overall feasibility rating (1-10)
   */
  _calculateFeasibilityRating(costAnalysis, complexityAnalysis, risks) {
    let rating = 10;

    // Cost penalty
    if (costAnalysis.total.max > 150) rating -= 2;
    else if (costAnalysis.total.max > 100) rating -= 1;

    // Complexity penalty
    if (complexityAnalysis.overallScore > 8) rating -= 2;
    else if (complexityAnalysis.overallScore > 6) rating -= 1;

    // Risk penalty
    rating -= Math.min(risks.length * 0.3, 2);

    return Math.max(1, Math.min(10, Math.round(rating * 10) / 10));
  }

  /**
   * Generate recommendation text
   */
  _generateRecommendation(rating, risks) {
    if (rating >= 8) {
      return '✅ Highly feasible project - great choice for your goals!';
    } else if (rating >= 6) {
      return '👍 Good project feasibility - manageable with some planning';
    } else if (rating >= 4) {
      return '⚠️ Moderate feasibility - consider simplifying some aspects';
    } else {
      return '🔴 Challenging project - may want to start with something simpler';
    }
  }

  /**
   * Calculate success probability
   */
  _calculateSuccessProbability(complexityAnalysis, skillLevel, risks) {
    const skillMultipliers = {
      beginner: 0.6,
      intermediate: 0.8,
      advanced: 0.95
    };

    const baseProb = skillMultipliers[skillLevel] || 0.7;
    const complexityPenalty = (complexityAnalysis.overallScore / 10) * 0.2;
    const riskPenalty = (risks.length / 10) * 0.1;

    const probability = baseProb - complexityPenalty - riskPenalty;
    return `${Math.round(probability * 100)}%`;
  }

  /**
   * Compare multiple project ideas
   */
  compareProjects(ideas) {
    const analyses = ideas.map(idea => this.analyze(idea));
    
    analyses.sort((a, b) => b.feasibilityRating - a.feasibilityRating);
    
    return {
      analyses,
      recommendation: analyses[0],
      summary: {
        totalAnalyzed: analyses.length,
        averageFeasibility: (
          analyses.reduce((sum, a) => sum + a.feasibilityRating, 0) / analyses.length
        ).toFixed(1),
        mostFeasible: analyses[0].projectTitle,
        leastComplex: analyses.reduce((min, a) => 
          a.complexityScore < min.complexityScore ? a : min
        ).projectTitle
      }
    };
  }
}
