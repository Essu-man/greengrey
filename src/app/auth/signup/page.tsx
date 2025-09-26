import Link from 'next/link'
import SignupForm from '@/components/auth/SignupForm'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">GreenGrey</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-2">Join GreenGrey Guest House today</p>
          </div>
          
          <SignupForm />
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
