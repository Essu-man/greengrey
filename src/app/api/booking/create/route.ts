import { NextRequest, NextResponse } from 'next/server'
import { createUser, getUserByEmail, createBooking, createPayment } from '@/lib/database/queries'
import { generatePaymentReference } from '@/lib/paystack'

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      checkIn,
      checkOut,
      roomId,
      totalAmount,
      specialRequests
    } = bookingData

    // Check if user exists, create if not
    let user = await getUserByEmail(email)
    if (!user) {
      user = await createUser({
        email,
        firstName,
        lastName,
        phone
      })
    }

    // Calculate total nights
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const totalNights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))

    // Create booking
    const booking = await createBooking({
      userId: user.id,
      roomId: parseInt(roomId),
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalNights,
      totalAmount: parseFloat(totalAmount),
      specialRequests
    })

    // Generate payment reference
    const paymentReference = generatePaymentReference()

    // Create payment record
    const payment = await createPayment({
      bookingId: booking.id,
      paystackReference: paymentReference,
      amount: parseFloat(totalAmount),
      currency: 'NGN'
    })

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        reference: paymentReference,
        amount: totalAmount,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Booking creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}
