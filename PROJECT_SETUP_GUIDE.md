# GovAI Platform - Complete Setup Guide

## 📁 Project Structure

```
GovAI/
├── Frontend/                # React + Vite Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── login.jsx           ✅ Split-screen sign-in with OAuth
│   │   │   ├── Onboarding.jsx      ✅ Multi-step AI profile setup
│   │   │   ├── Dashboard.jsx       ✅ Main dashboard with stats
│   │   │   ├── Home.jsx            ✅ Command center view
│   │   │   └── ...other pages
│   │   ├── layouts/
│   │   │   └── DashboardLayout.jsx ✅ Sidebar layout
│   │   ├── components/
│   │   ├── Context/
│   │   └── App.jsx                 ✅ Updated routing
│   └── package.json
│
└── server/                  # Node.js + Express + PostgreSQL Backend
    ├── config/
    │   ├── database.js            ✅ PostgreSQL connection
    │   └── initDb.js              ✅ Schema & seed data
    ├── middleware/
    │   └── auth.js                ✅ JWT authentication
    ├── routes/
    │   ├── auth.js                ✅ Register/Login/OAuth
    │   ├── users.js               ✅ Profile & notifications
    │   ├── schemes.js             ✅ Government schemes
    │   └── applications.js        ✅ Application tracking
    ├── scripts/
    │   └── initDatabase.js        ✅ DB initialization script
    ├── server.js                   ✅ Main server file
    ├── .env.example                ✅ Environment template
    ├── package.json                ✅ Dependencies configured
    └── README.md                   ✅ Full documentation
```

## 🎨 Frontend Pages Implemented

### 1. **Login (login.jsx)** ✅
- Split-screen design (dark left, white right)
- Email/password authentication
- OAuth integration (DigiLocker, Aadhaar, Google)
- "Remember this device" option
- Security badges at bottom

### 2. **Onboarding (Onboarding.jsx)** ✅
- 4-step progress indicator
- AI Skill Profiling with resume upload
- Real-time analysis status (metadata extraction, skill mapping, scheme matching)
- DigiLocker integration option
- AI insights panel
- Security certifications footer

### 3. **Dashboard (Dashboard.jsx)** ✅
- Job matching cards with match percentage
- Qualifying schemes notifications
- Policy updates
- Active applications table with status
- Upcoming deadlines calendar
- AI search progress widget

### 4. **Home (Home.jsx)** ✅
- Command center view
- Statistics dashboard
- Rapid actions grid
- Operational timeline

## 🔧 Backend API Implemented

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - Email/password login
- `POST /api/auth/oauth/:provider` - OAuth login (DigiLocker, Aadhaar, Google)

### User Endpoints (Protected)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/notifications` - Get notifications
- `PUT /api/users/notifications/:id/read` - Mark as read

### Schemes Endpoints
- `GET /api/schemes` - Get all schemes (with filters)
- `GET /api/schemes/:id` - Get single scheme
- `GET /api/schemes/recommendations/me` - AI recommendations (Protected)

### Applications Endpoints (Protected)
- `GET /api/applications` - Get user's applications
- `GET /api/applications/:id` - Get application details
- `POST /api/applications` - Submit new application
- `PUT /api/applications/:id/status` - Update status

## 🗄️ Database Schema

### Tables Created
1. **users** - User accounts with authentication
2. **user_profiles** - Skills, education, experience, resume
3. **schemes** - Government schemes with eligibility
4. **applications** - User applications with timeline tracking
5. **jobs** - Job listings
6. **job_applications** - Job applications with match scores
7. **notifications** - User notifications

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- PostgreSQL v12+
- npm or yarn

### Step 1: Setup PostgreSQL

```sql
-- Open PostgreSQL terminal and create database
CREATE DATABASE govai;
```

### Step 2: Configure Backend

```bash
cd server

# Install dependencies (already done)
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your PostgreSQL credentials
# Update DATABASE_URL, JWT_SECRET
```

Example `.env`:
```env
PORT=5000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/govai
JWT_SECRET=your_very_secure_secret_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Step 3: Initialize Database

```bash
# Run database initialization (creates tables + seeds data)
npm run init-db
```

### Step 4: Start Backend Server

```bash
# Development mode with hot-reload
npm run dev

# Server will run on http://localhost:5000
```

### Step 5: Start Frontend

```bash
cd ../Frontend

# Server is already running on port 5174
# If not, run:
npm run dev
```

## 🧪 Testing the Application

### 1. Test Login Flow
1. Go to `http://localhost:5174/` (or 5173)
2. Enter any email and password (e.g., `test@example.com` / `password123`)
3. Click "Sign In to govAI"
4. OR use OAuth buttons (currently mock login)

### 2. Test Onboarding
- After login, you'll be redirected to `/onboarding`
- Upload a resume (simulated)
- Watch the AI analysis progress
- Click "Continue to Analysis"

### 3. Test Dashboard
- Navigate to `/dashboard`
- See job matches, schemes, applications
- View AI search progress

### 4. Test API Endpoints

Using cURL or Postman:

```bash
# Register new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alex@govai.com",
    "password": "secure123",
    "full_name": "Alex Johnson",
    "mobile": "9876543210",
    "department": "Digital Innovation"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alex@govai.com",
    "password": "secure123"
  }'

# Get schemes (copy token from login response)
curl http://localhost:5000/api/schemes \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get recommendations (protected)
curl http://localhost:5000/api/schemes/recommendations/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📊 Seeded Data

After running `npm run init-db`, the following sample data is available:

### Schemes
1. **Tech Startup Grant 2026** - ₹50 lakhs funding for tech startups
2. **Housing Sustainability Credit** - 4% interest subsidy on home loans
3. **Skill Development Program** - Free certification + ₹3000/month stipend

### Jobs
1. **Senior UI/UX Designer** - Dept of Digital Innovation (₹12-18 LPA)
2. **Data Analyst** - Ministry of Statistics (₹8-12 LPA)

## 🎯 Next Steps

### Immediate Tasks
1. ✅ Create `.env` file in server directory
2. ✅ Update PostgreSQL credentials
3. ✅ Run `npm run init-db`
4. ✅ Start both frontend and backend servers
5. ✅ Test login and onboarding flow

### Future Enhancements
- [ ] Real file upload for resumes
- [ ] Real AI/ML integration for scheme matching
- [ ] Actual OAuth provider integration
- [ ] Admin dashboard for managing schemes
-[ ] WebSocket for real-time notifications
- [ ] Email notifications
- [ ] Advanced search and filters
- [ ] Multi-language support

## 🐛 Troubleshooting

### PostgreSQL Connection Error
- Ensure PostgreSQL is running
- Check DATABASE_URL in `.env`
- Verify database `govai` exists

### Frontend Build Errors
- Clear `node_modules` and reinstall
- Check for port conflicts (5173/5174)

### JWT Token Issues
- Ensure JWT_SECRET is set in `.env`
- Token expires after 7 days

## 📝 Notes

- Frontend runs on port **5173** or **5174** (Vite auto-selects)
- Backend runs on port **5000**
- All API routes are prefixed with `/api`
- Authentication uses JWT with 7-day expiration
- OAuth endpoints are mock implementations for demo

## 🎉 You're All Set!

Your GovAI platform is now fully configured with:
✅ Modern React frontend with premium UI
✅ Node.js + Express backend with PostgreSQL
✅ JWT authentication
✅ Government schemes and applications system
✅ AI-powered recommendations (basic implementation)

Happy coding! 🚀
