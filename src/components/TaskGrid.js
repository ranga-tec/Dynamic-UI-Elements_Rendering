import React from 'react';

function TaskGrid({ tasks, onUpdateTask, onDeleteTask }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map(task => (
        <div key={task.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold">{task.title}</h3>
            <span className={`text-sm px-2 py-1 rounded ${
              task.status === 'Completed' ? 'bg-green-100 text-green-800' :
              task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {task.status}
            </span>
          </div>
          <div className="flex gap-2 mt-4">
            {task.status !== 'In Progress' && (
              <button
                onClick={() => onUpdateTask(task.id, { status: 'In Progress' })}
                className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
              >
                Start
              </button>
            )}
            {task.status !== 'Completed' && (
              <button
                onClick={() => onUpdateTask(task.id, { status: 'Completed' })}
                className="bg-green-500 text-white px-2 py-1 rounded text-sm"
              >
                Complete
              </button>
            )}
            <button
              onClick={() => onDeleteTask(task.id)}
              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskGrid;