import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Paper, 
  CircularProgress 
} from '@mui/material';
import { fabric } from 'fabric';
import ImageIcon from '@mui/icons-material/Image';
import FileUploadIcon from '@mui/icons-material/FileUpload';

// Sample stock images for quick access
const stockImages = [
  {
    name: 'Abstract 1',
    url: 'https://via.placeholder.com/300x200/2196f3/ffffff?text=Abstract+1'
  },
  {
    name: 'Abstract 2',
    url: 'https://via.placeholder.com/300x200/4caf50/ffffff?text=Abstract+2'
  },
  {
    name: 'Abstract 3',
    url: 'https://via.placeholder.com/300x200/f44336/ffffff?text=Abstract+3'
  },
  {
    name: 'Placeholder',
    url: 'https://via.placeholder.com/300x200/9c27b0/ffffff?text=Placeholder'
  }
];

const MediaControls = ({ canvas }) => {
  const [uploading, setUploading] = useState(false);
  
  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file || !canvas) return;
    
    setUploading(true);
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const imgData = e.target.result;
      
      fabric.Image.fromURL(imgData, (img) => {
        // Scale image to fit in canvas if needed
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();
        
        if (img.width > canvasWidth || img.height > canvasHeight) {
          const scaleFactor = Math.min(
            canvasWidth / img.width,
            canvasHeight / img.height
          ) * 0.8; // 80% of the max size to leave some margin
          
          img.scale(scaleFactor);
        }
        
        // Center the image
        img.set({
          left: canvas.getWidth() / 2,
          top: canvas.getHeight() / 2,
          originX: 'center',
          originY: 'center'
        });
        
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        setUploading(false);
      });
    };
    
    reader.readAsDataURL(file);
  };
  
  // Add stock image to canvas
  const handleAddStockImage = (imageUrl) => {
    if (!canvas) return;
    
    setUploading(true);
    
    fabric.Image.fromURL(imageUrl, (img) => {
      // Scale image to fit in canvas if needed
      const canvasWidth = canvas.getWidth();
      const canvasHeight = canvas.getHeight();
      
      if (img.width > canvasWidth || img.height > canvasHeight) {
        const scaleFactor = Math.min(
          canvasWidth / img.width,
          canvasHeight / img.height
        ) * 0.8; // 80% of the max size to leave some margin
        
        img.scale(scaleFactor);
      }
      
      // Center the image
      img.set({
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() / 2,
        originX: 'center',
        originY: 'center'
      });
      
      canvas.add(img);
      canvas.setActiveObject(img);
      canvas.renderAll();
      setUploading(false);
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Media
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Upload Image
        </Typography>
        
        <Button
          variant="contained"
          component="label"
          startIcon={<FileUploadIcon />}
          disabled={uploading || !canvas}
          fullWidth
        >
          {uploading ? <CircularProgress size={24} /> : 'Upload Image'}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </Button>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: '0.8rem' }}>
          Supported formats: JPG, PNG, GIF (max 5MB)
        </Typography>
      </Box>
      
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Stock Images
        </Typography>
        
        <Grid container spacing={2}>
          {stockImages.map((image, index) => (
            <Grid item xs={6} key={index}>
              <Paper 
                sx={{ 
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: '0 0 0 2px #2196f3'
                  }
                }}
                onClick={() => handleAddStockImage(image.url)}
              >
                <img 
                  src={image.url} 
                  alt={image.name}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <Box sx={{ p: 1 }}>
                  <Typography variant="caption">{image.name}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MediaControls;
