import { useState, useEffect } from 'react'
import Head from 'next/head'
import useStore from '../store/useStore'
import SimpleSidebar from '../components/SimpleSidebar'
import FormInput from '../components/FormInput'

export default function Profile() {
  const { user, isAuthenticated, updateProfile } = useStore()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && !isAuthenticated) {
      window.location.href = '/'
    } else if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
      })
    }
  }, [isClient, isAuthenticated, user])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    // Mock update delay
    setTimeout(() => {
      updateProfile({
        name: formData.name.trim(),
        email: formData.email.trim(),
        bio: formData.bio.trim(),
      })
      setIsLoading(false)
      setIsSuccess(true)
      
      // Hide success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000)
    }, 1000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Show loading state during SSR or when not authenticated
  if (!isClient || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Profile - User Dashboard</title>
        <meta name="description" content="Edit your profile information" />
      </Head>
      
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="flex h-screen">
          <SimpleSidebar />
          
          <main className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8 animate-fade-in">
                <h1 className="text-3xl font-bold text-black dark:text-white mb-3">
                  Profile Settings
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Update your personal information and preferences.
                </p>
              </div>

              {/* Success Message */}
              {isSuccess && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-fade-in">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">✅</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">
                        Profile updated successfully!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-8">
                                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center space-x-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="h-20 w-20 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black text-2xl font-bold">
                          {user?.name?.charAt(0) || 'U'}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-black dark:text-white">
                          Profile Picture
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Upload a new profile picture (coming soon)
                        </p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                      <FormInput
                        label="Full Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        error={errors.name}
                        required
                        icon="👤"
                      />
                      
                      <FormInput
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        error={errors.email}
                        required
                        icon="📧"
                      />
                    
                                                               <div>
                        <label className="block text-sm font-semibold text-black dark:text-white mb-3">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          rows="4"
                          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                          placeholder="Tell us a little about yourself..."
                        />
                      </div>
                   </div>

                                       {/* Submit Button */}
                    <div className="flex justify-end">
                                             <button
                         type="submit"
                         disabled={isLoading}
                         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                       >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                          </>
                        ) : (
                          'Update Profile'
                        )}
                      </button>
                    </div>
                </form>
              </div>

                                                           {/* Account Info */}
                <div className="mt-8 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-8">
                  <h3 className="text-xl font-semibold text-black dark:text-white mb-6 flex items-center">
                    <span className="mr-2">🔐</span>
                    Account Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">User ID:</span>
                      <span className="text-sm font-semibold text-black dark:text-white bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg">{user?.id}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Member since:</span>
                      <span className="text-sm font-semibold text-black dark:text-white bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg">
                        {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                      </span>
                    </div>
                  </div>
                </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
