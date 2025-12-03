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

## [2025-12-03] - Authentication System & Feed Implementation

### Added

#### Backend - Authentication Module
- Created complete AuthModule with JWT and Passport strategies
- Implemented authentication service with password hashing (bcrypt, 10 rounds)
- Created 6 authentication endpoints:
  - POST /api/v1/auth/register - Register new user
  - POST /api/v1/auth/login - Login with JWT
  - POST /api/v1/auth/logout - Logout (protected)
  - POST /api/v1/auth/request-password-reset - Request reset
  - POST /api/v1/auth/reset-password - Reset with token
  - GET /api/v1/auth/profile - Get user profile (protected)
- Implemented JWT strategy for token validation
- Implemented Local strategy for email/password authentication
- Created JwtAuthGuard for protecting routes
- Added DTOs with validation (RegisterDto, LoginDto)

#### Backend - Posts Module
- Created PostsModule with complete CRUD operations
- Implemented 11 posts endpoints:
  - POST /api/v1/posts - Create post
  - GET /api/v1/posts/feed - Get paginated feed
  - GET /api/v1/posts/:id - Get single post
  - DELETE /api/v1/posts/:id - Delete post (owner/admin)
  - POST /api/v1/posts/:id/comments - Add comment
  - GET /api/v1/posts/:id/comments - Get all comments
  - DELETE /api/v1/posts/comments/:id - Delete comment
  - POST /api/v1/posts/:id/react - Toggle like
  - GET /api/v1/posts/:id/reactions/count - Get like count
  - GET /api/v1/posts/:id/reactions/me - Check user reaction
- Features:
  - Multi-tenant post filtering by org_id
  - Department vs company-wide visibility controls
  - Pagination support (page, limit)
  - Nested comments with replies
  - Like/unlike toggle functionality
  - Soft delete for posts and comments
  - Permission checks (owner or admin can delete)

#### Frontend - React Application
- Initialized React + TypeScript project with Vite
- Installed dependencies: axios, react-router-dom
- Created API service layer with axios interceptors
- Built authentication pages:
  - Login page with email/password form
  - Register page with full user details
  - Dashboard with profile display
  - Home landing page
- Implemented routing with React Router:
  - / - Home page
  - /login - Login page
  - /register - Registration page
  - /dashboard - Protected dashboard
  - /feed - Protected feed (NEW)
- Created Feed UI components:
  - PostComposer - Create new posts
  - PostCard - Display posts with all interactions
  - Feed page - Complete social feed
- Features:
  - Create posts with textarea
  - View feed with pagination
  - Like/unlike with real-time count
  - Add comments (expand/collapse)
  - Delete own posts
  - Relative timestamps ("Just now", "5m ago", etc.)
  - User info display
  - Loading states and error handling

#### Database & Configuration
- Configured SQLite for local development (easy testing)
- Created seed script to generate default organization
- Fixed entity enums for SQLite compatibility (text instead of enum)
- Updated CORS to allow localhost:5173 and 5174
- Relaxed orgId validation for testing (string instead of strict UUID)

#### Documentation
- Created START_TESTING.md - Comprehensive testing guide
- Created QUICKSTART.md - Quick start instructions
- Updated README files for backend and web
- All API endpoints documented in Swagger

### Changed
- Modified Organization entity: settings field changed from jsonb to text for SQLite
- Modified User, Post, Reaction entities: enum columns changed to text for SQLite
- Updated main.ts CORS configuration to support multiple origins
- Enhanced error handling in Register component
- Updated Dashboard to include "Go to Feed" button

### Fixed
- Resolved CORS issues between frontend and backend
- Fixed orgId validation blocking registration
- Fixed SQLite enum compatibility issues
- Fixed Dashboard User interface type issues
- Resolved frontend routing and navigation

### Tested
- ✅ User registration working end-to-end
- ✅ Login with JWT authentication
- ✅ Dashboard showing user profile
- ✅ Logout functionality
- ✅ Protected routes working correctly
- ✅ Create posts functionality
- ✅ View feed with posts
- ✅ Like/unlike posts
- ✅ Add comments to posts
- ✅ Delete own posts
- ✅ Database persistence (SQLite)

### Security
- Password hashing with bcrypt (10 salt rounds)
- JWT token authentication with configurable expiry
- Protected routes with JwtAuthGuard
- Email uniqueness validation
- User status tracking (ONLINE/OFFLINE)
- Permission-based delete operations

### Technical Details
- **Backend**: NestJS + TypeORM + SQLite
- **Frontend**: React 19 + TypeScript + Vite
- **API**: REST with Swagger documentation
- **Database**: SQLite (local), PostgreSQL-ready
- **Total Endpoints**: 17 (6 auth + 11 posts)
- **Total Components**: 6 (PostComposer, PostCard, Feed, Login, Register, Dashboard, Home)

### Progress
**Completed Tasks: 7/14 (50%)**
1. ✅ Monorepo structure setup
2. ✅ Backend authentication module
3. ✅ Database schema with TypeORM
4. ✅ Frontend authentication UI
5. ✅ Backend posts module
6. ✅ Backend comments & reactions
7. ✅ Frontend feed implementation

**Remaining Tasks: 7/14**
- User management module
- File storage & email services
- Profile management UI
- Mobile app (Flutter)
- DevOps & deployment
- Testing & documentation

### Next Steps
1. Implement user management module (profile editing, user search)
2. Add file upload functionality (images, videos, documents)
3. Build profile management UI
4. Switch to PostgreSQL for production
5. Deploy to cloud platform

---

## How to Update This Changelog

1. For each work session, add a new dated section or append to today's section
2. Organize changes under categories: Added, Changed, Fixed, Removed, Security, Deprecated
3. Include relevant file paths, module names, or endpoint details
4. Keep entries concise but informative
5. Commit with message format: `docs(changelog): update for <feature/fix>`
