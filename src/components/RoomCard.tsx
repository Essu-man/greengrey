import Image from 'next/image'
import Link from 'next/link'
import { Users, Wifi, Car, Coffee, Wind, Tv } from 'lucide-react'
import { Card, CardContent, CardFooter } from './ui/Card'
import { Button } from './ui/Button'
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

interface RoomCardProps {
  room: Room
}

const amenityIcons: { [key: string]: any } = {
  'WiFi': Wifi,
  'Air Conditioning': Wind,
  'TV': Tv,
  'Parking': Car,
  'Coffee': Coffee,
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative h-80 overflow-hidden">
        <Image
          src={room.images[0] || '/images/placeholder-room.jpg'}
          alt={room.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl">
          <span className="text-sm font-bold text-green-600">
            {formatPrice(room.price_per_night)}/night
          </span>
        </div>
        <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl">
            <p className="text-sm text-gray-700 font-medium line-clamp-2">{room.description}</p>
          </div>
        </div>
      </div>
      
      <CardContent className="p-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{room.name}</h3>
            <p className="text-sm text-gray-600 capitalize font-semibold tracking-wide uppercase">{room.room_type}</p>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <span className="font-bold text-gray-900">{room.max_guests} guests</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {room.amenities.slice(0, 4).map((amenity, index) => {
              const Icon = amenityIcons[amenity] || Coffee
              return (
                <div key={index} className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-green-100 text-green-800 px-4 py-2 rounded-full text-xs font-bold shadow-sm">
                  <Icon className="w-4 h-4" />
                  <span>{amenity}</span>
                </div>
              )
            })}
            {room.amenities.length > 4 && (
              <div className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-xs font-bold shadow-sm">
                <span>+{room.amenities.length - 4} more</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-8 pt-0">
        <Link href={`/rooms/${room.id}`} className="w-full">
          <Button className="w-full h-14 text-base font-bold">
            View Details & Book
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}