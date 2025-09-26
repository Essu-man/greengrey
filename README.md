# GreenGrey Guest House Booking Website

A modern, responsive guest house booking website built with Next.js, featuring Paystack payment integration and Neon database.

## Features

- 🏨 **Room Management**: Browse and filter available rooms
- 📅 **Booking System**: Easy date selection and room booking
- 💳 **Payment Integration**: Secure payments with Paystack (Ghanaian Cedis)
- 📱 **Responsive Design**: Mobile-first, modern UI
- 🔐 **Database Integration**: Neon PostgreSQL database
- ✨ **Modern UI**: Clean, professional design with Tailwind CSS
- 🇬🇭 **Ghanaian Localization**: Ghanaian Cedis currency and names

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Neon PostgreSQL
- **Payments**: Paystack
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Neon database account
- Paystack account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd greengrey
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your actual values:
   ```env
   DATABASE_URL=postgresql://username:password@hostname:port/database_name
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_public_key_here
   PAYSTACK_SECRET_KEY=sk_test_your_secret_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up the database**
   - Create a Neon database
   - Copy your database connection string
   - Update the `DATABASE_URL` in your `.env.local`
   - Run the database setup: `npm run setup-db`

5. **Configure Paystack**
   - Get your Paystack API keys from the dashboard
   - Update the Paystack keys in your `.env.local`

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Sample Accounts

After running the database setup, you can use these sample accounts:

| Role | Email | Password | Name | Description |
|------|-------|----------|------|-------------|
| Admin | admin@greengrey.com | password123 | Kwame Asante | Full access to all features |
| Staff | staff@greengrey.com | password123 | Akosua Mensah | Staff management access |
| Guest | kofi.boateng@example.com | password123 | Kofi Boateng | Regular guest account |
| Guest | ama.osei@example.com | password123 | Ama Osei | Regular guest account |
| Guest | kwaku.adjepong@example.com | password123 | Kwaku Adjepong | Regular guest account |

## Database Schema

The application uses the following main tables:
- `users` - Guest information
- `rooms` - Room details and pricing
- `bookings` - Reservation records
- `payments` - Payment transactions

## API Endpoints

- `POST /api/booking/create` - Create a new booking
- `POST /api/payment/verify` - Verify payment status

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── booking/           # Booking pages
│   ├── rooms/             # Room pages
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Site footer
│   ├── RoomCard.tsx      # Room display card
│   └── BookingForm.tsx   # Booking form
└── lib/                  # Utility functions
    ├── database/         # Database configuration
    ├── paystack.ts      # Payment integration
    └── utils.ts         # Helper functions
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | Neon database connection string | Yes |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Paystack public key | Yes |
| `PAYSTACK_SECRET_KEY` | Paystack secret key | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email info@greengrey.com or create an issue in the repository.
