'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Users, Wifi, Car, Coffee, Wind, Tv } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import RoomCard from '@/components/RoomCard'
import { formatPrice } from '@/lib/utils'

interface Room {
  id: number
  name: string
  description: string
  price_per_night: number
  max_guests: number
  room_type: string
  amenities: string[]
  images: string[]
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [roomType, setRoomType] = useState('all')
  const [guests, setGuests] = useState(1)
  const [loading, setLoading] = useState(true)

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockRooms: Room[] = [
      {
        id: 1,
        name: 'Standard Room',
        description: 'Comfortable room with essential amenities for a pleasant stay',
        price_per_night: 150,
        max_guests: 2,
        room_type: 'standard',
        amenities: ['WiFi', 'Air Conditioning', 'TV', 'Private Bathroom'],
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop']
      },
      {
        id: 2,
        name: 'Deluxe Room',
        description: 'Spacious room with premium amenities and city view',
        price_per_night: 250,
        max_guests: 3,
        room_type: 'deluxe',
        amenities: ['WiFi', 'Air Conditioning', 'Smart TV', 'Private Bathroom', 'Mini Bar', 'City View'],
        images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop']
      },
      {
        id: 3,
        name: 'Executive Suite',
        description: 'Luxurious suite with separate living area and premium services',
        price_per_night: 450,
        max_guests: 4,
        room_type: 'suite',
        amenities: ['WiFi', 'Air Conditioning', 'Smart TV', 'Private Bathroom', 'Mini Bar', 'City View', 'Living Area', 'Room Service'],
        images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop']
      },
      {
        id: 4,
        name: 'Family Room',
        description: 'Perfect for families with children, featuring connecting rooms',
        price_per_night: 350,
        max_guests: 6,
        room_type: 'family',
        amenities: ['WiFi', 'Air Conditioning', 'TV', 'Private Bathroom', 'Kitchenette', 'Balcony'],
        images: ['https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop']
      },
      {
        id: 5,
        name: 'Presidential Suite',
        description: 'Ultimate luxury with panoramic views and premium services',
        price_per_night: 750,
        max_guests: 2,
        room_type: 'presidential',
        amenities: ['WiFi', 'Air Conditioning', 'Smart TV', 'Private Bathroom', 'Mini Bar', 'Panoramic View', 'Living Area', 'Room Service', 'Butler Service'],
        images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop']
      }
    ]

    setRooms(mockRooms)
    setFilteredRooms(mockRooms)
    setLoading(false)
  }, [])

  // Filter rooms based on search criteria
  useEffect(() => {
    let filtered = rooms.filter(room => {
      const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           room.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPrice = room.price_per_night >= priceRange[0] && room.price_per_night <= priceRange[1]
      const matchesType = roomType === 'all' || room.room_type === roomType
      const matchesGuests = room.max_guests >= guests

      return matchesSearch && matchesPrice && matchesType && matchesGuests
    })

    setFilteredRooms(filtered)
  }, [rooms, searchTerm, priceRange, roomType, guests])

  const roomTypes = [
    { value: 'all', label: 'All Rooms' },
    { value: 'standard', label: 'Standard' },
    { value: 'deluxe', label: 'Deluxe' },
    { value: 'suite', label: 'Suite' },
    { value: 'family', label: 'Family' },
    { value: 'presidential', label: 'Presidential' },
  ]

  const amenityIcons: { [key: string]: any } = {
    'WiFi': Wifi,
    'Air Conditioning': Wind,
    'TV': Tv,
    'Parking': Car,
    'Coffee': Coffee,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading rooms...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Our Rooms & Suites
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Discover our carefully designed accommodations, each offering comfort, 
            style, and modern amenities for an unforgettable stay.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Room Type */}
            <select
              value={roomType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRoomType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {roomTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            {/* Guests */}
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>
                  {num} Guest{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>

            {/* Price Range */}
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Min Price"
                value={priceRange[0]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full"
              />
              <span className="text-gray-500">-</span>
              <Input
                type="number"
                placeholder="Max Price"
                value={priceRange[1]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredRooms.length} Room{filteredRooms.length !== 1 ? 's' : ''} Found
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
                <option value="guests">Max Guests</option>
              </select>
            </div>
          </div>

          {filteredRooms.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No rooms found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria to find more rooms.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('')
                  setPriceRange([0, 100000])
                  setRoomType('all')
                  setGuests(1)
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map(room => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
