import Link from 'next/link'
import Image from 'next/image'
import { Star, Wifi, Car, Coffee, Shield, Clock, Users, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  const amenities = [
    { icon: Wifi, name: 'Free WiFi', description: 'High-speed internet throughout' },
    { icon: Car, name: 'Parking', description: 'Complimentary parking space' },
    { icon: Coffee, name: 'Breakfast', description: 'Daily continental breakfast' },
    { icon: Shield, name: 'Security', description: '24/7 security surveillance' },
    { icon: Clock, name: '24/7 Service', description: 'Round-the-clock assistance' },
    { icon: Users, name: 'Concierge', description: 'Personal concierge service' },
  ]

  const featuredRooms = [
    {
      id: 1,
      name: 'Deluxe Room',
      price: 250,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop',
      description: 'Spacious room with premium amenities and city view',
      maxGuests: 3,
    },
    {
      id: 2,
      name: 'Executive Suite',
      price: 450,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop',
      description: 'Luxurious suite with separate living area',
      maxGuests: 4,
    },
    {
      id: 3,
      name: 'Presidential Suite',
      price: 750,
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop',
      description: 'Ultimate luxury with panoramic views',
      maxGuests: 2,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
        <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop"
            alt="Luxury Guest House"
            fill
            className="object-cover"
          priority
        />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-green-400">GreenGrey</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Experience luxury and comfort in the heart of the city
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rooms">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                View Rooms
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose GreenGrey?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide exceptional hospitality with modern amenities and personalized service 
              to ensure your stay is memorable and comfortable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <amenity.icon className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{amenity.name}</h3>
                  <p className="text-gray-600">{amenity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Rooms</h2>
            <p className="text-xl text-gray-600">
              Choose from our carefully curated selection of luxurious accommodations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <Card key={room.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
            <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-green-600">
                      GHS {room.price.toLocaleString()}/night
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                  <p className="text-gray-600 mb-4">{room.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{room.maxGuests} guests</span>
                    </div>
                    <Link href={`/rooms/${room.id}`}>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/rooms">
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                View All Rooms
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Guests Say</h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our satisfied guests
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                location: 'Accra, Ghana',
                rating: 5,
                review: 'Exceptional service and beautiful rooms. The staff went above and beyond to make our stay memorable.',
              },
              {
                name: 'Michael Chen',
                location: 'New York, USA',
                rating: 5,
                review: 'Perfect location with modern amenities. The presidential suite exceeded all expectations.',
              },
              {
                name: 'Aisha Ibrahim',
                location: 'Abuja, Nigeria',
                rating: 5,
                review: 'Outstanding hospitality and attention to detail. Highly recommend for business travelers.',
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.review}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Book Your Stay?</h2>
          <p className="text-xl text-green-100 mb-8">
            Experience luxury and comfort at GreenGrey Guest House
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/rooms">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Book Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
