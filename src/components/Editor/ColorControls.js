import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box,
  Grid,
  Paper,
  TextField,
  Popover,
  Button,
  Slider
} from '@mui/material';

// Predefined color palette
const colorPalette = [
  '#000000', '#FFFFFF', '#F44336', '#E91E63', '#9C27B0', 
  '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', 
  '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', 
  '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E'
];

const ColorControls = ({ canvas, activeObject }) => {
  const [fillColor, setFillColor] = useState('#000000');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [opacity, setOpacity] = useState(100);
  const [colorPickerAnchor, setColorPickerAnchor] = useState(null);
  const [currentColorTarget, setCurrentColorTarget] = useState(null);
  
  // Update state when active object changes
  useEffect(() => {
    if (!activeObject) return;
    
    setFillColor(activeObject.fill || '#000000');
    setStrokeColor(activeObject.stroke || '#000000');
    setStrokeWidth(activeObject.strokeWidth || 1);
    setOpacity(activeObject.opacity ? Math.round(activeObject.opacity * 100) : 100);
  }, [activeObject]);
  
  // Open color picker
  const handleOpenColorPicker = (event, target) => {
    setColorPickerAnchor(event.currentTarget);
    setCurrentColorTarget(target);
  };
  
  // Close color picker
  const handleCloseColorPicker = () => {
    setColorPickerAnchor(null);
    setCurrentColorTarget(null);
  };
  
  // Update fill color
  const handleFillColorChange = (event) => {
    const color = event.target.value;
    setFillColor(color);
    
    if (activeObject && canvas) {
      activeObject.set('fill', color);
      canvas.renderAll();
    }
  };
  
  // Update stroke color
  const handleStrokeColorChange = (event) => {
    const color = event.target.value;
    setStrokeColor(color);
    
    if (activeObject && canvas) {
      activeObject.set('stroke', color);
      canvas.renderAll();
    }
  };
  
  // Update stroke width
  const handleStrokeWidthChange = (_, newValue) => {
    setStrokeWidth(newValue);
    
    if (activeObject && canvas) {
      activeObject.set('strokeWidth', newValue);
      canvas.renderAll();
    }
  };
  
  // Update opacity
  const handleOpacityChange = (_, newValue) => {
    setOpacity(newValue);
    
    if (activeObject && canvas) {
      activeObject.set('opacity', newValue / 100);
      canvas.renderAll();
    }
  };
  
  // Select color from palette
  const handleColorSelect = (color) => {
    if (currentColorTarget === 'fill') {
      setFillColor(color);
      
      if (activeObject && canvas) {
        activeObject.set('fill', color);
        canvas.renderAll();
      }
    } else if (currentColorTarget === 'stroke') {
      setStrokeColor(color);
      
      if (activeObject && canvas) {
        activeObject.set('stroke', color);
        canvas.renderAll();
      }
    }
    
    handleCloseColorPicker();
  };
  
  // Set canvas background color
  const handleSetBackground = () => {
    if (!canvas) return;
    
    canvas.setBackgroundColor(fillColor, canvas.renderAll.bind(canvas));
  };
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Color & Style
      </Typography>
      
      {activeObject ? (
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>Fill Color</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box 
                sx={{ 
                  width: 36, 
                  height: 36, 
                  bgcolor: fillColor,
                  border: '1px solid #ddd',
                  mr: 1,
                  cursor: 'pointer'
                }}
                onClick={(e) => handleOpenColorPicker(e, 'fill')}
              />
              <TextField
                value={fillColor}
                onChange={handleFillColorChange}
                size="small"
                sx={{ flex: 1 }}
              />
            </Box>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>Stroke Color</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box 
                sx={{ 
                  width: 36, 
                  height: 36, 
                  bgcolor: strokeColor,
                  border: '1px solid #ddd',
                  mr: 1,
                  cursor: 'pointer'
                }}
                onClick={(e) => handleOpenColorPicker(e, 'stroke')}
              />
              <TextField
                value={strokeColor}
                onChange={handleStrokeColorChange}
                size="small"
                sx={{ flex: 1 }}
              />
            </Box>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>
              Stroke Width: {strokeWidth}px
            </Typography>
            <Slider
              value={strokeWidth}
              onChange={handleStrokeWidthChange}
              min={0}
              max={20}
              step={1}
            />
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>
              Opacity: {opacity}%
            </Typography>
            <Slider
              value={opacity}
              onChange={handleOpacityChange}
              min={0}
              max={100}
              step={1}
            />
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Select an object to edit its colors and style
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>Canvas Background</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box 
                sx={{ 
                  width: 36, 
                  height: 36, 
                  bgcolor: fillColor,
                  border: '1px solid #ddd',
                  mr: 1,
                  cursor: 'pointer'
                }}
                onClick={(e) => handleOpenColorPicker(e, 'fill')}
              />
              <TextField
                value={fillColor}
                onChange={handleFillColorChange}
                size="small"
                sx={{ flex: 1 }}
              />
            </Box>
            <Button 
              variant="outlined" 
              onClick={handleSetBackground}
              sx={{ mt: 1 }}
              fullWidth
              disabled={!canvas}
            >
              Set Background Color
            </Button>
          </Box>
        </Box>
      )}
      
      {/* Color Picker Popover */}
      <Popover
        open={Boolean(colorPickerAnchor)}
        anchorEl={colorPickerAnchor}
        onClose={handleCloseColorPicker}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, width: 240 }}>
          <Typography variant="subtitle2" gutterBottom>
            Choose a Color
          </Typography>
          <Grid container spacing={1}>
            {colorPalette.map((color, index) => (
              <Grid item key={index}>
                <Paper 
                  sx={{ 
                    width: 30, 
                    height: 30, 
                    bgcolor: color,
                    cursor: 'pointer',
                    border: '1px solid #ddd',
                    '&:hover': {
                      boxShadow: '0 0 0 2px #2196f3'
                    }
                  }}
                  onClick={() => handleColorSelect(color)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Popover>
    </Box>
  );
};

export default ColorControls;
