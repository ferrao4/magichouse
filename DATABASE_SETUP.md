# Database Setup Guide

You have three options to set up PostgreSQL for local development:

## Option 1: Docker Desktop (Recommended - Easiest)

### Step 1: Start Docker Desktop
1. Open Docker Desktop application
2. Wait for it to fully start (the whale icon in system tray should be steady)

### Step 2: Start PostgreSQL
```bash
cd C:\Users\LENOVOO\magichouse
docker-compose up -d postgres
```

### Step 3: Verify it's running
```bash
docker ps
```

You should see `magichouse-postgres` container running.

---

## Option 2: Install PostgreSQL Locally

### Step 1: Download PostgreSQL
1. Visit: https://www.postgresql.org/download/windows/
2. Download PostgreSQL 15 or later
3. Run the installer

### Step 2: During Installation
- Set password for `postgres` user (remember this!)
- Use default port `5432`
- Install pgAdmin (optional but helpful)

### Step 3: Create Database
Open pgAdmin or command prompt:
```sql
CREATE DATABASE magichouse;
```

### Step 4: Update backend/.env
If you used a different password:
```
DB_PASSWORD=your_password_here
```

---

## Option 3: Use Cloud Database (Temporary Testing)

### Free PostgreSQL Options:
- **Neon** (https://neon.tech) - Generous free tier
- **Supabase** (https://supabase.com) - Free PostgreSQL
- **ElephantSQL** (https://www.elephantsql.com) - Free 20MB

### Steps:
1. Sign up for any service above
2. Create a new PostgreSQL database
3. Copy the connection string
4. Update `backend/.env`:
```
DB_HOST=your-host.neon.tech
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=your_database
```

---

## Verify Database Connection

Once database is set up, test the connection:

```bash
cd C:\Users\LENOVOO\magichouse\backend
npm run start:dev
```

If successful, you'll see:
```
🚀 Application is running on: http://localhost:3000/api/v1
📚 API Documentation: http://localhost:3000/api/docs
```

---

## Quick Start (For Testing Without Database)

If you just want to see the structure works:

1. Comment out TypeORM in `backend/src/app.module.ts` (line 14)
2. Run: `npm run start:dev`
3. Visit: http://localhost:3000/api/v1

The health check endpoint will work without database.

---

## Troubleshooting

### Docker: "Cannot connect to Docker daemon"
- Make sure Docker Desktop is running
- Restart Docker Desktop
- Check if virtualization is enabled in BIOS

### PostgreSQL: "Connection refused"
- Check if PostgreSQL service is running
- Verify port 5432 is not blocked
- Confirm credentials in .env file

### Port Already in Use
```bash
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <process_id> /F
```

---

**Choose the option that works best for you and proceed with testing!**
