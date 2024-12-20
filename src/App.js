import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ priority: "" });
  const [sortBy, setSortBy] = useState("createdAt");
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const analyzeTaskDistribution = async () => {
    if (tasks.length === 0) {
      toast.warning("Please add some tasks first!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/analyze-tasks", {
        tasks: tasks
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log("Analysis response:", response.data);
      setAnalysis(response.data);
      toast.success("Task analysis completed!");
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Failed to analyze tasks");
    }
  };

  const generateSuggestedTasks = async (category) => {
    try {
      const response = await axios.post("http://localhost:5000/generate-tasks", {
        prompt: category
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("Generated tasks response:", response.data);
      
      if (response.data && Array.isArray(response.data)) {
        setTasks(prevTasks => [...prevTasks, ...response.data]);
        toast.success("Tasks generated successfully!");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error details:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Failed to generate tasks");
    }
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status: newStatus, lastUpdated: new Date().toISOString() }
          : task
      )
    );
    toast.success(`Task marked as ${newStatus}!`);
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.error("Task deleted!");
  };

  const handleFilterChange = (filterType, value) => {
    setFilter(prev => ({ ...prev, [filterType]: value }));
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  const filteredAndSortedTasks = tasks
    .filter(task => {
      if (!filter.priority) return true;
      return task.priority === filter.priority;
    })
    .sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (sortBy === "estimatedTime") {
        return parseFloat(a.estimatedTime) - parseFloat(b.estimatedTime);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
   
    

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: '#fafafa' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            textAlign: 'center',
            color: '#2c3e50',
            mb: 4,
            fontWeight: 600
          }}
        >
          AI-Powered Task Manager
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          mb: 4,
          justifyContent: 'center' 
        }}>
          <Button 
            variant="contained" 
            onClick={analyzeTaskDistribution}
            sx={{ 
              backgroundColor: '#3498db',
              '&:hover': {
                backgroundColor: '#2980b9'
              }
            }}
          >
            Analyze Tasks
          </Button>
          <Button 
            variant="contained" 
            onClick={() => generateSuggestedTasks("project management")}
            sx={{ 
              backgroundColor: '#2ecc71',
              '&:hover': {
                backgroundColor: '#27ae60'
              }
            }}
          >
            Get Suggestions
          </Button>
        </Box>

        {analysis && (
          <Paper 
            elevation={2} 
            sx={{ 
              mb: 4, 
              p: 3, 
              backgroundColor: '#fff',
              borderRadius: 2
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: '#34495e' }}>
              Task Analysis
            </Typography>
            <Typography sx={{ mb: 1 }}>
              Priority Distribution: {analysis.priorityDistribution}
            </Typography>
            <Typography sx={{ mb: 1 }}>
              Efficiency Score: {analysis.efficiencyScore}
            </Typography>
            <Typography>
              Suggestions: {analysis.suggestions}
            </Typography>
          </Paper>
        )}

        <TaskFilters 
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />

        <TaskForm setTasks={setTasks} />

        <TaskList
          tasks={filteredAndSortedTasks}
          updateTaskStatus={updateTaskStatus}
          deleteTask={deleteTask}
          onDragEnd={handleDragEnd}
        />

        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Paper>
    </Container>
  );
}

export default App;