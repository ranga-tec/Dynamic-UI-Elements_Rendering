import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Chip, Box } from '@mui/material';
import { format } from 'date-fns';

function TaskDetails({ task, open, onClose }) {
  if (!task) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{task.title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          {task.description}
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Priority: 
            <Chip 
              label={task.priority}
              color={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'success'}
              size="small"
              sx={{ ml: 1 }}
            />
          </Typography>
        </Box>

        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          Category: {task.category}
        </Typography>

        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          Estimated Time: {task.estimatedTime}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>Tags:</Typography>
          {task.tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
          ))}
        </Box>

        <Typography variant="caption" display="block" sx={{ mt: 2 }}>
          Created: {format(new Date(task.createdAt), 'PPp')}
        </Typography>
        
        <Typography variant="caption" display="block">
          Last Updated: {format(new Date(task.lastUpdated), 'PPp')}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

export default TaskDetails;