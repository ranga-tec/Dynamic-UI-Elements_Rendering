import React from 'react';

function TaskBoard({ tasks, onUpdateTask, onDeleteTask }) {
  const columns = {
    'Pending': tasks.filter(task => task.status === 'Pending'),
    'In Progress': tasks.filter(task => task.status === 'In Progress'),
    'Completed': tasks.filter(task => task.status === 'Completed')
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.entries(columns).map(([status, statusTasks]) => (
        <div key={status} className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold mb-4">{status}</h3>
          <div className="space-y-4">
            {statusTasks.map(task => (
              <div key={task.id} className="bg-white p-4 rounded shadow">
                <h4 className="font-semibold">{task.title}</h4>
                <div className="flex gap-2 mt-2">
                  {status !== 'In Progress' && (
                    <button
                      onClick={() => onUpdateTask(task.id, { status: 'In Progress' })}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Start
                    </button>
                  )}
                  {status !== 'Completed' && (
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
        </div>
      ))}
    </div>
  );
}

export default TaskBoard;