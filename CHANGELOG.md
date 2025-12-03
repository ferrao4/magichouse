# Changelog

All notable changes to the Magic House project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2025-12-03] - Project Initialization

### Added

#### Documentation
- Created comprehensive PRD (Product Requirements Document) with all Phase 1-4 specifications
- Created README.md with project overview and tech stack
- Created implementation plan for Phase 1 (Auth, Profiles, Feed, Uploads)

#### Project Structure
- Initialized monorepo structure with workspaces:
  - `/backend` - NestJS API
  - `/web` - React frontend (to be implemented)
  - `/mobile` - Flutter app (to be implemented)
  - `/shared` - Shared types and constants (to be implemented)
- Created root `package.json` with workspace configuration
- Created `.gitignore` for Node.js, TypeScript, and mobile development

#### Backend Infrastructure
- Initialized NestJS project with TypeScript
- Created `backend/package.json` with all required dependencies:
  - NestJS framework and modules
  - TypeORM for PostgreSQL
  - Passport.js and JWT for authentication
  - Nodemailer for email services
  - AWS SDK for file storage
  - Bcrypt for password hashing
  - Class-validator for input validation
- Created `backend/tsconfig.json` with TypeScript configuration
- Created `backend/nest-cli.json` for NestJS CLI

#### Database Schema
Created complete TypeORM entities with multi-tenant support:
- **Organization** entity: Multi-tenant organization management
- **User** entity: User profiles with roles (EMPLOYEE, MANAGER, ADMIN) and status (ONLINE, BUSY, IN_CALL, OFFLINE)
- **Post** entity: Social feed posts with visibility controls (COMPANY, DEPARTMENT)
- **PostAttachment** entity: File attachments for posts
- **Comment** entity: Comments with nested replies support
- **Reaction** entity: Like reactions on posts
- **Message** entity: 1:1 chat messages with delivery/seen indicators
- **PasswordReset** entity: Password reset token management

#### Configuration
- Created `.env.example` and `.env` files with all environment variables:
  - Application settings (PORT, API_PREFIX)
  - Database connection (PostgreSQL)
  - JWT secrets and expiry
  - SMTP email configuration
  - AWS S3 / Object storage settings
  - File upload limits and allowed types
  - Frontend URL for CORS
- Created TypeORM configuration in `src/config/typeorm.config.ts`

#### Core Application Files
- Created `src/main.ts`: Application entry point with:
  - Global validation pipe
  - CORS configuration
  - Swagger API documentation setup
  - Health check endpoint
- Created `src/app.module.ts`: Root module with ConfigModule and TypeORM
- Created `src/app.controller.ts`: Health check controller
- Created `src/app.service.ts`: Health check service
- Created `src/entities/index.ts`: Entity exports

### Configuration
- Set up development environment with:
  - Node.js v25.0.0
  - npm v11.6.2
  - NestJS CLI v11.0.14
- Configured multi-tenant architecture with `org_id` filtering
- Enabled auto-sync for development database schema

### Notes
- Backend structure is ready for module implementation (Auth, Users, Posts, etc.)
- Database entities use soft deletes for posts and comments
- All entities follow multi-tenant pattern with organization scoping
- Ready to install dependencies and start development server
- Next steps: Install npm packages, set up PostgreSQL, implement authentication module

### Technology Stack Confirmed
- **Backend**: NestJS (Node.js), TypeORM, PostgreSQL
- **Frontend Web**: React + Vite + TailwindCSS (planned)
- **Mobile**: Flutter (Android & iOS) (planned)
- **Authentication**: JWT with Passport.js
- **File Storage**: AWS S3 or compatible object storage
- **Email**: SMTP with Nodemailer
- **API Documentation**: Swagger/OpenAPI

## [2025-12-03] - Local Testing Setup

### Added
- Created `DATABASE_SETUP.md` guide with three database setup options:
  - Docker Desktop with PostgreSQL container
  - Local PostgreSQL installation
  - Cloud database providers (Neon, Supabase, ElephantSQL)
- Troubleshooting section for common issues

### Changed
- Temporarily commented out TypeORM in app.module.ts for initial structure testing
- Allows backend to run without database for verification

### Tested
- ✅ Backend dependencies installation (934 packages)
- ✅ NestJS development server starts successfully
- ✅ Server runs on http://localhost:3000/api/v1
- ✅ Swagger documentation available at http://localhost:3000/api/docs
- ✅ Health check endpoint configured
- ✅ No TypeScript compilation errors

### Notes
- Backend structure is verified and working
- Ready for database connection once PostgreSQL is set up
- All routes properly mapped and responding
- Development server has hot-reload enabled

### Next Steps
1. Choose and set up PostgreSQL (Docker/Local/Cloud)
2. Uncomment TypeORM in app.module.ts
3. Test database connection
4. Implement authentication module
5. Build user management and social feed features

---

## How to Update This Changelog

1. For each work session, add a new dated section or append to today's section
2. Organize changes under categories: Added, Changed, Fixed, Removed, Security, Deprecated
3. Include relevant file paths, module names, or endpoint details
4. Keep entries concise but informative
5. Commit with message format: `docs(changelog): update for <feature/fix>`
