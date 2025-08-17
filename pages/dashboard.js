import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import useStore from '../store/useStore'
import SimpleSidebar from '../components/SimpleSidebar'
import TaskItem from '../components/TaskItem'

export default function Dashboard() {
  const router = useRouter()
  const { user, isAuthenticated, tasks, addTask } = useStore()
  const [newTask, setNewTask] = useState({ title: '', description: '' })
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const handleAddTask = (e) => {
    e.preventDefault()
    if (newTask.title.trim()) {
      addTask({
        title: newTask.title.trim(),
        description: newTask.description.trim(),
      })
      setNewTask({ title: '', description: '' })
      setShowAddForm(false)
    }
  }

  const completedTasks = tasks.filter(task => task.completed)
  const pendingTasks = tasks.filter(task => !task.completed)

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <Head>
        <title>Dashboard - User Dashboard</title>
        <meta name="description" content="Manage your tasks and notes" />
      </Head>
      
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="flex h-screen">
          <SimpleSidebar />
          
          <main className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 animate-fade-in">
                <h1 className="text-3xl font-bold text-black dark:text-white mb-3">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Here's what you need to do today.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center">
                    <div className="p-3 bg-black dark:bg-white rounded-lg">
                      <span className="text-white dark:text-black text-xl">📋</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</p>
                      <p className="text-3xl font-bold text-black dark:text-white">{tasks.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center">
                    <div className="p-3 bg-black dark:bg-white rounded-lg">
                      <span className="text-white dark:text-black text-xl">⏰</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                      <p className="text-3xl font-bold text-black dark:text-white">{pendingTasks.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center">
                    <div className="p-3 bg-black dark:bg-white rounded-lg">
                      <span className="text-white dark:text-black text-xl">✅</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                      <p className="text-3xl font-bold text-black dark:text-white">{completedTasks.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Task Button */}
              <div className="mb-6">
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <span className="text-lg mr-2">+</span>
                  Add New Task
                </button>
              </div>

              {/* Add Task Form */}
              {showAddForm && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New Task</h3>
                  <form onSubmit={handleAddTask}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Task Title *
                        </label>
                        <input
                          type="text"
                          value={newTask.title}
                          onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter task title"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Description (optional)
                        </label>
                        <textarea
                          value={newTask.description}
                          onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter task description"
                          rows="3"
                        />
                      </div>
                      <div className="flex space-x-3">
                                                 <button
                           type="submit"
                           className="px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm"
                         >
                           Add Task
                         </button>
                         <button
                           type="button"
                           onClick={() => setShowAddForm(false)}
                           className="px-3 py-1.5 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors text-sm"
                         >
                           Cancel
                         </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {/* Tasks List */}
              <div className="space-y-6">
                {pendingTasks.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pending Tasks</h2>
                    <div className="space-y-4">
                      {pendingTasks.map(task => (
                        <TaskItem key={task.id} task={task} />
                      ))}
                    </div>
                  </div>
                )}

                {completedTasks.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Completed Tasks</h2>
                    <div className="space-y-4">
                      {completedTasks.map(task => (
                        <TaskItem key={task.id} task={task} />
                      ))}
                    </div>
                  </div>
                )}

                {tasks.length === 0 && (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No tasks</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Get started by creating a new task.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
