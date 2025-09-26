# Database Setup Guide

This guide will help you set up the Neon database for the GreenGrey Guest House booking website.

## Step 1: Create a Neon Database

1. Go to [Neon Console](https://console.neon.tech/)
2. Sign up or log in to your account
3. Create a new project
4. Copy the connection string (it will look like: `postgresql://username:password@hostname:port/database_name`)

## Step 2: Update Environment Variables

1. Copy your connection string to `.env.local`:
   ```env
   DATABASE_URL=postgresql://your-connection-string-here
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

## Step 3: Run Database Setup

Run the following command to set up the database schema and sample data:

```bash
npm run setup-db
```

This will:
- Create all necessary tables
- Insert sample rooms
- Create sample user accounts
- Set up proper indexes

## Step 4: Verify Setup

After running the setup, you should have:

### Sample Users Created:
- **Admin**: admin@greengrey.com / password123 (Kwame Asante)
- **Staff**: staff@greengrey.com / password123 (Akosua Mensah)
- **Guest**: kofi.boateng@example.com / password123 (Kofi Boateng)
- **Guest**: ama.osei@example.com / password123 (Ama Osei)
- **Guest**: kwaku.adjepong@example.com / password123 (Kwaku Adjepong)

### Sample Rooms Created:
- Standard Room (GHS 150/night)
- Deluxe Room (GHS 250/night)
- Executive Suite (GHS 450/night)
- Family Room (GHS 350/night)
- Presidential Suite (GHS 750/night)

## Troubleshooting

### If the setup script fails:

1. **Check your DATABASE_URL**: Make sure it's correctly set in `.env.local`
2. **Check your connection**: Test the connection string in Neon Console
3. **Manual setup**: You can manually run the SQL from `lib/database/schema.sql` in the Neon SQL editor

### Manual Database Setup:

If the script doesn't work, you can manually set up the database:

1. Go to your Neon Console
2. Open the SQL Editor
3. Copy and paste the contents of `lib/database/schema.sql`
4. Execute the SQL

## Next Steps

Once the database is set up:

1. Start the development server: `npm run dev`
2. Visit: http://localhost:3000
3. Try signing in with any of the sample accounts
4. Test the booking functionality

## Database Schema

The database includes these main tables:

- **users**: User accounts with authentication
- **rooms**: Room information and pricing
- **bookings**: Reservation records
- **payments**: Payment transactions
- **user_sessions**: Session management

All tables include proper indexes for optimal performance.
