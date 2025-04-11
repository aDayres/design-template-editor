import React from 'react';
import { 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Button 
} from '@mui/material';
import { fabric } from 'fabric';

// Sample basic shapes for the elements library
const elements = [
  {
    name: 'Rectangle',
    create: (canvas) => {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        width: 100,
        height: 100,
        fill: '#3f51b5',
        stroke: '#000000',
        strokeWidth: 1,
        rx: 0,
        ry: 0
      });
      return rect;
    }
  },
  {
    name: 'Circle',
    create: (canvas) => {
      const circle = new fabric.Circle({
        left: 100,
        top: 100,
        radius: 50,
        fill: '#f50057',
        stroke: '#000000',
        strokeWidth: 1
      });
      return circle;
    }
  },
  {
    name: 'Triangle',
    create: (canvas) => {
      const triangle = new fabric.Triangle({
        left: 100,
        top: 100,
        width: 100,
        height: 100,
        fill: '#00e676',
        stroke: '#000000',
        strokeWidth: 1
      });
      return triangle;
    }
  },
  {
    name: 'Line',
    create: (canvas) => {
      const line = new fabric.Line([50, 50, 200, 50], {
        left: 100,
        top: 100,
        stroke: '#000000',
        strokeWidth: 5
      });
      return line;
    }
  },
  {
    name: 'Ellipse',
    create: (canvas) => {
      const ellipse = new fabric.Ellipse({
        left: 100,
        top: 100,
        rx: 80,
        ry: 40,
        fill: '#ff9800',
        stroke: '#000000',
        strokeWidth: 1
      });
      return ellipse;
    }
  },
  {
    name: 'Polygon',
    create: (canvas) => {
      const polygon = new fabric.Polygon([
        { x: 0, y: 0 },
        { x: 60, y: 0 },
        { x: 80, y: 60 },
        { x: 40, y: 80 },
        { x: 0, y: 60 }
      ], {
        left: 100,
        top: 100,
        fill: '#9c27b0',
        stroke: '#000000',
        strokeWidth: 1
      });
      return polygon;
    }
  }
];

const ElementControls = ({ canvas }) => {
  // Add element to canvas
  const handleAddElement = (element) => {
    if (!canvas) return;
    
    const shape = element.create(canvas);
    
    canvas.add(shape);
    canvas.setActiveObject(shape);
    canvas.renderAll();
  };
  
  // Clone selected element
  const handleCloneElement = () => {
    if (!canvas) return;
    
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    
    activeObject.clone((cloned) => {
      cloned.set({
        left: activeObject.left + 10,
        top: activeObject.top + 10
      });
      
      canvas.add(cloned);
      canvas.setActiveObject(cloned);
      canvas.renderAll();
    });
  };
  
  // Delete selected element
  const handleDeleteElement = () => {
    if (!canvas) return;
    
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    
    canvas.remove(activeObject);
    canvas.renderAll();
  };
  
  // Move element to front
  const handleBringToFront = () => {
    if (!canvas) return;
    
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    
    activeObject.bringToFront();
    canvas.renderAll();
  };
  
  // Move element to back
  const handleSendToBack = () => {
    if (!canvas) return;
    
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    
    activeObject.sendToBack();
    canvas.renderAll();
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Elements
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Basic Shapes
        </Typography>
        
        <Grid container spacing={1}>
          {elements.map((element, index) => (
            <Grid item xs={6} sm={4} key={index}>
              <Paper 
                sx={{ 
                  p: 1, 
                  textAlign: 'center', 
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)'
                  }
                }}
                onClick={() => handleAddElement(element)}
              >
                <Typography variant="body2">{element.name}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Element Actions
        </Typography>
        
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Button 
              variant="outlined" 
              size="small" 
              fullWidth
              onClick={handleCloneElement}
              disabled={!canvas || !canvas.getActiveObject()}
            >
              Clone
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button 
              variant="outlined" 
              size="small" 
              color="error" 
              fullWidth
              onClick={handleDeleteElement}
              disabled={!canvas || !canvas.getActiveObject()}
            >
              Delete
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button 
              variant="outlined" 
              size="small" 
              fullWidth
              onClick={handleBringToFront}
              disabled={!canvas || !canvas.getActiveObject()}
            >
              Bring to Front
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button 
              variant="outlined" 
              size="small" 
              fullWidth
              onClick={handleSendToBack}
              disabled={!canvas || !canvas.getActiveObject()}
            >
              Send to Back
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ElementControls;
