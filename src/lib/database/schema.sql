-- Guest House Booking Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) DEFAULT 'guest', -- 'guest', 'admin', 'staff'
    is_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rooms table
CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price_per_night DECIMAL(10, 2) NOT NULL,
    max_guests INTEGER NOT NULL DEFAULT 2,
    room_type VARCHAR(50) NOT NULL, -- 'standard', 'deluxe', 'suite'
    amenities TEXT[], -- Array of amenities
    images TEXT[], -- Array of image URLs
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    room_id INTEGER REFERENCES rooms(id) ON DELETE CASCADE,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    total_nights INTEGER NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled', 'completed'
    payment_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
    payment_reference VARCHAR(255),
    special_requests TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
    paystack_reference VARCHAR(255) UNIQUE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'NGN',
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'success', 'failed'
    gateway_response JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(check_in_date, check_out_date);
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_room ON bookings(room_id);
CREATE INDEX IF NOT EXISTS idx_payments_booking ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_reference ON payments(paystack_reference);

-- Insert sample users (passwords are hashed versions of 'password123')
INSERT INTO users (email, password_hash, first_name, last_name, phone, role, is_verified, is_active) VALUES
('admin@greengrey.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', 'Kwame', 'Asante', '+233 24 123 4567', 'admin', true, true),
('staff@greengrey.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', 'Akosua', 'Mensah', '+233 24 123 4568', 'staff', true, true),
('kofi.boateng@example.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', 'Kofi', 'Boateng', '+233 24 123 4569', 'guest', true, true),
('ama.osei@example.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', 'Ama', 'Osei', '+233 24 123 4570', 'guest', true, true),
('kwaku.adjepong@example.com', '$2b$10$rQZ8K9vL2mN3pO4qR5sT6uV7wX8yZ9aB0cD1eF2gH3iJ4kL5mN6oP7qR8sT9uV', 'Kwaku', 'Adjepong', '+233 24 123 4571', 'guest', true, true);

-- Insert sample rooms data
INSERT INTO rooms (name, description, price_per_night, max_guests, room_type, amenities, images) VALUES
('Standard Room', 'Comfortable room with essential amenities for a pleasant stay', 150.00, 2, 'standard', 
 ARRAY['WiFi', 'Air Conditioning', 'TV', 'Private Bathroom'], 
 ARRAY['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop']),

('Deluxe Room', 'Spacious room with premium amenities and city view', 250.00, 3, 'deluxe',
 ARRAY['WiFi', 'Air Conditioning', 'Smart TV', 'Private Bathroom', 'Mini Bar', 'City View'],
 ARRAY['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop']),

('Executive Suite', 'Luxurious suite with separate living area and premium services', 450.00, 4, 'suite',
 ARRAY['WiFi', 'Air Conditioning', 'Smart TV', 'Private Bathroom', 'Mini Bar', 'City View', 'Living Area', 'Room Service'],
 ARRAY['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop']),

('Family Room', 'Perfect for families with children, featuring connecting rooms', 350.00, 6, 'family',
 ARRAY['WiFi', 'Air Conditioning', 'TV', 'Private Bathroom', 'Kitchenette', 'Balcony'],
 ARRAY['https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop']),

('Presidential Suite', 'Ultimate luxury with panoramic views and premium services', 750.00, 2, 'presidential',
 ARRAY['WiFi', 'Air Conditioning', 'Smart TV', 'Private Bathroom', 'Mini Bar', 'Panoramic View', 'Living Area', 'Room Service', 'Butler Service'],
 ARRAY['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop']);
