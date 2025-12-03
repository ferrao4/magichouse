# 🚀 Quick Start Guide - Magic House

## ✅ What's Working Now

The backend infrastructure is **fully functional** and tested on localhost!

- ✅ NestJS server runs on `http://localhost:3000`
- ✅ API endpoints at `http://localhost:3000/api/v1`
- ✅ Swagger docs at `http://localhost:3000/api/docs`
- ✅ Health check endpoint working
- ✅ All 8 database entities defined
- ✅ Multi-tenant architecture ready
- ✅ 934 npm packages installed

---

## 🎯 Current Status

### Phase 0: Foundation ✅ COMPLETE
- [x] Monorepo structure
- [x] NestJS backend setup
- [x] TypeORM entities (8 tables)
- [x] Environment configuration
- [x] Docker Compose for PostgreSQL
- [x] API documentation (Swagger)
- [x] Health check endpoint

### Phase 1: Core Features 🔄 IN PROGRESS
- [ ] Database connection (choose setup method)
- [ ] Authentication module (JWT, login, password reset)
- [ ] User management (CRUD, profiles, status)
- [ ] Social feed (posts, comments, reactions)
- [ ] File uploads (images, videos, documents)

---

## 📋 To Run Locally Right Now

### Step 1: Start Backend (Without Database)
```bash
cd C:\Users\LENOVOO\magichouse\backend
npm run start:dev
```

Server will start at: http://localhost:3000/api/v1

### Step 2: Test Health Endpoint
Open browser: http://localhost:3000/api/v1

You should see:
```json
{
  "status": "ok",
  "message": "Magic House API is running",
  "timestamp": "2025-12-03T10:05:43.000Z"
}
```

### Step 3: View API Documentation
Open: http://localhost:3000/api/docs

Swagger UI will show all available endpoints.

---

## 🗄️ Database Setup (Required for Full Functionality)

See `DATABASE_SETUP.md` for detailed instructions. Three options:

### Option 1: Docker (Easiest) 🐳
```bash
# 1. Start Docker Desktop
# 2. Run:
docker-compose up -d postgres

# 3. Enable TypeORM in backend/src/app.module.ts (line 14)
# 4. Restart backend
npm run start:dev
```

### Option 2: Install PostgreSQL Locally 💻
1. Download from: https://www.postgresql.org/download/windows/
2. Install and create database: `magichouse`
3. Enable TypeORM in app.module.ts
4. Restart backend

### Option 3: Cloud Database ☁️
1. Sign up: https://neon.tech (free)
2. Create PostgreSQL database
3. Update `backend/.env` with connection details
4. Enable TypeORM in app.module.ts
5. Restart backend

---

## 📂 Project Structure

```
magichouse/
├── backend/              ✅ NestJS API (Working)
│   ├── src/
│   │   ├── entities/    ✅ 8 database models
│   │   ├── config/      ✅ TypeORM config
│   │   ├── main.ts      ✅ App entry point
│   │   └── app.module.ts ✅ Root module
│   ├── .env             ✅ Environment vars
│   └── package.json     ✅ Dependencies
│
├── web/                 📋 React (Planned)
├── mobile/              📋 Flutter (Planned)
├── shared/              📋 Shared types (Planned)
│
├── docker-compose.yml   ✅ PostgreSQL container
├── CHANGELOG.md         ✅ Progress tracker
├── DATABASE_SETUP.md    ✅ DB setup guide
└── README.md            ✅ Documentation
```

---

## 🛠️ Available Commands

### Backend
```bash
# Development with hot-reload
npm run start:dev

# Production build
npm run build
npm run start:prod

# Run tests
npm run test

# Code formatting
npm run format
npm run lint
```

### Database (After Setup)
```bash
# Run migrations
npm run migration:run

# Revert migration
npm run migration:revert

# Generate migration
npm run migration:generate
```

### Docker
```bash
# Start PostgreSQL
docker-compose up -d postgres

# Stop PostgreSQL
docker-compose down

# View logs
docker-compose logs -f postgres

# Check status
docker ps
```

---

## 🧪 Testing Checklist

- [x] Dependencies install successfully
- [x] Backend starts without errors
- [x] Health endpoint responds
- [x] Swagger docs accessible
- [x] TypeScript compiles
- [ ] Database connection works
- [ ] Can create organizations
- [ ] Can register users
- [ ] Can login with JWT
- [ ] Can create posts
- [ ] Can add comments
- [ ] Can upload files

---

## 🔧 Common Issues & Fixes

### Port 3000 Already in Use
```bash
netstat -ano | findstr :3000
taskkill /PID <process_id> /F
```

### Docker Not Starting
- Open Docker Desktop manually
- Wait for it to fully initialize
- Check system tray icon is solid

### TypeScript Errors
```bash
cd backend
npm install
npm run build
```

### Module Not Found
```bash
cd backend
rm -rf node_modules
npm install
```

---

## 📊 What's Next

1. **Choose Database Setup Method** (5-15 minutes)
   - Recommended: Docker or Neon cloud

2. **Enable Database Connection** (2 minutes)
   - Uncomment line 14 in `backend/src/app.module.ts`

3. **Test Database** (5 minutes)
   - Restart server
   - Check logs for successful connection

4. **Implement Auth Module** (2-4 hours)
   - JWT authentication
   - Login/Register endpoints
   - Password reset flow

5. **Build User Management** (2-3 hours)
   - Profile CRUD
   - Profile picture upload
   - Status management

6. **Create Social Feed** (4-6 hours)
   - Post creation
   - Comments & replies
   - Reactions (likes)
   - File attachments

---

## 🎉 Success Metrics

You'll know everything is working when:

- ✅ Backend starts with no errors
- ✅ Database connection established
- ✅ Can create test organization
- ✅ Can register test user
- ✅ Can login and get JWT token
- ✅ Can create post
- ✅ Can add comment
- ✅ Can like post
- ✅ Swagger docs show all endpoints

---

## 📱 After Localhost Testing

Once backend is fully working locally:

1. **Build React Frontend** (web app)
2. **Build Flutter Mobile App**
3. **Deploy to Cloud**:
   - Backend: Railway, Render, or AWS
   - Database: Managed PostgreSQL
   - Frontend: Vercel or Netlify
   - Storage: AWS S3 or DigitalOcean Spaces

---

## 💡 Tips

- Keep Docker Desktop running while developing
- Use Swagger docs to test API endpoints
- Check `CHANGELOG.md` for latest updates
- Backend has hot-reload - changes apply automatically
- Use Postman for API testing (import from Swagger)

---

**🚀 Your Magic House backend is ready for development!**

Choose your database setup method and let's continue building! 🎯
