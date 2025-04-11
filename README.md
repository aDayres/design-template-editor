# Design Template Editor

A web application for editing design templates with Fabric.js, inspired by Canva and Adobe Express.

## Features

- Template selection from a library of designs
- Full editing capabilities powered by Fabric.js
  - Text editing (font, size, color, etc.)
  - Element manipulation (resize, rotate, position)
  - Color customization
  - Media insertion
- Design export as image (.jpeg or .png)
- Admin panel for managing templates
  - Upload JSON templates
  - Edit existing templates
  - Save templates to the library

## Technology Stack

- React.js for frontend
- Fabric.js for canvas manipulation
- Material-UI for UI components
- Context API for state management

## Project Structure

```
design-template-editor/
├── public/                     # Static files
│   ├── templates/              # Default JSON templates
│   └── assets/                 # Static assets
└── src/
    ├── components/             # Reusable UI components
    │   ├── Editor/             # Editor components
    │   ├── Templates/          # Template selection components
    │   └── Admin/              # Admin panel components
    ├── pages/                  # Application pages
    ├── services/               # API services
    ├── contexts/               # React contexts
    ├── utils/                  # Utility functions
    └── App.js                  # Main application component
```

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/aDayres/design-template-editor.git
   cd design-template-editor
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Usage

### For Users
1. Browse available templates on the home page
2. Select a template to edit
3. Use the editor tools to customize the design
4. Save your design or export it as an image

### For Administrators
1. Access the admin panel
2. Upload new templates in JSON format
3. Edit existing templates
4. Manage the template library

## Development Roadmap

- [x] Project setup
- [ ] Template browsing interface
- [ ] Canvas editor implementation
- [ ] Text editing tools
- [ ] Element manipulation tools
- [ ] Color and styling tools
- [ ] Media upload capability
- [ ] Export functionality
- [ ] Admin panel for template management
- [ ] User authentication (future)
- [ ] Template categories and filtering (future)
- [ ] Collaboration features (future)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
