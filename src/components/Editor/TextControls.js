import React, { useState } from 'react';
import { 
  Typography, 
  Button, 
  Divider, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Box,
  Slider,
  ToggleButtonGroup,
  ToggleButton
} from '@mui/material';
import { fabric } from 'fabric';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';

// Font options
const fontFamilies = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Courier New',
  'Georgia',
  'Trebuchet MS',
  'Verdana'
];

const TextControls = ({ canvas, activeObject }) => {
  const [newText, setNewText] = useState('');
  
  // Check if the active object is a text object
  const isTextObject = activeObject && (
    activeObject.type === 'textbox' || 
    activeObject.type === 'text' || 
    activeObject.type === 'i-text'
  );
  
  // Add a new text element
  const handleAddText = () => {
    if (!canvas || !newText) return;
    
    const text = new fabric.Textbox(newText, {
      left: 50,
      top: 50,
      fontFamily: 'Arial',
      fontSize: 20,
      fill: '#000000',
      width: 200
    });
    
    canvas.add(text);
    canvas.setActiveObject(text);
    setNewText('');
    canvas.renderAll();
  };
  
  // Update text content
  const handleTextChange = (e) => {
    if (!canvas || !isTextObject) return;
    
    activeObject.set({ text: e.target.value });
    canvas.renderAll();
  };
  
  // Update font family
  const handleFontFamilyChange = (e) => {
    if (!canvas || !isTextObject) return;
    
    activeObject.set({ fontFamily: e.target.value });
    canvas.renderAll();
  };
  
  // Update font size
  const handleFontSizeChange = (_, newValue) => {
    if (!canvas || !isTextObject) return;
    
    activeObject.set({ fontSize: newValue });
    canvas.renderAll();
  };
  
  // Toggle text style (bold, italic, underline)
  const handleStyleChange = (_, newFormats) => {
    if (!canvas || !isTextObject) return;
    
    const isBold = newFormats.includes('bold');
    const isItalic = newFormats.includes('italic');
    const isUnderline = newFormats.includes('underline');
    
    activeObject.set({
      fontWeight: isBold ? 'bold' : 'normal',
      fontStyle: isItalic ? 'italic' : 'normal',
      underline: isUnderline
    });
    
    canvas.renderAll();
  };
  
  // Update text alignment
  const handleAlignmentChange = (_, newAlignment) => {
    if (!canvas || !isTextObject || !newAlignment) return;
    
    activeObject.set({ textAlign: newAlignment });
    canvas.renderAll();
  };
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Text Tools
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Add New Text
        </Typography>
        <TextField
          label="Text Content"
          variant="outlined"
          fullWidth
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          size="small"
          sx={{ mb: 1 }}
        />
        <Button 
          variant="contained" 
          onClick={handleAddText}
          disabled={!newText || !canvas}
          fullWidth
        >
          Add Text
        </Button>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      {/* Text editing controls - only shown if a text object is selected */}
      {isTextObject && (
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Edit Text
          </Typography>
          
          <TextField
            label="Text Content"
            variant="outlined"
            fullWidth
            value={activeObject.text}
            onChange={handleTextChange}
            multiline
            rows={2}
            size="small"
            sx={{ mb: 2 }}
          />
          
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>Font Family</InputLabel>
            <Select
              value={activeObject.fontFamily || 'Arial'}
              onChange={handleFontFamilyChange}
              label="Font Family"
            >
              {fontFamilies.map((font) => (
                <MenuItem key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Box sx={{ mb: 2 }}>
            <Typography id="font-size-slider" gutterBottom>
              Font Size: {activeObject.fontSize}px
            </Typography>
            <Slider
              value={activeObject.fontSize || 20}
              onChange={handleFontSizeChange}
              aria-labelledby="font-size-slider"
              min={8}
              max={80}
              step={1}
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>Text Style</Typography>
            <ToggleButtonGroup
              value={[
                activeObject.fontWeight === 'bold' ? 'bold' : '',
                activeObject.fontStyle === 'italic' ? 'italic' : '',
                activeObject.underline ? 'underline' : ''
              ].filter(Boolean)}
              onChange={handleStyleChange}
              aria-label="text formatting"
              size="small"
            >
              <ToggleButton value="bold" aria-label="bold">
                <FormatBoldIcon />
              </ToggleButton>
              <ToggleButton value="italic" aria-label="italic">
                <FormatItalicIcon />
              </ToggleButton>
              <ToggleButton value="underline" aria-label="underline">
                <FormatUnderlinedIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          
          <Box>
            <Typography gutterBottom>Text Alignment</Typography>
            <ToggleButtonGroup
              value={activeObject.textAlign || 'left'}
              exclusive
              onChange={handleAlignmentChange}
              aria-label="text alignment"
              size="small"
            >
              <ToggleButton value="left" aria-label="left aligned">
                <FormatAlignLeftIcon />
              </ToggleButton>
              <ToggleButton value="center" aria-label="centered">
                <FormatAlignCenterIcon />
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                <FormatAlignRightIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
      )}
      
      {!isTextObject && canvas && (
        <Typography color="text.secondary">
          Select a text element to edit or add a new one
        </Typography>
      )}
    </Box>
  );
};

export default TextControls;
