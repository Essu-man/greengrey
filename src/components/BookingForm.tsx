'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calendar, User, Mail, Phone, MessageSquare } from 'lucide-react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { formatPrice, calculateNights } from '@/lib/utils'

const bookingSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  specialRequests: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

interface Room {
  id: number
  name: string
  price_per_night: number
  max_guests: number
}

interface BookingFormProps {
  room: Room
  onBookingSubmit: (data: BookingFormData) => void
  isLoading?: boolean
}

export default function BookingForm({ room, onBookingSubmit, isLoading = false }: BookingFormProps) {
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  })

  const watchedCheckIn = watch('checkIn')
  const watchedCheckOut = watch('checkOut')

  const totalNights = watchedCheckIn && watchedCheckOut 
    ? calculateNights(watchedCheckIn, watchedCheckOut) 
    : 0

  const totalAmount = totalNights * room.price_per_night

  const onSubmit = async (data: BookingFormData) => {
    try {
      // Create booking
      const bookingResponse = await fetch('/api/booking/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          roomId: room.id,
          totalAmount: totalAmount,
        }),
      })

      const bookingResult = await bookingResponse.json()

      if (bookingResult.success) {
        // Initialize Paystack payment
        const { initializePayment } = await import('@/lib/paystack')
        
        await initializePayment({
          email: data.email,
          amount: totalAmount,
          reference: bookingResult.booking.reference,
          metadata: {
            booking_id: bookingResult.booking.id,
            room_id: room.id.toString(),
            guest_name: `${data.firstName} ${data.lastName}`
          }
        })

        // Handle successful payment
        onBookingSubmit(data)
      } else {
        throw new Error(bookingResult.error || 'Failed to create booking')
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('Booking failed. Please try again.')
    }
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Book Your Stay</CardTitle>
        <p className="text-center text-gray-600">
          Complete your reservation for {room.name}
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Guest Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Guest Information</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <Input
                  {...register('firstName')}
                  placeholder="Enter your first name"
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <Input
                  {...register('lastName')}
                  placeholder="Enter your last name"
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="Enter your email"
                  className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  {...register('phone')}
                  type="tel"
                  placeholder="Enter your phone number"
                  className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Check-in & Check-out</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-in Date *
                </label>
                <Input
                  {...register('checkIn')}
                  type="date"
                  min={today}
                  className={errors.checkIn ? 'border-red-500' : ''}
                />
                {errors.checkIn && (
                  <p className="text-red-500 text-sm mt-1">{errors.checkIn.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-out Date *
                </label>
                <Input
                  {...register('checkOut')}
                  type="date"
                  min={watchedCheckIn || today}
                  className={errors.checkOut ? 'border-red-500' : ''}
                />
                {errors.checkOut && (
                  <p className="text-red-500 text-sm mt-1">{errors.checkOut.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <MessageSquare className="w-5 h-5" />
              <span>Special Requests (Optional)</span>
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Any special requests or notes?
              </label>
              <textarea
                {...register('specialRequests')}
                rows={3}
                placeholder="Let us know if you have any special requests..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Booking Summary */}
          {totalNights > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <h3 className="font-semibold">Booking Summary</h3>
              <div className="flex justify-between">
                <span>Room: {room.name}</span>
                <span>{formatPrice(room.price_per_night)}/night</span>
              </div>
              <div className="flex justify-between">
                <span>Duration: {totalNights} night{totalNights > 1 ? 's' : ''}</span>
                <span>{totalNights} × {formatPrice(room.price_per_night)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                <span>Total Amount:</span>
                <span className="text-green-600">{formatPrice(totalAmount)}</span>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
            disabled={isLoading || totalNights === 0}
          >
            {isLoading ? 'Processing...' : `Proceed to Payment - ${formatPrice(totalAmount)}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}