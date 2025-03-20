'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { HiMenu, HiX } from 'react-icons/hi'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isTransparentPage = pathname === '/'
  const isExpertsPage = pathname.includes('/experts')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0)
    
    if (!isTransparentPage) {
      setIsScrolled(window.scrollY > 0)
      window.addEventListener('scroll', handleScroll)
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isTransparentPage])

  useEffect(() => setIsMenuOpen(false), [pathname])

  const navbarBg = isExpertsPage 
    ? isScrolled ? 'bg-slate-800/90 backdrop-blur-md border-b border-slate-700/50' : 'bg-transparent' 
    : isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
  
  const textColor = isExpertsPage ? 'text-white' : isScrolled ? 'text-gray-900' : 'text-white'
  const hoverEffect = isExpertsPage ? 'hover:text-blue-400' : 'hover:opacity-75'

  const getLinkClass = (page) => 
    `font-medium ${textColor} ${hoverEffect} transition-colors ${pathname.includes(page) ? (isExpertsPage ? 'text-blue-400' : 'opacity-75') : ''}`

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${navbarBg} py-3`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif font-bold group">
            <span className={textColor}>PERRIN</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {['/experts', '/Labs', '/events', '/application'].map((page) => (
              <Link key={page} href={page} className={getLinkClass(page)}>
                {page.replace('/', '')}
              </Link>
            ))}
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className={`md:hidden p-2 focus:outline-none ${textColor}`}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`fixed inset-0 z-40 ${isExpertsPage ? 'bg-slate-900' : 'bg-white'}`} style={{ top: '60px' }}>
          <div className="px-4 pt-2 pb-3 space-y-1">
            {['/experts', '/Labs', '/events', '/application'].map((page) => (
              <Link 
                key={page} 
                href={page} 
                className={`block px-3 py-4 rounded-md text-base font-medium border-b ${
                  isExpertsPage 
                    ? 'text-white hover:text-blue-400 border-slate-700' 
                    : 'text-gray-900 hover:bg-gray-50 border-gray-200'
                } ${pathname.includes(page) ? (isExpertsPage ? 'text-blue-400' : 'bg-gray-50') : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {page.replace('/', '')}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
