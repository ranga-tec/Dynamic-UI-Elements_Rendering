import React from "react";

function TaskStats({ tasks }) {
  const stats = tasks.reduce(
    (acc, task) => {
      acc.total++;
      acc[task.status.toLowerCase()]++;
      return acc;
    },
    {
      total: 0,
      pending: 0,
      "in progress": 0,
      completed: 0,
    }
  );

  const getProgressPercentage = () => {
    if (stats.total === 0) return 0;
    return Math.round((stats.completed / stats.total) * 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
        <p className="text-2xl font-semibold mt-1">{stats.total}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-sm font-medium text-gray-500">Pending</h3>
        <p className="text-2xl font-semibold mt-1 text-yellow-600">
          {stats.pending}
        </p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-sm font-medium text-gray-500">In Progress</h3>
        <p className="text-2xl font-semibold mt-1 text-blue-600">
          {stats["in progress"]}
        </p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-sm font-medium text-gray-500">Completed</h3>
        <div className="flex items-center mt-1">
          <p className="text-2xl font-semibold text-green-600">
            {stats.completed}
          </p>
          <span className="text-sm text-gray-500 ml-2">
            ({getProgressPercentage()}%)
          </span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 rounded-full h-2 transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskStats;