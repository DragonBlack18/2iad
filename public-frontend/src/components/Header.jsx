import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Startups', href: '/startups' },
    { name: 'Editais', href: '/editais' },
    { name: 'Parceiros', href: '/parceiros' },
    { name: 'Contato', href: '/contato' },
  ]
  
  const isActive = (path) => location.pathname === path
  
  return (
    <nav id="header" className="fixed w-full z-30 top-0 text-white transition-all duration-300">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-3 px-6">
        {/* Logo */}
        <div className="pl-0 md:pl-4 flex items-center">
          <Link 
            to="/" 
            className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl transition-colors"
            id="brandname"
          >
            <span className="font-bold">2IAD</span>
            <span className="font-normal text-lg lg:text-2xl"> Incubadora</span>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="block lg:hidden pr-4">
          <button 
            id="nav-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center p-1 text-white hover:text-gray-200 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Navigation */}
        <div 
          className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? '' : 'hidden'} mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20 rounded-lg lg:rounded-none`}
          id="nav-content"
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            {navigation.map((item) => (
              <li key={item.name} className="mr-3">
                <Link
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`inline-block no-underline py-2 px-4 font-bold transition-colors ${
                    isActive(item.href)
                      ? 'text-gray-800 lg:text-white'
                      : 'text-black lg:text-white hover:text-gray-600 lg:hover:text-gray-200'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  )
}
