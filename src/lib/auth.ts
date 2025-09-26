import bcrypt from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
const JWT_EXPIRES_IN = '7d'

export interface User {
  id: number
  email: string
  firstName: string
  lastName: string
  role: string
  isVerified: boolean
  isActive: boolean
}

export interface SessionUser {
  id: number
  email: string
  firstName: string
  lastName: string
  role: string
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

// Create JWT token
export async function createToken(payload: SessionUser): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET)
  
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(secret)
}

// Verify JWT token
export async function verifyToken(token: string): Promise<SessionUser | null> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    
    return payload as SessionUser
  } catch (error) {
    return null
  }
}

// Get session from cookies
export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value
    
    if (!token) return null
    
    return await verifyToken(token)
  } catch (error) {
    return null
  }
}

// Set session cookie
export async function setSession(user: SessionUser): Promise<void> {
  const token = await createToken(user)
  const cookieStore = await cookies()
  
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/'
  })
}

// Clear session
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
}

// Generate secure random token
export function generateSecureToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}
