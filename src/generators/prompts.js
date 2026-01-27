/**
 * Prompt Engineering for AI-driven Generation
 * Contains prompt templates for various generation tasks
 */

export function generatePrompt(type, context) {
  const prompts = {
    ideaGeneration: generateIdeaPrompt,
    variation: generateVariationPrompt,
    feasibility: generateFeasibilityPrompt,
    components: generateComponentsPrompt
  };

  const promptFn = prompts[type];
  return promptFn ? promptFn(context) : '';
}

/**
 * Generate idea generation prompt
 */
function generateIdeaPrompt(context) {
  const { skillLevel, budget, category, interests } = context;
  
  return `Generate a creative hardware project idea with the following constraints:
- Skill Level: ${skillLevel}
- Budget: $${budget}
- Category: ${category}
- Interests: ${interests.join(', ') || 'general electronics'}

The idea should be:
1. Practical and achievable
2. Educational and fun
3. Within budget constraints
4. Appropriate for the skill level

Include:
- Project title
- Description (2-3 sentences)
- Key features
- Required components
- Estimated build time`;
}

/**
 * Generate variation prompt
 */
function generateVariationPrompt(context) {
  const { baseIdea } = context;
  
  return `Create an interesting variation of this hardware project:
${baseIdea.title}

Original description: ${baseIdea.description}

Generate a variation that:
1. Uses similar components
2. Has a different application or twist
3. Maintains similar complexity
4. Is equally achievable`;
}

/**
 * Generate feasibility analysis prompt
 */
function generateFeasibilityPrompt(context) {
  const { idea } = context;
  
  return `Analyze the feasibility of this hardware project:
${idea.title}
${idea.description}

Provide:
1. Cost estimation (breakdown)
2. Time requirements
3. Complexity rating (1-10)
4. Required skills
5. Potential challenges
6. Success probability`;
}

/**
 * Generate component selection prompt
 */
function generateComponentsPrompt(context) {
  const { idea, budget } = context;
  
  return `Select appropriate components for this project:
${idea.title}

Budget: $${budget}
Category: ${idea.category}

Provide a list of:
1. Essential components (must-have)
2. Optional components (nice-to-have)
3. Estimated cost for each
4. Purpose/function
5. Suggested vendors`;
}

/**
 * Generate project title variations
 */
export function generateTitleVariations(baseTitle, category) {
  const prefixes = {
    IoT: ['Smart', 'Connected', 'WiFi-Enabled', 'Cloud-Based'],
    Robotics: ['Autonomous', 'Remote-Controlled', 'AI-Powered', 'Mobile'],
    Audio: ['Audio', 'Sound', 'Music', 'Voice-Activated'],
    Display: ['LED', 'Visual', 'Display', 'Interactive'],
    Automation: ['Automated', 'Smart', 'Programmable', 'Intelligent']
  };

  const categoryPrefixes = prefixes[category] || ['Custom', 'DIY', 'Homemade'];
  return categoryPrefixes.map(prefix => `${prefix} ${baseTitle}`);
}

/**
 * Generate project descriptions
 */
export function generateDescription(idea) {
  const templates = [
    `Build a ${idea.title} that ${idea.features[0]}. Perfect for ${idea.skillLevel} makers who want to learn about ${idea.category}.`,
    `Create an innovative ${idea.title} combining ${idea.features[0]} and ${idea.features[1] || 'modern electronics'}. Great for learning ${idea.category} concepts.`,
    `Design a practical ${idea.title} that can ${idea.features[0]}. This project teaches essential ${idea.category} skills.`
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}
