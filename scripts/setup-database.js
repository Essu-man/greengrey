const { neon } = require('@neondatabase/serverless')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL)

async function setupDatabase() {
  try {
    console.log('🚀 Setting up database...')

    // Read and execute schema
    const schemaPath = path.join(__dirname, '../src/lib/database/schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')
    
    // Split schema into individual statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0)

    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await sql(statement)
          console.log('✅ Executed:', statement.substring(0, 50) + '...')
        } catch (error) {
          // Ignore errors for existing tables/data
          if (!error.message.includes('already exists') && !error.message.includes('duplicate key')) {
            console.log('⚠️  Warning:', error.message)
          }
        }
      }
    }

    // Create properly hashed sample users
    const hashedPassword = await bcrypt.hash('password123', 12)
    
    const sampleUsers = [
      {
        email: 'admin@greengrey.com',
        password_hash: hashedPassword,
        first_name: 'Kwame',
        last_name: 'Asante',
        phone: '+233 24 123 4567',
        role: 'admin',
        is_verified: true,
        is_active: true
      },
      {
        email: 'staff@greengrey.com',
        password_hash: hashedPassword,
        first_name: 'Akosua',
        last_name: 'Mensah',
        phone: '+233 24 123 4568',
        role: 'staff',
        is_verified: true,
        is_active: true
      },
      {
        email: 'kofi.boateng@example.com',
        password_hash: hashedPassword,
        first_name: 'Kofi',
        last_name: 'Boateng',
        phone: '+233 24 123 4569',
        role: 'guest',
        is_verified: true,
        is_active: true
      },
      {
        email: 'ama.osei@example.com',
        password_hash: hashedPassword,
        first_name: 'Ama',
        last_name: 'Osei',
        phone: '+233 24 123 4570',
        role: 'guest',
        is_verified: true,
        is_active: true
      },
      {
        email: 'kwaku.adjepong@example.com',
        password_hash: hashedPassword,
        first_name: 'Kwaku',
        last_name: 'Adjepong',
        phone: '+233 24 123 4571',
        role: 'guest',
        is_verified: true,
        is_active: true
      }
    ]

    // Insert sample users (with conflict handling)
    for (const user of sampleUsers) {
      try {
        await sql`
          INSERT INTO users (email, password_hash, first_name, last_name, phone, role, is_verified, is_active)
          VALUES (${user.email}, ${user.password_hash}, ${user.first_name}, ${user.last_name}, ${user.phone}, ${user.role}, ${user.is_verified}, ${user.is_active})
          ON CONFLICT (email) DO UPDATE SET
            password_hash = EXCLUDED.password_hash,
            first_name = EXCLUDED.first_name,
            last_name = EXCLUDED.last_name,
            phone = EXCLUDED.phone,
            role = EXCLUDED.role,
            is_verified = EXCLUDED.is_verified,
            is_active = EXCLUDED.is_active,
            updated_at = CURRENT_TIMESTAMP
        `
        console.log(`✅ User created/updated: ${user.email}`)
      } catch (error) {
        console.log(`⚠️  User ${user.email}:`, error.message)
      }
    }

    console.log('\n🎉 Database setup completed!')
    console.log('\n📋 Sample accounts created:')
    console.log('👤 Admin: admin@greengrey.com / password123 (Kwame Asante)')
    console.log('👤 Staff: staff@greengrey.com / password123 (Akosua Mensah)')
    console.log('👤 Guest: kofi.boateng@example.com / password123 (Kofi Boateng)')
    console.log('👤 Guest: ama.osei@example.com / password123 (Ama Osei)')
    console.log('👤 Guest: kwaku.adjepong@example.com / password123 (Kwaku Adjepong)')
    console.log('\n🔗 You can now:')
    console.log('1. Run: npm run dev')
    console.log('2. Visit: http://localhost:3000')
    console.log('3. Sign in with any of the sample accounts')

  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  }
}

setupDatabase()
