import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import useStore from '../store/useStore'
import FormInput from '../components/FormInput'

export default function Login() {
  const { login, isAuthenticated } = useStore()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && isAuthenticated) {
      window.location.href = '/dashboard'
    }
  }, [isClient, isAuthenticated])

  // Show loading state during SSR
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    
    // Mock authentication delay
    setTimeout(() => {
      // Mock user data
      const userData = {
        id: 1,
        name: 'John Doe',
        email: formData.email,
        avatar: 'https://via.placeholder.com/150',
      }
      
      login(userData)
      setIsLoading(false)
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

  return (
    <>
      <Head>
        <title>Login - User Dashboard</title>
        <meta name="description" content="Login to your dashboard" />
      </Head>
      
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-black dark:bg-white rounded-lg flex items-center justify-center mb-6">
              <span className="text-white dark:text-black text-2xl font-bold">U</span>
            </div>
            <h2 className="text-3xl font-bold text-black dark:text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to access your dashboard
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
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
                
                <FormInput
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  error={errors.password}
                  required
                  icon="🔒"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <a
                    href="/register"
                    className="font-medium text-black dark:text-white hover:underline transition-colors"
                  >
                    Sign up here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
