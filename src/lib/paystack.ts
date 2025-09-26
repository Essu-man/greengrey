// Paystack configuration and utilities
export const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_your_public_key_here'
export const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || 'sk_test_your_secret_key_here'

export interface PaymentData {
  email: string
  amount: number
  reference: string
  callback_url?: string
  metadata?: {
    booking_id?: string
    room_id?: string
    guest_name?: string
  }
}

export interface PaymentResponse {
  status: boolean
  message: string
  data?: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

// Initialize Paystack inline
export const initializePayment = (paymentData: PaymentData): Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Paystack can only be initialized in the browser'))
      return
    }

    // Load Paystack script if not already loaded
    if (!window.PaystackPop) {
      const script = document.createElement('script')
      script.src = 'https://js.paystack.co/v1/inline.js'
      script.onload = () => {
        handlePayment(paymentData, resolve, reject)
      }
      script.onerror = () => {
        reject(new Error('Failed to load Paystack script'))
      }
      document.head.appendChild(script)
    } else {
      handlePayment(paymentData, resolve, reject)
    }
  })
}

const handlePayment = (
  paymentData: PaymentData,
  resolve: (value: PaymentResponse) => void,
  reject: (reason: any) => void
) => {
  const handler = window.PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: paymentData.email,
    amount: paymentData.amount * 100, // Convert to pesewas
    currency: 'GHS',
    ref: paymentData.reference,
    callback: (response: any) => {
      resolve({
        status: true,
        message: 'Payment successful',
        data: {
          authorization_url: response.authorization_url,
          access_code: response.access_code,
          reference: response.reference
        }
      })
    },
    onClose: () => {
      reject(new Error('Payment cancelled by user'))
    }
  })

  handler.openIframe()
}

// Verify payment on server side
export const verifyPayment = async (reference: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    return data.status && data.data.status === 'success'
  } catch (error) {
    console.error('Payment verification failed:', error)
    return false
  }
}

// Generate unique reference
export const generatePaymentReference = (): string => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `GB_${timestamp}_${random}`.toUpperCase()
}

// Declare global PaystackPop interface
declare global {
  interface Window {
    PaystackPop: {
      setup: (options: any) => {
        openIframe: () => void
      }
    }
  }
}
