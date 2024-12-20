import React from 'react';
import TaskList from './TaskList';
import TaskBoard from './TaskBoard';
import TaskGrid from './TaskGrid';
import { VIEW_TYPES } from '../config/viewsConfig';

const COMPONENT_MAP = {
  [VIEW_TYPES.LIST]: TaskList,
  [VIEW_TYPES.BOARD]: TaskBoard,
  [VIEW_TYPES.GRID]: TaskGrid,
};

function LayoutManager({ currentView, tasks, onUpdateTask, onDeleteTask }) {
  // Dynamically get the component based on current view
  const ViewComponent = COMPONENT_MAP[currentView] || TaskList;

  return (
    <div className="layout-container">
      <ViewComponent
        tasks={tasks}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
      />
    </div>
  );
}

export default LayoutManager;