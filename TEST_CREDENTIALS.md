# 🔑 GovAI Test Credentials

## Test User Accounts

Use these credentials to test the GovAI platform without creating new accounts.

### User 1: Alex Johnson (Complete Profile)
- **Email:** `alex@govai.com`
- **Password:** `password123`
- **Department:** Digital Innovation
- **Status:** Verified ✅ | Profile Complete ✅
- **Use Case:** Test full user experience with completed onboarding

### User 2: Priya Sharma (Incomplete Profile)
- **Email:** `priya@govai.com`
- **Password:** `password123`
- **Department:** Urban Development
- **Status:** Verified ✅ | Profile Incomplete ⚠️
- **Use Case:** Test onboarding flow for new users

### User 3: Admin User
- **Email:** `admin@govai.com`
- **Password:** `password123`
- **Role:** Administrator
- **Department:** Administration
- **Status:** Verified ✅ | Profile Complete ✅
- **Use Case:** Test admin features (when implemented)

## Quick Test Flow

### 1. Test Login
```
1. Go to http://localhost:5173 (or 5174)
2. Click "Sign In" in navbar
3. Use: alex@govai.com / password123
4. You'll be redirected to /onboarding or /dashboard
```

### 2. Test Public Pages (No Login Required)
- **Home:** `http://localhost:5173/`
- **Schemes:** `http://localhost:5173/schemes`
- **Jobs:** `http://localhost:5173/jobs`
- **News:** `http://localhost:5173/news`

### 3. Test Protected Features
- Try to apply for a scheme → Redirected to login if not authenticated
- Access dashboard → `http://localhost:5173/dashboard`
- View profile → `http://localhost:5173/profile`

### 4. Test OAuth Login (Mock)
- Click on DigiLocker, Aadhaar, or Google button
- Mock OAuth creates a new user automatically
- Redirects to onboarding

## API Testing with cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alex@govai.com",
    "password": "password123"
  }'
```

Response will include a JWT token:
```json
{
  "success": true,
  "data": {
    "user": {...},
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Get User Profile (Protected)
```bash
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Get Schemes
```bash
curl http://localhost:5000/api/schemes
```

### Get Scheme Recommendations (Protected)
```bash
curl http://localhost:5000/api/schemes/recommendations/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Submit Application (Protected)
```bash
curl -X POST http://localhost:5000/api/applications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "scheme_id": 1,
    "application_data": {
      "business_name": "Tech Innovations Pvt Ltd",
      "business_type": "Tech Startup"
    }
  }'
```

## Seeded Data

### Schemes (5 total)
1. Tech Startup Grant 2026 - ₹50 lakhs
2. Housing Sustainability Credit - 4% subsidy
3. Skill Development Program - Free + ₹3000/month
4. Women Entrepreneur Scheme - ₹25 lakhs at 3%
5. Digital Infrastructure Grant - Up to ₹1 crore

### Jobs (4 total)
1. Senior UI/UX Designer - Dept of Digital Innovation - ₹12-18 LPA
2. Data Analyst - Ministry of Statistics - ₹8-12 LPA
3. Software Engineer - NIC - ₹10-15 LPA
4. Cybersecurity Analyst - CERT-In - ₹15-22 LPA

## Reset Database

If you need to reset and re-seed the database:

```bash
# From server directory
psql -U postgres -d govai -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
npm run init-db
```

## DigiLocker Integration

For testing DigiLocker login:
1. Click "DigiLocker" button on login page
2. Mock OAuth will create a user automatically
3. No real DigiLocker integration (mock for demo)

## Notes

- All passwords are `password123` for testing
- JWT tokens expire after 7 days
- Database must be initialized with `npm run init-db` first
- For production, change all passwords and JWT_SECRET

## Support

If you encounter issues:
1. Check PostgreSQL is running
2. Verify `.env` file in server directory
3. Ensure both frontend and backend servers are running
4. Check browser console for errors

Happy Testing! 🚀
