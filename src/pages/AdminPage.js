import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Button, 
  TextField, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Alert,
  Snackbar,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { useTemplates } from '../contexts/TemplateContext';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const { templates, addTemplate, updateTemplate, deleteTemplate } = useTemplates();
  const navigate = useNavigate();
  
  const [jsonInput, setJsonInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [editTemplate, setEditTemplate] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [editJsonInput, setEditJsonInput] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Read file content
      const reader = new FileReader();
      reader.onload = (e) => {
        setJsonInput(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const validateTemplateData = (data) => {
    // Basic validation
    if (!data.id) return 'Template must have an ID';
    if (!data.name) return 'Template must have a name';
    if (!data.width || !data.height) return 'Template must have width and height';
    
    // Check if ID already exists (for new templates)
    if (!editTemplate && templates.some(t => t.id === data.id)) {
      return 'Template ID already exists. Please use a unique ID.';
    }
    
    return null; // No errors
  };

  const handleAddTemplate = () => {
    try {
      const templateData = JSON.parse(jsonInput);
      
      // Validate template data
      const validationError = validateTemplateData(templateData);
      if (validationError) {
        setError(validationError);
        return;
      }
      
      addTemplate(templateData);
      setJsonInput('');
      setSelectedFile(null);
      setError('');
      showSnackbar('Template added successfully!');
    } catch (error) {
      setError(`Error parsing JSON: ${error.message}`);
    }
  };

  const handleEditClick = (template) => {
    setEditTemplate(template);
    setEditJsonInput(JSON.stringify(template, null, 2));
    setDialogOpen(true);
  };

  const handlePreviewClick = (template) => {
    setPreviewTemplate(template);
    setPreviewDialogOpen(true);
  };

  const handleUpdateTemplate = () => {
    try {
      const updatedTemplate = JSON.parse(editJsonInput);
      
      // Validate template data
      const validationError = validateTemplateData(updatedTemplate);
      if (validationError) {
        setError(validationError);
        return;
      }
      
      updateTemplate(editTemplate.id, updatedTemplate);
      setDialogOpen(false);
      setError('');
      showSnackbar('Template updated successfully!');
    } catch (error) {
      setError(`Error parsing JSON: ${error.message}`);
    }
  };

  const handleDeleteTemplate = (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      deleteTemplate(templateId);
      showSnackbar('Template deleted successfully!');
    }
  };

  const handleEditTemplate = (templateId) => {
    navigate(`/editor/${templateId}`);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Template for creating a new blank template
  const createNewBlankTemplate = () => {
    const blankTemplate = {
      id: `template-${Date.now()}`,
      name: 'New Template',
      description: 'Template description',
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
      thumbnail: 'https://via.placeholder.com/800x600/ffffff/333333?text=New+Template',
      objects: []
    };
    
    setEditTemplate(null);
    setEditJsonInput(JSON.stringify(blankTemplate, null, 2));
    setDialogOpen(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Template Management
      </Typography>
      
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="Template Library" />
        <Tab label="Add New Template" />
      </Tabs>
      
      {tabValue === 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Existing Templates
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={createNewBlankTemplate}
            >
              Create New Template
            </Button>
          </Box>
          
          <Grid container spacing={3}>
            {templates.map((template) => (
              <Grid item xs={12} sm={6} md={4} key={template.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={template.thumbnail}
                    alt={template.name}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => handlePreviewClick(template)}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {template.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {template.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      ID: {template.id}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      Size: {template.width} × {template.height}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton onClick={() => handleEditClick(template)} title="Edit JSON">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEditTemplate(template.id)} title="Open in Editor">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteTemplate(template.id)} title="Delete Template">
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            
            {templates.length === 0 && (
              <Grid item xs={12}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Typography color="text.secondary">
                    No templates available. Create a new template or upload one.
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
      
      {tabValue === 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Add New Template
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<FileUploadIcon />}
            >
              Upload JSON File
              <input
                type="file"
                hidden
                accept=".json"
                onChange={handleFileChange}
              />
            </Button>
            {selectedFile && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                File selected: {selectedFile.name}
              </Typography>
            )}
          </Box>
          
          <TextField
            label="Template JSON"
            multiline
            rows={8}
            fullWidth
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            margin="normal"
            variant="outlined"
          />
          
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAddTemplate}
            disabled={!jsonInput}
            sx={{ mt: 2 }}
          >
            Add Template
          </Button>
        </Paper>
      )}
      
      {/* Edit Template Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editTemplate ? `Edit Template: ${editTemplate.name}` : 'Create New Template'}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            label="Template JSON"
            multiline
            rows={15}
            fullWidth
            value={editJsonInput}
            onChange={(e) => setEditJsonInput(e.target.value)}
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={editTemplate ? handleUpdateTemplate : handleAddTemplate}
            variant="contained" 
            color="primary"
          >
            {editTemplate ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Preview Template Dialog */}
      <Dialog open={previewDialogOpen} onClose={() => setPreviewDialogOpen(false)} maxWidth="md">
        <DialogTitle>
          Template Preview: {previewTemplate?.name}
        </DialogTitle>
        <DialogContent>
          {previewTemplate && (
            <Box>
              <img 
                src={previewTemplate.thumbnail} 
                alt={previewTemplate.name}
                style={{ width: '100%', marginBottom: '16px' }}
              />
              
              <Typography variant="h6" gutterBottom>Details</Typography>
              
              <List>
                <ListItem>
                  <ListItemText
                    primary="ID"
                    secondary={previewTemplate.id}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Dimensions"
                    secondary={`${previewTemplate.width} × ${previewTemplate.height}`}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Description"
                    secondary={previewTemplate.description}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Objects"
                    secondary={`${previewTemplate.objects ? previewTemplate.objects.length : 0} objects in template`}
                  />
                </ListItem>
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialogOpen(false)}>Close</Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              setPreviewDialogOpen(false);
              if (previewTemplate) {
                handleEditTemplate(previewTemplate.id);
              }
            }}
          >
            Open in Editor
          </Button>
        </DialogActions>
      </Dialog>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default AdminPage;
