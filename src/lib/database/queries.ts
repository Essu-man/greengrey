import { sql } from './config';

// Room queries
export async function getAllRooms() {
  return await sql`
    SELECT * FROM rooms 
    WHERE is_available = true 
    ORDER BY price_per_night ASC
  `;
}

export async function getRoomById(id: number) {
  const result = await sql`
    SELECT * FROM rooms 
    WHERE id = ${id} AND is_available = true
  `;
  return result[0];
}

export async function getAvailableRooms(checkIn: string, checkOut: string) {
  return await sql`
    SELECT r.* FROM rooms r
    WHERE r.is_available = true
    AND r.id NOT IN (
      SELECT DISTINCT room_id FROM bookings 
      WHERE status IN ('confirmed', 'pending')
      AND (
        (check_in_date <= ${checkIn} AND check_out_date > ${checkIn}) OR
        (check_in_date < ${checkOut} AND check_out_date >= ${checkOut}) OR
        (check_in_date >= ${checkIn} AND check_out_date <= ${checkOut})
      )
    )
    ORDER BY r.price_per_night ASC
  `;
}

// User queries
export async function createUser(userData: {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: string;
}) {
  const result = await sql`
    INSERT INTO users (email, password_hash, first_name, last_name, phone, role)
    VALUES (${userData.email}, ${userData.passwordHash}, ${userData.firstName}, ${userData.lastName}, ${userData.phone || null}, ${userData.role || 'guest'})
    RETURNING id, email, first_name, last_name, phone, role, is_verified, is_active, created_at
  `;
  return result[0];
}

export async function getUserByEmail(email: string) {
  const result = await sql`
    SELECT id, email, password_hash, first_name, last_name, phone, role, is_verified, is_active, last_login, created_at
    FROM users WHERE email = ${email}
  `;
  return result[0];
}

export async function getUserById(id: number) {
  const result = await sql`
    SELECT id, email, first_name, last_name, phone, role, is_verified, is_active, last_login, created_at
    FROM users WHERE id = ${id}
  `;
  return result[0];
}

export async function updateUserLastLogin(id: number) {
  const result = await sql`
    UPDATE users 
    SET last_login = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING id, email, first_name, last_name, phone, role, is_verified, is_active
  `;
  return result[0];
}

export async function updateUserPassword(id: number, passwordHash: string) {
  const result = await sql`
    UPDATE users 
    SET password_hash = ${passwordHash}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING id, email, first_name, last_name, phone, role, is_verified, is_active
  `;
  return result[0];
}

// Session management
export async function createSession(userId: number, sessionToken: string, expiresAt: Date) {
  const result = await sql`
    INSERT INTO user_sessions (user_id, session_token, expires_at)
    VALUES (${userId}, ${sessionToken}, ${expiresAt})
    RETURNING *
  `;
  return result[0];
}

export async function getSessionByToken(sessionToken: string) {
  const result = await sql`
    SELECT s.*, u.id, u.email, u.first_name, u.last_name, u.role, u.is_verified, u.is_active
    FROM user_sessions s
    JOIN users u ON s.user_id = u.id
    WHERE s.session_token = ${sessionToken} AND s.expires_at > CURRENT_TIMESTAMP
  `;
  return result[0];
}

export async function deleteSession(sessionToken: string) {
  const result = await sql`
    DELETE FROM user_sessions 
    WHERE session_token = ${sessionToken}
    RETURNING *
  `;
  return result[0];
}

export async function deleteUserSessions(userId: number) {
  const result = await sql`
    DELETE FROM user_sessions 
    WHERE user_id = ${userId}
    RETURNING *
  `;
  return result;
}

// Booking queries
export async function createBooking(bookingData: {
  userId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  totalNights: number;
  totalAmount: number;
  specialRequests?: string;
}) {
  const result = await sql`
    INSERT INTO bookings (
      user_id, room_id, check_in_date, check_out_date, 
      total_nights, total_amount, special_requests
    )
    VALUES (
      ${bookingData.userId}, ${bookingData.roomId}, 
      ${bookingData.checkInDate}, ${bookingData.checkOutDate},
      ${bookingData.totalNights}, ${bookingData.totalAmount},
      ${bookingData.specialRequests || null}
    )
    RETURNING *
  `;
  return result[0];
}

export async function getBookingById(id: number) {
  const result = await sql`
    SELECT b.*, r.name as room_name, r.price_per_night, u.first_name, u.last_name, u.email
    FROM bookings b
    JOIN rooms r ON b.room_id = r.id
    JOIN users u ON b.user_id = u.id
    WHERE b.id = ${id}
  `;
  return result[0];
}

export async function updateBookingStatus(id: number, status: string) {
  const result = await sql`
    UPDATE bookings 
    SET status = ${status}, updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
    RETURNING *
  `;
  return result[0];
}

// Payment queries
export async function createPayment(paymentData: {
  bookingId: number;
  paystackReference: string;
  amount: number;
  currency?: string;
}) {
  const result = await sql`
    INSERT INTO payments (booking_id, paystack_reference, amount, currency)
    VALUES (${paymentData.bookingId}, ${paymentData.paystackReference}, ${paymentData.amount}, ${paymentData.currency || 'GHS'})
    RETURNING *
  `;
  return result[0];
}

export async function updatePaymentStatus(paystackReference: string, status: string, gatewayResponse?: any) {
  const result = await sql`
    UPDATE payments 
    SET status = ${status}, gateway_response = ${gatewayResponse || null}, updated_at = CURRENT_TIMESTAMP
    WHERE paystack_reference = ${paystackReference}
    RETURNING *
  `;
  return result[0];
}

export async function getPaymentByReference(paystackReference: string) {
  const result = await sql`
    SELECT p.*, b.id as booking_id, b.user_id, b.room_id, b.total_amount
    FROM payments p
    JOIN bookings b ON p.booking_id = b.id
    WHERE p.paystack_reference = ${paystackReference}
  `;
  return result[0];
}
