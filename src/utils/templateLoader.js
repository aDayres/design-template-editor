/**
 * Utility to load template files from the public/templates directory
 */

// Template files to load
const templateFiles = [
  'social-media-post.json',
  'presentation-slide.json',
  'event-flyer.json'
];

/**
 * Load all templates from the templates directory
 * @returns {Promise<Array>} Array of template objects
 */
export const loadTemplates = async () => {
  try {
    const templates = await Promise.all(
      templateFiles.map(async (filename) => {
        const response = await fetch(`/templates/${filename}`);
        if (!response.ok) {
          throw new Error(`Failed to load template: ${filename}`);
        }
        return response.json();
      })
    );
    
    return templates;
  } catch (error) {
    console.error('Error loading templates:', error);
    return [];
  }
};

/**
 * Load a single template by ID
 * @param {string} templateId - The ID of the template to load
 * @returns {Promise<Object|null>} Template object or null if not found
 */
export const loadTemplateById = async (templateId) => {
  try {
    const response = await fetch(`/templates/${templateId}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load template: ${templateId}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error loading template ${templateId}:`, error);
    return null;
  }
};
