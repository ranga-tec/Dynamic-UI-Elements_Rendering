import React from 'react';
import { 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel, 
  Box, 
  Paper 
} from '@mui/material';

function TaskFilters({ onFilterChange, onSortChange }) {
  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 3, 
        mb: 4, 
        backgroundColor: '#fff',
        borderRadius: 2
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        gap: 3,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <FormControl 
          sx={{ 
            minWidth: 200,
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#3498db',
              },
            },
          }}
        >
          <InputLabel 
            id="priority-filter-label"
            sx={{ 
              color: '#7f8c8d',
              '&.Mui-focused': {
                color: '#3498db',
              },
            }}
          >
            Priority
          </InputLabel>
          <Select
            labelId="priority-filter-label"
            defaultValue=""
            label="Priority"
            onChange={(e) => onFilterChange('priority', e.target.value)}
            sx={{
              '& .MuiSelect-select': {
                padding: '14px',
              },
            }}
          >
            <MenuItem value="">All Tasks</MenuItem>
            <MenuItem value="high">High Priority</MenuItem>
            <MenuItem value="medium">Medium Priority</MenuItem>
            <MenuItem value="low">Low Priority</MenuItem>
          </Select>
        </FormControl>

        <FormControl 
          sx={{ 
            minWidth: 200,
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: '#3498db',
              },
            },
          }}
        >
          <InputLabel 
            id="sort-by-label"
            sx={{ 
              color: '#7f8c8d',
              '&.Mui-focused': {
                color: '#3498db',
              },
            }}
          >
            Sort By
          </InputLabel>
          <Select
            labelId="sort-by-label"
            defaultValue="createdAt"
            label="Sort By"
            onChange={(e) => onSortChange(e.target.value)}
            sx={{
              '& .MuiSelect-select': {
                padding: '14px',
              },
            }}
          >
            <MenuItem value="createdAt">Date Created</MenuItem>
            <MenuItem value="priority">Priority Level</MenuItem>
            <MenuItem value="estimatedTime">Time Estimate</MenuItem>
            <MenuItem value="status">Status</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
}

export default TaskFilters;