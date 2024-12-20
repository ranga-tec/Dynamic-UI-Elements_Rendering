import React, { useState } from "react";
import { 
  TextField, 
  Button, 
  Box, 
  Paper, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Grid 
} from '@mui/material';

function TaskForm({ setTasks }) {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "medium",
    estimatedTime: "",
    category: "",
    tags: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      ...taskData,
      status: "Pending",
      tags: taskData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    setTaskData({
      title: "",
      description: "",
      priority: "medium",
      estimatedTime: "",
      category: "",
      tags: ""
    });
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        mb: 4, 
        backgroundColor: '#fff',
        borderRadius: 2
      }}
    >
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2 
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Task Title"
              value={taskData.title}
              onChange={(e) => setTaskData({...taskData, title: e.target.value})}
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#3498db',
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={taskData.description}
              onChange={(e) => setTaskData({...taskData, description: e.target.value})}
              multiline
              rows={3}
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#3498db',
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={taskData.priority}
                label="Priority"
                onChange={(e) => setTaskData({...taskData, priority: e.target.value})}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#3498db',
                    },
                  },
                }}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Estimated Time (hours)"
              type="number"
              value={taskData.estimatedTime}
              onChange={(e) => setTaskData({...taskData, estimatedTime: e.target.value})}
              inputProps={{ min: "0", step: "0.5" }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#3498db',
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Category"
              value={taskData.category}
              onChange={(e) => setTaskData({...taskData, category: e.target.value})}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#3498db',
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tags (comma-separated)"
              value={taskData.tags}
              onChange={(e) => setTaskData({...taskData, tags: e.target.value})}
              placeholder="e.g., urgent, backend, feature"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#3498db',
                  },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,
                backgroundColor: '#3498db',
                '&:hover': {
                  backgroundColor: '#2980b9',
                },
                fontSize: '1.1rem',
                fontWeight: 500
              }}
            >
              Add Task
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default TaskForm;