/**
 * Cost Estimator
 * Estimates project costs with component-level breakdown
 */

import { COMPONENTS_DB } from '../data/components.js';

export class CostEstimator {
  constructor() {
    this.components = COMPONENTS_DB;
    this.shippingRate = 0.15; // 15% shipping estimate
    this.contingency = 0.20; // 20% contingency for mistakes/extras
  }

  /**
   * Estimate total project cost
   * @param {Object} idea - Project idea
   * @returns {Object} Cost estimation breakdown
   */
  estimate(idea) {
    const components = idea.components || [];
    const breakdown = this._calculateBreakdown(components, idea);
    
    return {
      total: {
        min: idea.estimatedCost?.min || this._calculateMin(breakdown),
        max: idea.estimatedCost?.max || this._calculateMax(breakdown)
      },
      breakdown
    };
  }

  /**
   * Calculate cost breakdown
   */
  _calculateBreakdown(components, idea) {
    const componentsCost = this._calculateComponentsCost(components);
    const toolsCost = this._estimateToolsCost(idea.skillLevel);
    const shippingCost = componentsCost * this.shippingRate;
    const contingencyCost = componentsCost * this.contingency;

    return {
      components: componentsCost,
      tools: toolsCost,
      shipping: Math.round(shippingCost * 100) / 100,
      contingency: Math.round(contingencyCost * 100) / 100,
      subtotal: componentsCost + toolsCost,
      total: Math.round((componentsCost + toolsCost + shippingCost + contingencyCost) * 100) / 100
    };
  }

  /**
   * Calculate components cost
   */
  _calculateComponentsCost(components) {
    return components.reduce((total, comp) => {
      const cost = comp.estimatedCost || comp.cost || 0;
      const quantity = comp.quantity || 1;
      return total + (cost * quantity);
    }, 0);
  }

  /**
   * Estimate tools cost
   */
  _estimateToolsCost(skillLevel) {
    // Assume beginners need to buy tools, others already have them
    const toolCosts = {
      beginner: 30, // Soldering iron, multimeter, basic tools
      intermediate: 10, // Specialized components
      advanced: 5 // Already have everything
    };

    return toolCosts[skillLevel] || 15;
  }

  /**
   * Calculate minimum cost
   */
  _calculateMin(breakdown) {
    return Math.round(breakdown.subtotal * 1.1 * 100) / 100; // 10% buffer
  }

  /**
   * Calculate maximum cost
   */
  _calculateMax(breakdown) {
    return Math.round(breakdown.total * 1.15 * 100) / 100; // 15% buffer
  }

  /**
   * Estimate component cost by name
   */
  estimateComponentCost(componentName) {
    const component = this.components.find(c => 
      c.name.toLowerCase().includes(componentName.toLowerCase())
    );

    return component ? component.price : null;
  }

  /**
   * Suggest cheaper alternatives
   */
  suggestAlternatives(components) {
    const alternatives = [];

    components.forEach(comp => {
      const cheaper = this.components.filter(c => 
        c.categories.some(cat => comp.categories?.includes(cat)) &&
        c.price < (comp.estimatedCost || 999) * 0.7
      );

      if (cheaper.length > 0) {
        alternatives.push({
          original: comp.name,
          alternatives: cheaper.slice(0, 3).map(c => ({
            name: c.name,
            price: c.price,
            savings: comp.estimatedCost - c.price
          }))
        });
      }
    });

    return alternatives;
  }

  /**
   * Optimize component selection for budget
   */
  optimizeForBudget(components, maxBudget) {
    let total = 0;
    const selected = [];
    const skipped = [];

    // Sort by priority (essential first)
    const sorted = [...components].sort((a, b) => {
      const aPriority = a.essential ? 1 : 0;
      const bPriority = b.essential ? 1 : 0;
      return bPriority - aPriority;
    });

    for (const comp of sorted) {
      const cost = (comp.estimatedCost || comp.cost || 0) * (comp.quantity || 1);
      
      if (total + cost <= maxBudget) {
        selected.push(comp);
        total += cost;
      } else {
        skipped.push(comp);
      }
    }

    return {
      selected,
      skipped,
      totalCost: total,
      remainingBudget: maxBudget - total
    };
  }
}
