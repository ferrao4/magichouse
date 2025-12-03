# PRODUCT REQUIREMENT DOCUMENT (PRD) — MAGIC HOUSE

**Version:** 1.0  
**Prepared For:** Stakeholders & Development Team  
**Platform Type:** Multi-tenant SaaS (Web + Android + iOS)

---

## 1️⃣ Executive Summary

Magic House is an internal communication and engagement platform for companies. It provides a Facebook-like employee social feed, real-time chat, audio/video calling, file sharing, and recognition — all inside a secure workspace accessible only by employees of that company.

Magic House increases employee engagement, transparency, and collaboration inside an organization.

---

## 2️⃣ Product Vision

To build the most engaging digital workplace where employees communicate openly, share updates, collaborate, and feel connected — regardless of where they are located.

---

## 3️⃣ Objectives / Goals

| Goal | Target |
|------|--------|
| Improve communication | Reduce WhatsApp/email dependency by 50% |
| Boost engagement | >70% monthly active users |
| Build recognition culture | 3+ appreciation posts per department per month |
| Provide single content hub | 100% internal updates in Magic House |

---

## 4️⃣ Target Users

- Employees inside a company
- Managers & leaders
- HR/Internal communication stakeholders
- Year-1 scale per company: < 500 users

---

## 5️⃣ Core Features

### 🔹 A. Authentication & Multi-Tenant Access

- Email login
- Company workspace mapping using `org_id`
- Roles: Employee / Manager / Admin
- Forgot password via email OTP

### 🔹 B. User Profiles

- Name, job title, department, bio
- Profile picture upload
- Online status: Online / Busy / In call

### 🔹 C. Social Feed (Facebook-style)

| Action | Capability |
|--------|------------|
| Create post | Text + images + videos + PDF/Docs |
| Interact | Comments + replies |
| Reactions | Like (additional reactions in future) |
| Sorting | Latest / Trending |
| Moderation | Admin can delete posts/comments |
| Visibility | Entire company or department-only |

### 🔹 D. File Uploads & Storage

- Allowed formats: Images, videos, PDF, Word, Excel
- Max size: 200MB
- All files stored privately in object storage
- Access via time-limited signed URLs
- Soft delete period: 30 days

### 🔹 E. Real-Time Chat

- 1:1 messaging
- Text + emojis + attachments
- Delivered / Seen indicators
- Search users and chat history
- Mobile + web push notifications

### 🔹 F. Audio / Video Calling

- 1:1 audio and video calls
- Works on web, Android, and iOS
- Built using WebRTC + Signaling + STUN/TURN

### 🔹 G. Call Recording (On-Demand)

- User can manually start/stop recording
- When completed, system emails secure link
- Permissions:
  - Employee: own recordings
  - Manager: team recordings
  - Admin: all recordings

### 🔹 H. Admin Dashboard

| Panel | Capabilities |
|-------|--------------|
| Users | Add / remove users, reset passwords |
| Posts | Monitor & delete inappropriate posts |
| Calls | Control recording permissions |
| Analytics | Active users, calls, posts, storage |
| Storage report | Usage breakdown by file type |

---

## 6️⃣ Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| Uptime | 99.5% |
| Latency | < 150 ms for feed, < 1s for chat |
| Security | HTTPS + JWT + RBAC |
| Backups | DB + Storage daily |
| Scalability | Auto-scale backend + WebSocket nodes |
| Compliance | Supports GDPR delete/export |

---

## 7️⃣ System Architecture Overview

(Describe structure for documentation — visual will be created in Canva)

```
React Web App
Flutter Mobile App
        ↓
     Backend API (Node.js / NestJS)
  REST APIs + WebSocket Service + Auth
        ↓
 PostgreSQL Database (Multi-tenant with org_id)
        ↓
Object Storage (Uploads + Recordings) — Signed URLs
        ↓
WebRTC (Audio/Video) + STUN/TURN Servers
```

---

## 8️⃣ Database ERD Structure

(Text description — visual ER diagram will be created in Canva)

### 📌 Tables

- Users
- Posts
- Comments
- Reactions
- Messages
- Calls

### 📌 Relations

- One User → Many Posts
- One Post → Many Comments & Reactions
- One User → Many Messages
- One Call → One (optional) Recording

---

## 9️⃣ User Roles & Permissions

| Module | Employee | Manager | Admin |
|--------|----------|---------|-------|
| Posts | ✔ (own) | ✔ (own) | ✔ (all) |
| Comments | ✔ | ✔ | ✔ |
| Chat | ✔ | ✔ | ✔ |
| Calls | ✔ | ✔ | ✔ |
| Start recording | ✔ | ✔ | ✔ |
| Access recordings | Own | Team | All |
| User management | ✖ | ✖ | ✔ |
| Admin analytics | ✖ | Team | Full |

---

## 🔟 Release Roadmap

| Phase | Deliverables | Timeline |
|-------|--------------|----------|
| Phase 1 | Auth, Profiles, Feed, Uploads | 8–12 weeks |
| Phase 2 | Chat + Notifications + Mobile apps | +6–8 weeks |
| Phase 3 | Audio/video calling + recording + emails | +6–10 weeks |
| Phase 4 | Admin dashboard + analytics + groups | +6–8 weeks |

---

## 1️⃣1️⃣ KPIs / Success Measurement

| Success Indicator | Target |
|-------------------|--------|
| Monthly active users | >70% |
| Posts per company/month | >50 |
| Chats per user/day | >4 |
| Call success rate | >95% |
| Notification open rate | >40% |

---

## 1️⃣2️⃣ Done Criteria (Final Acceptance)

Magic House is considered complete when:

- Web + Android + iOS applications are operational
- Feed supports posts, comments, reactions, and file uploads
- Real-time chat and push notifications work
- Audio/video calls function on all platforms
- Recording works only when user selects Record
- System emails download link automatically
- Admin dashboard controls and reports are working
- Multi-tenant data separation is verified
