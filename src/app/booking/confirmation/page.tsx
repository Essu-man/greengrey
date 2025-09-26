'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Calendar, User, Phone, Mail, MapPin, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { formatPrice, formatDate } from '@/lib/utils'

interface BookingDetails {
  id: string
  reference: string
  roomName: string
  guestName: string
  email: string
  phone: string
  checkIn: string
  checkOut: string
  totalNights: number
  totalAmount: number
  status: string
  paymentStatus: string
  specialRequests?: string
}

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams()
  const [booking, setBooking] = useState<BookingDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const bookingId = searchParams.get('booking_id')
    const reference = searchParams.get('reference')

    if (bookingId || reference) {
      // Mock booking data - replace with actual API call
      const mockBooking: BookingDetails = {
        id: bookingId || '12345',
        reference: reference || 'GB_ABC123',
        roomName: 'Deluxe Room',
        guestName: 'John Doe',
        email: 'john@example.com',
        phone: '+234 123 456 7890',
        checkIn: '2024-02-15',
        checkOut: '2024-02-17',
        totalNights: 2,
        totalAmount: 50000,
        status: 'confirmed',
        paymentStatus: 'paid',
        specialRequests: 'Late check-in requested'
      }

      setBooking(mockBooking)
      setLoading(false)
    } else {
      setError('No booking information found')
      setLoading(false)
    }
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading booking details...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h1>
            <p className="text-gray-600 mb-4">{error || 'The booking you\'re looking for doesn\'t exist.'}</p>
            <Button onClick={() => window.location.href = '/'}>
              Go Home
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Your reservation has been successfully created
          </p>
          <p className="text-sm text-gray-500">
            Booking Reference: <span className="font-mono font-semibold">{booking.reference}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guest Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Guest Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-lg">{booking.guestName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-lg">{booking.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-lg">{booking.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>Booking Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Room</label>
                    <p className="text-lg">{booking.roomName}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Check-in</label>
                      <p className="text-lg">{formatDate(booking.checkIn)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Check-out</label>
                      <p className="text-lg">{formatDate(booking.checkOut)}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Duration</label>
                    <p className="text-lg">{booking.totalNights} night{booking.totalNights > 1 ? 's' : ''}</p>
                  </div>
                  {booking.specialRequests && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Special Requests</label>
                      <p className="text-lg">{booking.specialRequests}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Payment Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Total Amount</span>
                    <span className="text-2xl font-bold text-green-600">
                      {formatPrice(booking.totalAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Payment Status</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.paymentStatus === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Booking Status</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span className="text-sm">+234 123 456 7890</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-green-600" />
                    <span className="text-sm">info@greengrey.com</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-green-600 mt-1" />
                    <span className="text-sm">
                      123 Luxury Street<br />
                      Victoria Island, Lagos
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Download Receipt
                  </Button>
                  <Button variant="outline" className="w-full">
                    Modify Booking
                  </Button>
                  <Button variant="outline" className="w-full">
                    Cancel Booking
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Important Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>• Check-in time: 2:00 PM</p>
                  <p>• Check-out time: 11:00 AM</p>
                  <p>• Free cancellation up to 24 hours before check-in</p>
                  <p>• A valid ID is required at check-in</p>
                  <p>• Contact us for any special arrangements</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
              Book Another Room
            </Button>
            <Button size="lg" variant="outline">
              View All Bookings
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
