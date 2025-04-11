# Design Template Editor

A web application for editing design templates with Fabric.js, inspired by Canva and Adobe Express.

## 🎯 About the Project

Design Template Editor is a browser-based graphic design tool that allows users to:

- Choose from a library of pre-designed templates
- Edit and customize templates with a powerful canvas editor
- Add text, shapes, and images to designs
- Save projects for later editing
- Export designs as images
- Create and manage their own templates (administrators)

This project uses Fabric.js as its core canvas manipulation library, providing a rich set of features for graphic design and editing.

## 🚀 Features

- **Template Selection**: Browse and choose from a variety of design templates
- **Canvas Editor**: Edit designs with an intuitive WYSIWYG editor
- **Text Editing**: Add and format text with various fonts, sizes, and styles
- **Shape Library**: Add and customize basic shapes and elements
- **Color Control**: Change colors of objects and backgrounds
- **Image Support**: Upload and place images in your designs
- **Save & Export**: Save your work and export as PNG images
- **Admin Panel**: Manage templates through a dedicated admin interface

## 💻 Tech Stack

- **Frontend**: React.js, Material-UI components
- **Canvas Manipulation**: Fabric.js
- **State Management**: React Context API
- **Routing**: React Router
- **Storage**: LocalStorage (client-side storage)
- **Styling**: CSS-in-JS with Material-UI's styling system

## 🏁 Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aDayres/design-template-editor.git
   cd design-template-editor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## 📝 Usage

### For Users

1. Browse available templates on the home page
2. Select a template to edit
3. Use the editor tools to customize your design:
   - Add or edit text
   - Add shapes and elements
   - Change colors
   - Upload and place images
4. Save your project for later or export as an image

### For Administrators

1. Access the admin panel from the top-right icon
2. Create new templates from scratch
3. Edit existing templates
4. Delete templates you no longer need
5. Upload JSON template files

## 🔜 Roadmap

Check out our [open issues](https://github.com/aDayres/design-template-editor/issues) for a list of proposed features and known issues. Key future developments include:

- User authentication system
- Enhanced editor capabilities with additional Fabric.js features
- Backend server for template and project storage
- UI/UX improvements and responsive design
- Template categorization and search functionality
- Collaboration features
- Advanced export options (PDF, SVG, etc.)
- Integration with third-party services

## 🧩 Project Structure

```
design-template-editor/
├── public/                     # Static files
│   ├── templates/              # JSON template files
│   └── assets/                 # Static assets
└── src/
    ├── components/             # Reusable UI components
    │   ├── Editor/             # Editor-specific components
    │   ├── Templates/          # Template-related components
    │   └── Layout.js           # Main layout component
    ├── contexts/               # React contexts for state management
    │   └── TemplateContext.js  # Template data and management
    ├── pages/                  # Application pages
    │   ├── HomePage.js         # Template selection page
    │   ├── EditorPage.js       # Design editor page
    │   └── AdminPage.js        # Admin template management
    ├── utils/                  # Utility functions
    │   └── templateLoader.js   # Template loading utilities
    ├── App.js                  # Main application component
    └── index.js                # Application entry point
```

## 💡 Creating Custom Templates

Templates are defined in JSON format with specific properties. To create a custom template:

1. Create a new JSON file in the `/public/templates/` directory
2. Define the template structure according to the format in the [template documentation](public/templates/README.md)
3. Add your template to the `templateFiles` array in `src/utils/templateLoader.js`

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## 🙏 Acknowledgments

- [Fabric.js](http://fabricjs.com/) - Canvas library that powers the editor
- [Material-UI](https://mui.com/) - React components for faster and beautiful development
- [React.js](https://reactjs.org/) - JavaScript library for building user interfaces
- [Canva](https://www.canva.com/) and [Adobe Express](https://www.adobe.com/express/) for inspiration
