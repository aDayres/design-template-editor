import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Button, 
  TextField,
  Grid,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import { fabric } from 'fabric';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LinkIcon from '@mui/icons-material/Link';

// Sample stock images for quick access
const stockImages = [
  {
    name: 'Abstract 1',
    url: 'https://via.placeholder.com/300x200/3f51b5/ffffff'
  },
  {
    name: 'Nature 1',
    url: 'https://via.placeholder.com/300x200/4caf50/ffffff'
  },
  {
    name: 'Business',
    url: 'https://via.placeholder.com/300x200/ff9800/ffffff'
  },
  {
    name: 'Technology',
    url: 'https://via.placeholder.com/300x200/e91e63/ffffff'
  }
];

const MediaControls = ({ canvas }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  
  // Add image from URL
  const handleAddImageFromUrl = () => {
    if (!canvas || !imageUrl) return;
    
    setUploading(true);
    setError('');
    
    fabric.Image.fromURL(
      imageUrl,
      (img) => {
        // Scale down large images to fit the canvas
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        
        if (img.width > canvasWidth || img.height > canvasHeight) {
          const scaleFactor = Math.min(
            canvasWidth / img.width,
            canvasHeight / img.height
          ) * 0.8; // 80% of maximum size
          
          img.scale(scaleFactor);
        }
        
        // Center the image
        img.set({
          left: canvas.width / 2 - (img.width * img.scaleX) / 2,
          top: canvas.height / 2 - (img.height * img.scaleY) / 2
        });
        
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        
        setUploading(false);
        setImageUrl('');
      },
      (err) => {
        setError('Failed to load image. Please check the URL and try again.');
        setUploading(false);
      }
    );
  };
  
  // Add image from local file
  const handleAddImageFromLocal = (event) => {
    if (!canvas) return;
    
    const file = event.target.files[0];
    if (!file) return;
    
    // Check if the file is an image
    if (!file.type.match('image.*')) {
      setError('Please select an image file (JPEG, PNG, GIF, etc.)');
      return;
    }
    
    setUploading(true);
    setError('');
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      fabric.Image.fromURL(
        e.target.result,
        (img) => {
          // Scale down large images to fit the canvas
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;
          
          if (img.width > canvasWidth || img.height > canvasHeight) {
            const scaleFactor = Math.min(
              canvasWidth / img.width,
              canvasHeight / img.height
            ) * 0.8; // 80% of maximum size
            
            img.scale(scaleFactor);
          }
          
          // Center the image
          img.set({
            left: canvas.width / 2 - (img.width * img.scaleX) / 2,
            top: canvas.height / 2 - (img.height * img.scaleY) / 2
          });
          
          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
          
          setUploading(false);
        },
        (err) => {
          setError('Failed to load image. Please try again.');
          setUploading(false);
        }
      );
    };
    
    reader.onerror = () => {
      setError('Failed to read the image file. Please try again.');
      setUploading(false);
    };
    
    reader.readAsDataURL(file);
  };
  
  // Add stock image
  const handleAddStockImage = (imageUrl) => {
    if (!canvas) return;
    
    setUploading(true);
    setError('');
    
    fabric.Image.fromURL(
      imageUrl,
      (img) => {
        // Scale down large images to fit the canvas
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        
        if (img.width > canvasWidth || img.height > canvasHeight) {
          const scaleFactor = Math.min(
            canvasWidth / img.width,
            canvasHeight / img.height
          ) * 0.8; // 80% of maximum size
          
          img.scale(scaleFactor);
        }
        
        // Center the image
        img.set({
          left: canvas.width / 2 - (img.width * img.scaleX) / 2,
          top: canvas.height / 2 - (img.height * img.scaleY) / 2
        });
        
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        
        setUploading(false);
      },
      (err) => {
        setError('Failed to load stock image. Please try again.');
        setUploading(false);
      }
    );
  };
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Media
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Upload Image
        </Typography>
        
        <Button
          variant="outlined"
          component="label"
          startIcon={<AddPhotoAlternateIcon />}
          fullWidth
          sx={{ mb: 2 }}
          disabled={uploading || !canvas}
        >
          Upload from Computer
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleAddImageFromLocal}
          />
        </Button>
        
        <Typography variant="subtitle2" gutterBottom>
          Add Image from URL
        </Typography>
        
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          size="small"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          disabled={uploading}
          sx={{ mb: 1 }}
        />
        
        <Button
          variant="outlined"
          startIcon={<LinkIcon />}
          onClick={handleAddImageFromUrl}
          disabled={!imageUrl || uploading || !canvas}
          fullWidth
        >
          Add Image
        </Button>
        
        {uploading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Stock Images
        </Typography>
        
        <Grid container spacing={1}>
          {stockImages.map((image, index) => (
            <Grid item xs={6} key={index}>
              <Paper
                sx={{
                  p: 1,
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
                <Typography variant="caption" align="center" sx={{ mt: 0.5, display: 'block' }}>
                  {image.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MediaControls;
