import React from 'react';

function TaskExport({ tasks, onImport }) {
  const handleExport = () => {
    const exportData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      tasks: tasks
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tasks-export-${new Date().toLocaleDateString()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          if (importedData.version && importedData.tasks) {
            onImport(importedData.tasks);
          } else {
            throw new Error('Invalid file format');
          }
        } catch (error) {
          alert('Error importing tasks: Invalid file format');
        }
      };
      reader.readAsText(file);
    }
    event.target.value = null; // Reset input
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleExport}
        className="button button-secondary flex items-center gap-2"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        Export Tasks
      </button>

      <label className="button button-secondary flex items-center gap-2 cursor-pointer">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
          />
        </svg>
        Import Tasks
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </label>
    </div>
  );
}

export default TaskExport;