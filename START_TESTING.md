# 🚀 Start Magic House for Testing

## Quick Start (2 Terminals)

### Terminal 1: Backend
```powershell
cd C:\Users\LENOVOO\magichouse\backend
npm run start:dev
```

Wait for: **"Application is running on: http://localhost:3000/api/v1"**

### Terminal 2: Frontend  
```powershell
cd C:\Users\LENOVOO\magichouse\web
npm run dev
```

Wait for: **"Local: http://localhost:5173"**

## 🧪 Testing the Application

1. **Open Browser**: http://localhost:5173

2. **Register New Account**:
   - Click "Register here"
   - Fill in all required fields:
     - Email: test@example.com
     - Password: password123 (min 8 chars)
     - First Name: John
     - Last Name: Doe
     - Job Title: Developer (optional)
     - Department: Engineering (optional)
   - Click "Register"

3. **You'll be Auto-logged in** and redirected to Dashboard

4. **Dashboard Shows**:
   - Your profile information
   - User status (ONLINE after login)
   - Role (EMPLOYEE by default)
   - Success message confirming all auth features work

5. **Test Logout**:
   - Click "Logout" button
   - Redirected to login page

6. **Test Login**:
   - Use the same credentials
   - Click "Login"
   - Back to Dashboard!

## 🔍 What's Being Tested

✅ **Backend (NestJS + SQLite)**
- User Registration with password hashing (bcrypt)
- JWT token generation and validation
- Login authentication
- Protected routes (Dashboard requires auth)
- User profile retrieval
- Logout with status update
- Database persistence (SQLite)

✅ **Frontend (React + Vite)**
- Registration form with validation
- Login form
- JWT token storage (localStorage)
- Protected routes (redirect if not authenticated)
- API calls with axios
- Error handling
- User dashboard

## 📊 API Endpoints Available

- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout (protected)
- `GET /api/v1/auth/profile` - Get user profile (protected)
- `GET /api/v1` - Health check
- `GET /api/docs` - Swagger API documentation

## 🔧 Troubleshooting

### Backend won't start
- Make sure port 3000 is free
- Check `backend/magichouse.db` file exists (auto-created)
- Run: `cd backend && npm install`

### Frontend won't start
- Make sure port 5173 is free
- Run: `cd web && npm install`

### Can't register/login
- Check backend terminal for errors
- Verify backend is running on http://localhost:3000
- Check browser console (F12) for errors

### CORS errors
- Backend CORS is configured for http://localhost:5173
- Make sure frontend is running on default Vite port

## 📝 Database Location

SQLite database: `backend/magichouse.db`

You can inspect it with:
- DB Browser for SQLite
- SQLite CLI
- VS Code SQLite extension

## 🎯 Next Steps After Testing

Once authentication works:
1. Switch to PostgreSQL (Docker or cloud)
2. Build Posts module (social feed)
3. Add Comments and Reactions
4. Implement file uploads
5. Add Chat functionality
6. Build mobile app (Flutter)

## 🌐 Swagger Documentation

While backend is running, visit:
**http://localhost:3000/api/docs**

Interactive API documentation with all endpoints and schemas!

---

**Everything is ready for testing! 🎉**
