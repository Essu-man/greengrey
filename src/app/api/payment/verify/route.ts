import { NextRequest, NextResponse } from 'next/server'
import { verifyPayment } from '@/lib/paystack'
import { updatePaymentStatus, updateBookingStatus } from '@/lib/database/queries'

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json()

    if (!reference) {
      return NextResponse.json(
        { error: 'Payment reference is required' },
        { status: 400 }
      )
    }

    // Verify payment with Paystack
    const isPaymentSuccessful = await verifyPayment(reference)

    if (isPaymentSuccessful) {
      // Update payment status in database
      await updatePaymentStatus(reference, 'success')

      // Get payment details to update booking
      const payment = await getPaymentByReference(reference)
      if (payment) {
        await updateBookingStatus(payment.booking_id, 'confirmed')
        await updateBookingStatus(payment.booking_id, 'paid')
      }

      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully'
      })
    } else {
      // Update payment status as failed
      await updatePaymentStatus(reference, 'failed')

      return NextResponse.json({
        success: false,
        message: 'Payment verification failed'
      })
    }
  } catch (error) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
