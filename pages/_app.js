import '../styles/globals.css'
import { useEffect } from 'react'
import useStore from '../store/useStore'

function MyApp({ Component, pageProps }) {
  const { isDarkMode } = useStore()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return <Component {...pageProps} />
}

export default MyApp
