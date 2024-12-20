import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Chip, 
  Box, 
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  Delete as DeleteIcon,
  PlayArrow as StartIcon,
  Check as CompleteIcon,
  DragIndicator as DragIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { format } from 'date-fns';

function TaskList({ tasks, updateTaskStatus, deleteTask, onDragEnd }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const getPriorityColor = (priority) => {
    const colors = {
      high: '#e74c3c',
      medium: '#f1c40f',
      low: '#2ecc71'
    };
    return colors[priority] || '#95a5a6';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': '#95a5a6',
      'In Progress': '#3498db',
      'Completed': '#2ecc71'
    };
    return colors[status] || '#95a5a6';
  };

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 3,
        backgroundColor: '#fff',
        borderRadius: 2
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.length === 0 ? (
                <Typography 
                  variant="h6" 
                  sx={{ 
                    textAlign: 'center', 
                    color: '#95a5a6',
                    py: 4
                  }}
                >
                  No tasks available. Start by adding some!
                </Typography>
              ) : (
                tasks.map((task, index) => (
                  <Draggable 
                    key={task.id} 
                    draggableId={task.id.toString()} 
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Card
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        sx={{ 
                          mb: 2,
                          backgroundColor: snapshot.isDragging ? '#f8f9fa' : '#fff',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: 3
                          }
                        }}
                      >
                        <CardContent sx={{ p: '16px !important' }}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            mb: 1
                          }}>
                            <div {...provided.dragHandleProps}>
                              <DragIcon 
                                sx={{ 
                                  mr: 1, 
                                  color: '#95a5a6',
                                  cursor: 'grab' 
                                }} 
                              />
                            </div>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                flexGrow: 1,
                                fontSize: '1.1rem',
                                fontWeight: 500
                              }}
                            >
                              {task.title}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => setSelectedTask(task)}
                              sx={{ ml: 1 }}
                            >
                              <InfoIcon />
                            </IconButton>
                          </Box>

                          <Box sx={{ mb: 2 }}>
                            <Chip 
                              label={`Priority: ${task.priority}`}
                              size="small"
                              sx={{ 
                                mr: 1,
                                backgroundColor: getPriorityColor(task.priority),
                                color: '#fff'
                              }}
                            />
                            <Chip 
                              label={task.status}
                              size="small"
                              sx={{ 
                                backgroundColor: getStatusColor(task.status),
                                color: '#fff'
                              }}
                            />
                          </Box>

                          <Typography 
                            variant="body2" 
                            color="textSecondary" 
                            sx={{ mb: 2 }}
                          >
                            {task.description}
                          </Typography>

                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 1
                          }}>
                            <Box>
                              <Button
                                size="small"
                                startIcon={<StartIcon />}
                                onClick={() => updateTaskStatus(task.id, "In Progress")}
                                sx={{ mr: 1 }}
                                disabled={task.status === 'Completed'}
                              >
                                Start
                              </Button>
                              <Button
                                size="small"
                                startIcon={<CompleteIcon />}
                                onClick={() => updateTaskStatus(task.id, "Completed")}
                                sx={{ mr: 1 }}
                                disabled={task.status === 'Completed'}
                              >
                                Complete
                              </Button>
                              <Button
                                size="small"
                                startIcon={<DeleteIcon />}
                                color="error"
                                onClick={() => setDeleteConfirm(task)}
                              >
                                Delete
                              </Button>
                            </Box>

                            <Typography 
                              variant="caption" 
                              color="textSecondary"
                            >
                              Created: {format(new Date(task.createdAt), 'MMM d, yyyy')}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Task Details Dialog */}
      <Dialog 
        open={Boolean(selectedTask)} 
        onClose={() => setSelectedTask(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedTask && (
          <>
            <DialogTitle>{selectedTask.title}</DialogTitle>
            <DialogContent>
              <Typography paragraph>{selectedTask.description}</Typography>
              <Typography variant="subtitle2">
                Priority: {selectedTask.priority}
              </Typography>
              <Typography variant="subtitle2">
                Status: {selectedTask.status}
              </Typography>
              {selectedTask.estimatedTime && (
                <Typography variant="subtitle2">
                  Estimated Time: {selectedTask.estimatedTime} hours
                </Typography>
              )}
              {selectedTask.category && (
                <Typography variant="subtitle2">
                  Category: {selectedTask.category}
                </Typography>
              )}
              {selectedTask.tags && selectedTask.tags.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">Tags:</Typography>
                  {selectedTask.tags.map((tag, index) => (
                    <Chip 
                      key={index} 
                      label={tag} 
                      size="small" 
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>
              )}
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" display="block">
                  Created: {format(new Date(selectedTask.createdAt), 'PPp')}
                </Typography>
                <Typography variant="caption" display="block">
                  Last Updated: {format(new Date(selectedTask.lastUpdated), 'PPp')}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedTask(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(deleteConfirm)}
        onClose={() => setDeleteConfirm(null)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this task?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Cancel</Button>
          <Button 
            onClick={() => {
              deleteTask(deleteConfirm.id);
              setDeleteConfirm(null);
            }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default TaskList;