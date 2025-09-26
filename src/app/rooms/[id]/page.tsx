'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Star, Users, Wifi, Car, Coffee, Wind, Tv, MapPin, Phone, Mail, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BookingForm from '@/components/BookingForm'
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

export default function RoomDetailsPage() {
  const params = useParams()
  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockRooms: Room[] = [
      {
        id: 1,
        name: 'Standard Room',
        description: 'Comfortable room with essential amenities for a pleasant stay. Features a queen-size bed, modern bathroom, and all the essentials you need for a comfortable stay.',
        price_per_night: 150,
        max_guests: 2,
        room_type: 'standard',
        amenities: ['WiFi', 'Air Conditioning', 'TV', 'Private Bathroom'],
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop']
      },
      {
        id: 2,
        name: 'Deluxe Room',
        description: 'Spacious room with premium amenities and city view. Enjoy panoramic views of the city skyline while relaxing in our well-appointed deluxe accommodation.',
        price_per_night: 250,
        max_guests: 3,
        room_type: 'deluxe',
        amenities: ['WiFi', 'Air Conditioning', 'Smart TV', 'Private Bathroom', 'Mini Bar', 'City View'],
        images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop']
      },
      {
        id: 3,
        name: 'Executive Suite',
        description: 'Luxurious suite with separate living area and premium services. Perfect for business travelers or those seeking extra space and comfort.',
        price_per_night: 450,
        max_guests: 4,
        room_type: 'suite',
        amenities: ['WiFi', 'Air Conditioning', 'Smart TV', 'Private Bathroom', 'Mini Bar', 'City View', 'Living Area', 'Room Service'],
        images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop']
      },
      {
        id: 4,
        name: 'Family Room',
        description: 'Perfect for families with children, featuring connecting rooms and family-friendly amenities. Spacious layout with separate sleeping and living areas.',
        price_per_night: 350,
        max_guests: 6,
        room_type: 'family',
        amenities: ['WiFi', 'Air Conditioning', 'TV', 'Private Bathroom', 'Kitchenette', 'Balcony'],
        images: ['https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop']
      },
      {
        id: 5,
        name: 'Presidential Suite',
        description: 'Ultimate luxury with panoramic views and premium services. Our most exclusive accommodation featuring butler service and premium amenities.',
        price_per_night: 750,
        max_guests: 2,
        room_type: 'presidential',
        amenities: ['WiFi', 'Air Conditioning', 'Smart TV', 'Private Bathroom', 'Mini Bar', 'Panoramic View', 'Living Area', 'Room Service', 'Butler Service'],
        images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop']
      }
    ]

    const foundRoom = mockRooms.find(r => r.id === Number(params.id))
    setRoom(foundRoom || null)
    setLoading(false)
  }, [params.id])

  const amenityIcons: { [key: string]: any } = {
    'WiFi': Wifi,
    'Air Conditioning': Wind,
    'TV': Tv,
    'Parking': Car,
    'Coffee': Coffee,
  }

  const handleBookingSubmit = (bookingData: any) => {
    console.log('Booking data:', bookingData)
    // Handle booking submission
    // This will be implemented with the payment integration
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading room details...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Room Not Found</h1>
            <p className="text-gray-600 mb-4">The room you're looking for doesn't exist.</p>
            <Button onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-green-600">Home</a>
          <span>/</span>
          <a href="/rooms" className="hover:text-green-600">Rooms</a>
          <span>/</span>
          <span className="text-gray-900">{room.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Room Images */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={room.images[selectedImage] || '/images/placeholder-room.jpg'}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              {room.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {room.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 rounded-lg overflow-hidden ${
                        selectedImage === index ? 'ring-2 ring-green-600' : ''
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${room.name} view ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Room Details & Booking */}
          <div className="space-y-6">
            {/* Room Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{room.name}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{room.max_guests} guests</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="capitalize">{room.room_type}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">{room.description}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Amenities</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {room.amenities.map((amenity, index) => {
                        const Icon = amenityIcons[amenity] || Coffee
                        return (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <Icon className="w-4 h-4 text-green-600" />
                            <span>{amenity}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {formatPrice(room.price_per_night)}
                  </div>
                  <p className="text-gray-600 mb-4">per night</p>
                  <Button 
                    onClick={() => setShowBookingForm(!showBookingForm)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    {showBookingForm ? 'Hide Booking Form' : 'Book This Room'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Need Help?</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span className="text-sm">+234 123 456 7890</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-green-600" />
                    <span className="text-sm">info@greengrey.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="text-sm">123 Luxury Street, Victoria Island</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Booking Form */}
        {showBookingForm && (
          <div className="mt-12">
            <BookingForm
              room={room}
              onBookingSubmit={handleBookingSubmit}
              isLoading={false}
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
