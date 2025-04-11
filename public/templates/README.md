# Template Format Documentation

This directory contains JSON template files for the Design Template Editor application. Below is a guide on how to create and format template files.

## Template JSON Structure

Each template is a JSON file with the following structure:

```json
{
  "id": "unique-template-id",
  "name": "Template Name",
  "description": "A brief description of the template",
  "width": 800,
  "height": 600,
  "backgroundColor": "#ffffff",
  "thumbnail": "URL to a preview image",
  "objects": [
    // Array of objects on the canvas
  ]
}
```

### Required Properties

- `id`: Unique identifier for the template (string)
- `name`: Display name for the template (string)
- `description`: Brief description of the template (string)
- `width`: Width of the canvas in pixels (number)
- `height`: Height of the canvas in pixels (number)

### Optional Properties

- `backgroundColor`: Background color of the canvas (CSS color string, default: "#ffffff")
- `thumbnail`: URL to a preview image (string, default: placeholder image)
- `objects`: Array of objects on the canvas (array, default: [])

## Object Types

The `objects` array can contain various types of objects. Each object type has its own properties:

### Textbox

```json
{
  "type": "textbox",
  "text": "Your text here",
  "left": 100,
  "top": 100,
  "width": 200,
  "fontSize": 20,
  "fontFamily": "Arial",
  "fill": "#000000",
  "textAlign": "center"
}
```

### Rectangle

```json
{
  "type": "rect",
  "left": 100,
  "top": 100,
  "width": 200,
  "height": 100,
  "fill": "#ff0000",
  "stroke": "#000000",
  "strokeWidth": 1,
  "rx": 0,
  "ry": 0
}
```

### Circle

```json
{
  "type": "circle",
  "left": 100,
  "top": 100,
  "radius": 50,
  "fill": "#00ff00",
  "stroke": "#000000",
  "strokeWidth": 1
}
```

### Triangle

```json
{
  "type": "triangle",
  "left": 100,
  "top": 100,
  "width": 100,
  "height": 100,
  "fill": "#0000ff",
  "stroke": "#000000",
  "strokeWidth": 1
}
```

### Line

```json
{
  "type": "line",
  "x1": 0,
  "y1": 0,
  "x2": 100,
  "y2": 100,
  "stroke": "#000000",
  "strokeWidth": 2
}
```

### Ellipse

```json
{
  "type": "ellipse",
  "left": 100,
  "top": 100,
  "rx": 80,
  "ry": 40,
  "fill": "#ff9800",
  "stroke": "#000000",
  "strokeWidth": 1
}
```

### Polygon

```json
{
  "type": "polygon",
  "points": [
    {"x": 0, "y": 0},
    {"x": 60, "y": 0},
    {"x": 80, "y": 60},
    {"x": 40, "y": 80},
    {"x": 0, "y": 60}
  ],
  "left": 100,
  "top": 100,
  "fill": "#9c27b0",
  "stroke": "#000000",
  "strokeWidth": 1
}
```

## Common Object Properties

These properties can be applied to most object types:

- `left`: X position from the left edge (number)
- `top`: Y position from the top edge (number)
- `fill`: Fill color (CSS color string)
- `stroke`: Stroke color (CSS color string)
- `strokeWidth`: Width of the stroke (number)
- `opacity`: Opacity level, 0-1 (number)
- `angle`: Rotation angle in degrees (number)
- `selectable`: Whether the object can be selected by the user (boolean)

## Example Template

```json
{
  "id": "social-media-post",
  "name": "Social Media Post",
  "description": "Perfect for Instagram and Facebook posts",
  "width": 800,
  "height": 800,
  "backgroundColor": "#ffffff",
  "thumbnail": "https://via.placeholder.com/800x800/3f51b5/ffffff?text=Social+Media+Post",
  "objects": [
    {
      "type": "textbox",
      "text": "Your Headline Here",
      "left": 400,
      "top": 300,
      "width": 600,
      "fontSize": 40,
      "fontFamily": "Arial",
      "fill": "#333333",
      "textAlign": "center"
    },
    {
      "type": "textbox",
      "text": "Add your subtext here",
      "left": 400,
      "top": 400,
      "width": 600,
      "fontSize": 24,
      "fontFamily": "Arial",
      "fill": "#666666",
      "textAlign": "center"
    }
  ]
}
```

## Adding Templates to the Application

To add a template, simply create a JSON file following the format above and place it in this directory. Then update the `templateFiles` array in `src/utils/templateLoader.js` to include your new template file.
