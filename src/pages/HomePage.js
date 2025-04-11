import React from 'react';
import { 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea, 
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTemplates } from '../contexts/TemplateContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { templates, loading, error } = useTemplates();

  const handleTemplateSelect = (templateId) => {
    navigate(`/editor/${templateId}`);
  };

  return (
    <div>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Design Template Editor
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select a design template to get started with your creation
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      ) : templates.length === 0 ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          No templates available. Please upload a template from the Admin page.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {templates.map((template) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={template.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)' } }}>
                <CardActionArea onClick={() => handleTemplateSelect(template.id)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={template.thumbnail}
                    alt={template.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {template.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {template.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      {template.width} × {template.height}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default HomePage;
