import React from 'react';
import { format } from 'date-fns';
import { Draggable } from 'react-beautiful-dnd';

function TaskCard({ task, index, onUpdateStatus, onDelete, onOpenDetails }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task-card group"
        >
          <div onClick={() => onOpenDetails(task)} className="cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <span className={`status-badge ${task.status.toLowerCase().replace(" ", "-")}`}>
                {task.status}
              </span>
            </div>

            {task.description && (
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {task.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-2 py-1 rounded-md text-xs ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
              
              {task.category && (
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs">
                  {task.category}
                </span>
              )}

              {task.dueDate && (
                <span className={`px-2 py-1 rounded-md text-xs ${
                  isOverdue ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                </span>
              )}
            </div>

            {task.tags && task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {task.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              Created: {format(new Date(task.createdAt), 'MMM d, yyyy')}
            </div>
            
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {task.status !== "In Progress" && (
                <button
                  className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => onUpdateStatus(task.id, "In Progress")}
                >
                  Start
                </button>
              )}
              {task.status !== "Completed" && (
                <button
                  className="text-xs px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => onUpdateStatus(task.id, "Completed")}
                >
                  Complete
                </button>
              )}
              <button
                className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => onDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;