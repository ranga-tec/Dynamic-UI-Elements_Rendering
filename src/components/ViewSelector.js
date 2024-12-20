import React from 'react';

function ViewSelector({ currentView, onViewChange, views }) {
  return (
    <div className="flex gap-2">
      {Object.entries(views).map(([viewType, config]) => (
        <button
          key={viewType}
          onClick={() => onViewChange(viewType)}
          className={`px-4 py-2 rounded-lg ${
            currentView === viewType
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {config.name}
        </button>
      ))}
    </div>
  );
}

export default ViewSelector;