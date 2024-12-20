import React from 'react';

// Basic UI components
const TaskCard = ({ task, onUpdate, onDelete }) => (
  <div className="bg-white rounded-lg shadow p-4">
    <h3>{task.title}</h3>
    <div className="controls">{/* controls */}</div>
  </div>
);

const TaskList = ({ tasks }) => (
  <div className="space-y-4">{/* list view */}</div>
);

const TaskGrid = ({ tasks }) => (
  <div className="grid grid-cols-3 gap-4">{/* grid view */}</div>
);

const TaskBoard = ({ tasks }) => (
  <div className="flex gap-4">{/* kanban view */}</div>
);

// Registry of available components
export const componentRegistry = {
  TaskCard,
  TaskList,
  TaskGrid,
  TaskBoard,
  // Add more components as needed
};

// Component types and their configurations
export const componentTypes = {
  TASK_VIEW: {
    LIST: {
      component: 'TaskList',
      props: { layout: 'vertical' }
    },
    GRID: {
      component: 'TaskGrid',
      props: { columns: 3 }
    },
    BOARD: {
      component: 'TaskBoard',
      props: { columns: ['Todo', 'In Progress', 'Done'] }
    }
  }
};