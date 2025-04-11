import React, { createContext, useContext, useState, useEffect } from 'react';

// Sample default templates
const defaultTemplates = [
  {
    id: '1',
    name: 'Social Media Post',
    description: 'Perfect for Instagram and Facebook posts',
    width: 800,
    height: 800,
    backgroundColor: '#ffffff',
    thumbnail: 'https://via.placeholder.com/800x800',
    objects: [
      {
        type: 'textbox',
        text: 'Your Headline Here',
        left: 400,
        top: 300,
        width: 400,
        fontSize: 40,
        fontFamily: 'Arial',
        fill: '#333333',
        textAlign: 'center'
      },
      {
        type: 'textbox',
        text: 'Add your subtext here',
        left: 400,
        top: 400,
        width: 400,
        fontSize: 24,
        fontFamily: 'Arial',
        fill: '#666666',
        textAlign: 'center'
      }
    ]
  },
  {
    id: '2',
    name: 'Presentation Slide',
    description: 'Professional presentation template',
    width: 1200,
    height: 675,
    backgroundColor: '#f5f5f5',
    thumbnail: 'https://via.placeholder.com/1200x675',
    objects: [
      {
        type: 'textbox',
        text: 'Presentation Title',
        left: 600,
        top: 100,
        width: 800,
        fontSize: 50,
        fontFamily: 'Arial',
        fill: '#333333',
        textAlign: 'center'
      },
      {
        type: 'textbox',
        text: 'Subtitle goes here',
        left: 600,
        top: 200,
        width: 800,
        fontSize: 30,
        fontFamily: 'Arial',
        fill: '#666666',
        textAlign: 'center'
      }
    ]
  },
  {
    id: '3',
    name: 'Flyer',
    description: 'Promotional flyer for events',
    width: 800,
    height: 1200,
    backgroundColor: '#e6f7ff',
    thumbnail: 'https://via.placeholder.com/800x1200',
    objects: [
      {
        type: 'textbox',
        text: 'EVENT NAME',
        left: 400,
        top: 200,
        width: 600,
        fontSize: 60,
        fontFamily: 'Arial',
        fill: '#1a1a1a',
        textAlign: 'center'
      },
      {
        type: 'textbox',
        text: 'Date & Time',
        left: 400,
        top: 300,
        width: 600,
        fontSize: 30,
        fontFamily: 'Arial',
        fill: '#4d4d4d',
        textAlign: 'center'
      },
      {
        type: 'textbox',
        text: 'Location',
        left: 400,
        top: 350,
        width: 600,
        fontSize: 30,
        fontFamily: 'Arial',
        fill: '#4d4d4d',
        textAlign: 'center'
      }
    ]
  }
];

const TemplateContext = createContext();

export const TemplateProvider = ({ children }) => {
  const [templates, setTemplates] = useState(() => {
    // Try to load templates from localStorage
    const savedTemplates = localStorage.getItem('templates');
    return savedTemplates ? JSON.parse(savedTemplates) : defaultTemplates;
  });
  
  const [userProjects, setUserProjects] = useState(() => {
    // Try to load user projects from localStorage
    const savedProjects = localStorage.getItem('userProjects');
    return savedProjects ? JSON.parse(savedProjects) : {};
  });
  
  // Save templates to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('templates', JSON.stringify(templates));
  }, [templates]);
  
  // Save user projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userProjects', JSON.stringify(userProjects));
  }, [userProjects]);
  
  // Get template by ID
  const getTemplateById = (id) => {
    return templates.find(template => template.id === id);
  };
  
  // Add a new template
  const addTemplate = (template) => {
    // Generate a new ID if not provided
    const newTemplate = {
      ...template,
      id: template.id || String(Date.now())
    };
    setTemplates([...templates, newTemplate]);
  };
  
  // Update an existing template
  const updateTemplate = (id, updatedTemplate) => {
    setTemplates(templates.map(template => 
      template.id === id ? { ...updatedTemplate, id } : template
    ));
  };
  
  // Delete a template
  const deleteTemplate = (id) => {
    setTemplates(templates.filter(template => template.id !== id));
  };
  
  // Save a user project
  const saveUserProject = (templateId, projectData) => {
    setUserProjects({
      ...userProjects,
      [templateId]: projectData
    });
  };
  
  // Get a user project
  const getUserProject = (templateId) => {
    return userProjects[templateId];
  };
  
  return (
    <TemplateContext.Provider value={{
      templates,
      getTemplateById,
      addTemplate,
      updateTemplate,
      deleteTemplate,
      saveUserProject,
      getUserProject
    }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplates = () => useContext(TemplateContext);
