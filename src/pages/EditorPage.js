import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  Button, 
  Divider, 
  Tabs, 
  Tab,
  CircularProgress,
  Alert,
  Snackbar,
  IconButton
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fabric } from 'fabric';
import { useTemplates } from '../contexts/TemplateContext';
import TextControls from '../components/Editor/TextControls';
import ElementControls from '../components/Editor/ElementControls';
import ColorControls from '../components/Editor/ColorControls';
import MediaControls from '../components/Editor/MediaControls';
import { saveAs } from 'file-saver';

const EditorPage = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { getTemplateById, saveUserProject, getUserProject } = useTemplates();
  const [canvas, setCanvas] = useState(null);
  const [activeObject, setActiveObject] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  
  // Find the template
  const template = getTemplateById(templateId);
  
  // Initialize canvas with template
  useEffect(() => {
    if (!template) {
      setError('Template not found');
      setLoading(false);
      return;
    }
    
    setLoading(true);
    
    try {
      // Initialize canvas
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: template.width || 800,
        height: template.height || 600,
        backgroundColor: template.backgroundColor || '#ffffff'
      });
      
      setCanvas(fabricCanvas);
      
      // Check if there's a saved project for this template
      const savedProject = getUserProject(templateId);
      
      if (savedProject) {
        // Load saved project
        fabricCanvas.loadFromJSON(savedProject, () => {
          fabricCanvas.renderAll();
          setLoading(false);
        });
      } else {
        // Load template objects
        if (template.objects && template.objects.length > 0) {
          let loadedObjects = 0;
          const totalObjects = template.objects.length;
          
          template.objects.forEach(obj => {
            let fabricObj;
            
            switch (obj.type) {
              case 'textbox':
                fabricObj = new fabric.Textbox(obj.text, obj);
                break;
              case 'rect':
                fabricObj = new fabric.Rect(obj);
                break;
              case 'circle':
                fabricObj = new fabric.Circle(obj);
                break;
              case 'triangle':
                fabricObj = new fabric.Triangle(obj);
                break;
              case 'line':
                fabricObj = new fabric.Line([obj.x1, obj.y1, obj.x2, obj.y2], obj);
                break;
              case 'ellipse':
                fabricObj = new fabric.Ellipse(obj);
                break;
              case 'polygon':
                fabricObj = new fabric.Polygon(obj.points, obj);
                break;
              default:
                console.warn(`Unsupported object type: ${obj.type}`);
                loadedObjects++;
                return;
            }
            
            fabricCanvas.add(fabricObj);
            loadedObjects++;
            
            if (loadedObjects >= totalObjects) {
              fabricCanvas.renderAll();
              setLoading(false);
            }
          });
        } else {
          setLoading(false);
        }
      }
      
      // Handle selection events
      fabricCanvas.on('selection:created', (e) => {
        setActiveObject(e.selected[0]);
      });
      
      fabricCanvas.on('selection:updated', (e) => {
        setActiveObject(e.selected[0]);
      });
      
      fabricCanvas.on('selection:cleared', () => {
        setActiveObject(null);
      });
      
      return () => {
        fabricCanvas.dispose();
      };
    } catch (err) {
      console.error('Error initializing canvas:', err);
      setError('Failed to initialize the editor. Please try again.');
      setLoading(false);
    }
  }, [template, templateId, getUserProject]);
  
  const handleExport = () => {
    if (!canvas) return;
    
    try {
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1
      });
      
      saveAs(dataURL, `${template.name || 'design'}.png`);
      
      showSnackbar('Design exported successfully!');
    } catch (err) {
      console.error('Error exporting design:', err);
      showSnackbar('Failed to export design. Please try again.');
    }
  };
  
  const handleSave = () => {
    if (!canvas) return;
    
    try {
      const json = canvas.toJSON();
      saveUserProject(templateId, json);
      
      showSnackbar('Project saved successfully!');
    } catch (err) {
      console.error('Error saving project:', err);
      showSnackbar('Failed to save project. Please try again.');
    }
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleBack = () => {
    navigate('/');
  };
  
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  
  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Back to Home
        </Button>
      </Box>
    );
  }
  
  if (!template) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Template not found
        </Alert>
        <Button 
          variant="contained" 
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
        >
          Back to Home
        </Button>
      </Box>
    );
  }
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 128px)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={handleBack} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">
          {template.name}
        </Typography>
      </Box>
      
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {/* Canvas Area */}
        <Grid item xs={12} md={9} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Paper 
            ref={canvasContainerRef} 
            elevation={3} 
            sx={{ 
              p: 2, 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              overflow: 'auto',
              height: '100%',
              position: 'relative'
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CircularProgress sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  Loading editor...
                </Typography>
              </Box>
            ) : (
              <canvas ref={canvasRef} className="canvas-container" />
            )}
          </Paper>
        </Grid>
        
        {/* Controls Area */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
              <Tab label="Text" />
              <Tab label="Elements" />
              <Tab label="Colors" />
              <Tab label="Media" />
            </Tabs>
            
            <Box sx={{ flexGrow: 1, overflow: 'auto', mt: 2 }}>
              {tabValue === 0 && <TextControls canvas={canvas} activeObject={activeObject} />}
              {tabValue === 1 && <ElementControls canvas={canvas} />}
              {tabValue === 2 && <ColorControls canvas={canvas} activeObject={activeObject} />}
              {tabValue === 3 && <MediaControls canvas={canvas} />}
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                variant="contained" 
                startIcon={<SaveIcon />} 
                onClick={handleSave}
                disabled={loading || !canvas}
              >
                Save
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<DownloadIcon />} 
                onClick={handleExport}
                disabled={loading || !canvas}
              >
                Export
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default EditorPage;
