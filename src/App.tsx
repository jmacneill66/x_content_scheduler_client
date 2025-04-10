import React from 'react';

const App = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r p-4">
        <h2 className="text-xl font-bold mb-6">X Scheduler</h2>
        <ul className="space-y-2">
          <li><button className="w-full text-left hover:text-blue-600">Drafts</button></li>
          <li><button className="w-full text-left hover:text-blue-600">Scheduled</button></li>
          <li><button className="w-full text-left hover:text-blue-600">Posted</button></li>
          <li><button className="w-full text-left hover:text-blue-600">Settings</button></li>
        </ul>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">Create New Post</h1>
        <textarea
          placeholder="What’s happening?"
          className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none mb-4"
        />
        <input
          type="text"
          placeholder="Tags (e.g., #python, #ai)"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        <div className="mb-4">
          <label className="block mb-1 font-medium">Schedule Time</label>
          <input
            type="datetime-local"
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <button className="px-4 py-2 mr-2 bg-blue-600 text-white rounded-md">Desktop Preview</button>
          <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md">Mobile Preview</button>
        </div>
        <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Schedule Post
        </button>
      </main>
    </div>
  );
};

export default App;