import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  useEffect(() => {
    // Header scroll effect
    const header = document.getElementById('header')
    const navContent = document.getElementById('nav-content')
    const brandname = document.getElementById('brandname')
    const toToggle = document.querySelectorAll('.toggleColour')

    const handleScroll = () => {
      const scrollpos = window.scrollY

      if (scrollpos > 10) {
        header?.classList.add('bg-white', 'shadow')
        header?.classList.remove('gradient')
        navContent?.classList.add('bg-white')
        navContent?.classList.remove('bg-gray-100')
        
        toToggle.forEach((el) => {
          el.classList.add('text-gray-800')
          el.classList.remove('text-white')
        })
      } else {
        header?.classList.remove('bg-white', 'shadow')
        navContent?.classList.remove('bg-white')
        navContent?.classList.add('bg-gray-100')
        
        toToggle.forEach((el) => {
          el.classList.add('text-white')
          el.classList.remove('text-gray-800')
        })
      }
    }

    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
