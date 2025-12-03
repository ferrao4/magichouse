# Magic House Backend

NestJS-based REST API for the Magic House internal communication platform.

## Features

- **Multi-tenant Architecture**: Organization-based data isolation with `org_id`
- **Authentication**: JWT-based auth with access and refresh tokens
- **Role-Based Access Control (RBAC)**: Employee, Manager, and Admin roles
- **Social Feed**: Posts with comments, reactions, and file attachments
- **Real-time Chat**: 1:1 messaging (Phase 2)
- **File Storage**: Secure file uploads with signed URLs
- **Email Service**: Password reset and notifications

## Tech Stack

- **Framework**: NestJS 10.x
- **Language**: TypeScript 5.x
- **Database**: PostgreSQL 15+ with TypeORM
- **Authentication**: Passport.js + JWT
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI
- **Email**: Nodemailer
- **File Storage**: AWS S3 SDK

## Prerequisites

- Node.js 18+ (currently using v25.0.0)
- npm 9+ (currently using v11.6.2)
- PostgreSQL 15+
- Docker & Docker Compose (optional, for local database)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

#### Option A: Using Docker (Recommended)

From the root directory:

```bash
docker-compose up -d postgres
```

#### Option B: Local PostgreSQL

Install PostgreSQL and create a database:

```sql
CREATE DATABASE magichouse;
```

### 3. Configure Environment

Copy the example environment file and update values:

```bash
cp .env.example .env
```

Update `.env` with your configuration (database, JWT secrets, etc.)

### 4. Run Migrations (After Implementation)

```bash
npm run migration:run
```

### 5. Start Development Server

```bash
npm run start:dev
```

The API will be available at:
- **API**: http://localhost:3000/api/v1
- **Swagger Docs**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/api/v1

## Available Scripts

- `npm run start` - Start production server
- `npm run start:dev` - Start development server with watch mode
- `npm run start:debug` - Start debug mode
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run migration:generate` - Generate migration from entities
- `npm run migration:run` - Run pending migrations
- `npm run migration:revert` - Revert last migration

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   └── typeorm.config.ts
│   ├── entities/         # TypeORM entities
│   │   ├── organization.entity.ts
│   │   ├── user.entity.ts
│   │   ├── post.entity.ts
│   │   ├── comment.entity.ts
│   │   ├── reaction.entity.ts
│   │   ├── message.entity.ts
│   │   └── password-reset.entity.ts
│   ├── modules/          # Feature modules (to be implemented)
│   │   ├── auth/
│   │   ├── users/
│   │   ├── posts/
│   │   ├── comments/
│   │   ├── reactions/
│   │   └── files/
│   ├── common/           # Shared utilities (to be implemented)
│   │   ├── decorators/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── filters/
│   ├── app.module.ts     # Root module
│   ├── app.controller.ts # Health check
│   ├── app.service.ts    # Health service
│   └── main.ts           # Application entry point
├── test/                 # Test files
├── .env                  # Environment variables
├── .env.example          # Example environment file
├── nest-cli.json         # NestJS CLI config
├── tsconfig.json         # TypeScript config
└── package.json          # Dependencies
```

## Database Schema

### Entities

- **organizations**: Multi-tenant organization data
- **users**: User profiles with roles and status
- **posts**: Social feed posts with visibility controls
- **post_attachments**: File attachments for posts
- **comments**: Comments with nested replies
- **reactions**: Like reactions on posts
- **messages**: 1:1 chat messages
- **password_resets**: Password reset tokens

### Multi-Tenancy

All user-generated data is scoped by `org_id` to ensure data isolation between organizations.

## API Documentation

Once the server is running, visit http://localhost:3000/api/docs for interactive API documentation via Swagger UI.

## Environment Variables

See `.env.example` for all available environment variables:

- **Application**: PORT, API_PREFIX, NODE_ENV
- **Database**: DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME
- **JWT**: JWT_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRES_IN
- **Email**: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM
- **Storage**: AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET
- **Upload**: MAX_FILE_SIZE, ALLOWED_FILE_TYPES
- **CORS**: FRONTEND_URL

## Development Phases

### ✅ Phase 0: Foundation (Current)
- Project structure
- Database entities
- Core configuration

### 🔄 Phase 1: Core Features (In Progress)
- Authentication module
- User management
- Social feed (posts, comments, reactions)
- File uploads

### 📋 Phase 2: Communication (Planned)
- Real-time chat
- Push notifications
- Mobile app support

### 📋 Phase 3: Advanced Features (Planned)
- Audio/video calling
- Call recording
- Email notifications

### 📋 Phase 4: Administration (Planned)
- Admin dashboard
- Analytics
- User management

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## License

Private - All Rights Reserved
