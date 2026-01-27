/**
 * Complexity Analyzer
 * Analyzes project complexity across multiple dimensions
 */

export class ComplexityAnalyzer {
  /**
   * Analyze project complexity
   * @param {Object} idea - Project idea to analyze
   * @returns {Object} Complexity analysis
   */
  analyze(idea) {
    const factors = {
      technical: this._analyzeTechnicalComplexity(idea),
      assembly: this._analyzeAssemblyComplexity(idea),
      programming: this._analyzeProgrammingComplexity(idea),
      debugging: this._analyzeDebuggingComplexity(idea),
      integration: this._analyzeIntegrationComplexity(idea)
    };

    const overallScore = this._calculateOverallScore(factors);

    return {
      overallScore,
      rating: this._getRating(overallScore),
      factors: {
        ...factors,
        rating: this._getRating(overallScore)
      },
      details: this._generateDetails(factors)
    };
  }

  /**
   * Analyze technical complexity
   */
  _analyzeTechnicalComplexity(idea) {
    let score = 3; // Base score

    // Category complexity
    const categoryScores = {
      Display: 2,
      Audio: 5,
      IoT: 6,
      Robotics: 7,
      Automation: 6
    };
    score = categoryScores[idea.category] || 5;

    // Component count impact
    const componentCount = idea.components?.length || 0;
    if (componentCount > 10) score += 2;
    else if (componentCount > 5) score += 1;

    return Math.min(10, score);
  }

  /**
   * Analyze assembly complexity
   */
  _analyzeAssemblyComplexity(idea) {
    let score = 3;

    // Skill level impact
    const skillScores = {
      beginner: 2,
      intermediate: 5,
      advanced: 8
    };
    score = skillScores[idea.skillLevel] || 5;

    // Soldering requirements
    if (idea.tags?.includes('soldering')) score += 2;
    if (idea.tags?.includes('pcb')) score += 2;

    // Mechanical assembly
    if (idea.category === 'Robotics') score += 2;

    return Math.min(10, score);
  }

  /**
   * Analyze programming complexity
   */
  _analyzeProgrammingComplexity(idea) {
    let score = 2;

    // Check if programming is required
    if (idea.category === 'Display' && idea.skillLevel === 'beginner') {
      return 2; // Minimal programming
    }

    // Base on category
    const categoryScores = {
      Display: 3,
      Audio: 6,
      IoT: 7,
      Robotics: 7,
      Automation: 6
    };
    score = categoryScores[idea.category] || 5;

    // Cloud/network increases complexity
    if (idea.tags?.includes('wifi') || idea.tags?.includes('cloud')) score += 2;

    return Math.min(10, score);
  }

  /**
   * Analyze debugging complexity
   */
  _analyzeDebuggingComplexity(idea) {
    let score = 3;

    // More components = more potential issues
    const componentCount = idea.components?.length || 0;
    score += Math.min(componentCount / 3, 3);

    // Certain categories are harder to debug
    if (idea.category === 'Audio') score += 2;
    if (idea.category === 'IoT') score += 2;
    if (idea.category === 'Robotics') score += 1;

    // Real-time systems are harder
    if (idea.tags?.includes('realtime')) score += 1;

    return Math.min(10, score);
  }

  /**
   * Analyze integration complexity
   */
  _analyzeIntegrationComplexity(idea) {
    let score = 2;

    // Multiple subsystems increase complexity
    const hasMultipleSystems = 
      (idea.tags?.includes('sensor') ? 1 : 0) +
      (idea.tags?.includes('motor') ? 1 : 0) +
      (idea.tags?.includes('display') ? 1 : 0) +
      (idea.tags?.includes('wifi') ? 1 : 0);

    score += hasMultipleSystems * 1.5;

    // External services
    if (idea.tags?.includes('cloud') || idea.tags?.includes('api')) score += 2;

    return Math.min(10, Math.round(score));
  }

  /**
   * Calculate overall complexity score
   */
  _calculateOverallScore(factors) {
    const weights = {
      technical: 0.25,
      assembly: 0.20,
      programming: 0.25,
      debugging: 0.15,
      integration: 0.15
    };

    let weighted = 0;
    for (const [factor, score] of Object.entries(factors)) {
      weighted += score * weights[factor];
    }

    return Math.round(weighted * 10) / 10;
  }

  /**
   * Get complexity rating
   */
  _getRating(score) {
    if (score <= 3) return 'Simple';
    if (score <= 5) return 'Moderate';
    if (score <= 7) return 'Complex';
    return 'Very Complex';
  }

  /**
   * Generate detailed explanation
   */
  _generateDetails(factors) {
    const details = [];

    if (factors.technical > 7) {
      details.push('Advanced technical knowledge required');
    }
    if (factors.assembly > 7) {
      details.push('Complex assembly process');
    }
    if (factors.programming > 7) {
      details.push('Significant programming skills needed');
    }
    if (factors.debugging > 7) {
      details.push('May require extensive debugging');
    }
    if (factors.integration > 7) {
      details.push('Multiple systems need integration');
    }

    return details.length > 0 ? details : ['Straightforward project for skill level'];
  }

  /**
   * Suggest difficulty reduction strategies
   */
  suggestSimplifications(idea, analysis) {
    const suggestions = [];

    if (analysis.overallScore > 7) {
      suggestions.push('Consider breaking into smaller phases');
    }

    if (analysis.factors.programming > 7) {
      suggestions.push('Start with basic functionality, add features incrementally');
    }

    if (analysis.factors.integration > 7) {
      suggestions.push('Test each subsystem independently before integration');
    }

    if (idea.components?.length > 10) {
      suggestions.push('Start with essential components only');
    }

    return suggestions;
  }
}
