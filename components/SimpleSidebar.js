import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import useStore from '../store/useStore'

const SimpleSidebar = () => {
  const { user, logout, isDarkMode, toggleDarkMode } = useStore()
  const [currentPath, setCurrentPath] = useState('')

  useEffect(() => {
    setCurrentPath(window.location.pathname)
  }, [])

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }



  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/profile', label: 'Profile', icon: '👤' },
  ]

  return (
    <aside className="bg-white dark:bg-black border-r border-gray-300 dark:border-gray-700 w-72 min-h-screen animate-slide-in">
      <div className="p-6">
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-black font-bold text-lg">U</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-black dark:text-white">
                Dashboard
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                User Management
              </p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => (
                         <Link
               key={item.href}
               href={item.href}
               className={`
                 flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group cursor-pointer
                 ${currentPath === item.href
                   ? 'bg-black dark:bg-white text-white dark:text-black'
                   : 'text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                 }
               `}

             >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.label}
              {currentPath === item.href && (
                <div className="ml-auto w-2 h-2 bg-white dark:bg-black rounded-full"></div>
              )}
            </Link>
          ))}
          
                     <button
             onClick={handleLogout}
             className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
           >
            <span className="mr-3 text-lg">🚪</span>
            Logout
          </button>
        </nav>
        
        {/* Theme Toggle */}
        <div className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-700">
                     <button
             onClick={toggleDarkMode}
             className="w-full flex items-center px-4 py-2 text-sm font-medium text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
           >
            <span className="mr-3 text-lg">
              {isDarkMode ? '🌙' : '☀️'}
            </span>
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
        
        {/* User Profile */}
        {user && (
          <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-700">
            <div className="flex items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <div className="h-10 w-10 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-semibold">
                {user.name?.charAt(0) || 'U'}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-black dark:text-white">
                  {user.name || 'User'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {user.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default SimpleSidebar
