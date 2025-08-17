import React from 'react'

const FormInput = ({ 
  label, 
  type = 'text', 
  name,
  value, 
  onChange, 
  placeholder, 
  error, 
  required = false,
  className = '',
  icon
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-black dark:text-white mb-3">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 text-lg">{icon}</span>
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${error 
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 dark:border-gray-600 focus:border-black dark:focus:border-white'
            }
            bg-white dark:bg-gray-900 text-black dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
            hover:border-gray-400 dark:hover:border-gray-500
          `}
        />
      </div>
      {error && (
        <div className="mt-2 flex items-center text-sm text-red-600 dark:text-red-400">
          <span className="mr-1">⚠️</span>
          {error}
        </div>
      )}
    </div>
  )
}

export default FormInput
