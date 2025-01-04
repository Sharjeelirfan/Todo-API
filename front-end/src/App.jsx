import React from "react";

const TodoList = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-700">
          📝 To-Do List
        </h1>

        {/* Input Section */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="What needs to be done?"
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
            Add
          </button>
        </div>

        {/* List Section */}
        <ul className="space-y-4">
          {/* Static List Items */}
          <li className="flex items-center justify-between p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm">
            <span className="text-gray-800 font-medium">Learn React</span>
            <button className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition">
              Delete
            </button>
          </li>
          <li className="flex items-center justify-between p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm">
            <span className="text-gray-800 font-medium">Build a To-Do App</span>
            <button className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition">
              Delete
            </button>
          </li>
          <li className="flex items-center justify-between p-4 bg-gray-100 border border-gray-200 rounded-lg shadow-sm">
            <span className="text-gray-800 font-medium">
              Explore Tailwind CSS
            </span>
            <button className="bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition">
              Delete
            </button>
          </li>
        </ul>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Made with ❤️ using React & Tailwind CSS
        </p>
      </div>
    </div>
  );
};

export default TodoList;
