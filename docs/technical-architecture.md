# UniKit Technical Architecture

## 1) Delivery-Oriented Stack Choice

Recommended stack for fast beginner-friendly shipping:
- **Frontend**: Next.js (App Router) + TypeScript
- **Backend/API**: Next.js route handlers or server actions
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: NextAuth/Auth.js
- **State management**: Server state + lightweight client state where needed
- **Scheduling/reminders**: Background job runner (cron/queue) for reminder dispatch

## 2) Architecture Layers

- **Presentation layer**: UI screens and reusable components
- **Application layer**: Use-case services (course, assignment, exam, dashboard, reminders)
- **Data layer**: Prisma models and repositories
- **Integration layer**: Notification channels (in-app first, email later)

## 3) Core Modules

- Authentication module
- Course module
- Assignment module
- Exam module
- Calendar/events module
- Dashboard module
- Reminder module

## 4) Timezone-Safe Date Handling Rules

- Persist all timestamps in UTC.
- Store user timezone on profile.
- Convert UTC to user timezone only at display boundaries.
- Normalize date inputs before persistence.
- Use explicit due_at/exam_at timestamps rather than date-only values for reminders.

## 5) API Surface (MVP)

- Auth endpoints/session handling
- Course CRUD endpoints
- Assignment CRUD endpoints
- Exam CRUD endpoints
- Dashboard endpoint (next 7 days deadlines)
- Reminder create/list/update endpoints

## 6) Observability and Reliability Baseline

- Structured logs for API failures and reminder jobs
- Basic error boundaries and API error responses
- Retry policy for reminder dispatch failures
- Health checks for job runner and database connectivity
