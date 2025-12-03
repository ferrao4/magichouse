# Magic House

An internal communication and engagement platform for companies.

## Overview

Magic House is a multi-tenant SaaS platform (Web + Android + iOS) that provides:
- Facebook-like employee social feed
- Real-time chat
- Audio/video calling
- File sharing
- Employee recognition
- Admin dashboard

All within a secure workspace accessible only by company employees.

## Documentation

- [Product Requirements Document (PRD)](./PRD.md) - Complete product specifications and requirements

## Tech Stack

- **Frontend Web:** React
- **Mobile Apps:** Flutter (Android & iOS)
- **Backend:** Node.js / NestJS
- **Database:** PostgreSQL (Multi-tenant)
- **Storage:** Object Storage with signed URLs
- **Real-time:** WebSocket
- **Video/Audio:** WebRTC + STUN/TURN

## Target Scale

Year-1: < 500 users per company

## Development Phases

1. **Phase 1** (8-12 weeks): Auth, Profiles, Feed, Uploads
2. **Phase 2** (6-8 weeks): Chat + Notifications + Mobile apps
3. **Phase 3** (6-10 weeks): Audio/video calling + recording + emails
4. **Phase 4** (6-8 weeks): Admin dashboard + analytics + groups

## License

Private - All Rights Reserved
