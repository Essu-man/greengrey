'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Calendar, Phone, Mail, User, LogOut } from 'lucide-react'
import { Button } from './ui/Button'

interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  role: string
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/auth/me')
      const result = await response.json()
      
      if (result.success) {
        setUser(result.user)
      }
    } catch (error) {
      // User not authenticated
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-2xl">G</span>
            </div>
            <span className="text-3xl font-bold text-gray-900 tracking-tight">GreenGrey</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link href="/" className="text-gray-800 hover:text-green-600 transition-all duration-300 font-semibold hover:scale-105">
              Home
            </Link>
            <Link href="/rooms" className="text-gray-800 hover:text-green-600 transition-all duration-300 font-semibold hover:scale-105">
              Rooms
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-green-600 transition-all duration-300 font-semibold hover:scale-105">
              About
            </Link>
            <Link href="/contact" className="text-gray-800 hover:text-green-600 transition-all duration-300 font-semibold hover:scale-105">
              Contact
            </Link>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>+233 24 123 4567</span>
            </div>
            
            {loading ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-green-600">
                  <User className="w-4 h-4" />
                  <span>{user.firstName}</span>
                </Link>
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  size="sm"
                  className="text-gray-600 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl">
              Book Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/rooms" 
                className="text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Rooms
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                  <Phone className="w-4 h-4" />
                  <span>+233 24 123 4567</span>
                </div>
                
                {loading ? (
                  <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse mb-4"></div>
                ) : user ? (
                  <div className="space-y-2 mb-4">
                    <Link 
                      href="/dashboard" 
                      className="flex items-center space-x-2 text-gray-700 hover:text-green-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>{user.firstName}</span>
                    </Link>
                    <Button 
                      onClick={handleLogout}
                      variant="outline" 
                      size="sm"
                      className="w-full text-gray-600 hover:text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2 mb-4">
                    <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
                
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Book Now
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}