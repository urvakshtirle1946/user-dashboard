import React, { useState } from 'react'
import useStore from '../store/useStore'

const TaskItem = ({ task }) => {
  const { updateTask, deleteTask, toggleTaskComplete } = useStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description || '')

  const handleSave = () => {
    if (editTitle.trim()) {
      updateTask(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditTitle(task.title)
    setEditDescription(task.description || '')
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-6 animate-fade-in">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full mb-3 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-all duration-200"
          placeholder="Task title"
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="w-full mb-4 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white transition-all duration-200"
          placeholder="Task description (optional)"
          rows="3"
        />
                 <div className="flex space-x-3">
           <button
             onClick={handleSave}
             className="px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 text-sm font-medium"
           >
             Save
           </button>
           <button
             onClick={handleCancel}
             className="px-3 py-1.5 bg-gray-200 dark:bg-gray-600 text-black dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-all duration-200 text-sm font-medium"
           >
             Cancel
           </button>
         </div>
      </div>
    )
  }

  return (
    <div className={`bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${
      task.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => toggleTaskComplete(task.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                task.completed
                  ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black'
                  : 'border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white'
              }`}
            >
              {task.completed && (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <div className="flex-1">
              <h3 className={`font-semibold text-black dark:text-white text-lg ${
                task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed ${
                  task.completed ? 'line-through' : ''
                }`}>
                  {task.description}
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-black dark:hover:text-white transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
