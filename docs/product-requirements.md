# UniKit Product Requirements (MVP)

## 1) MVP Scope

### Target user
University students managing multiple courses, assignments, exams, and schedules.

### Core outcomes
- Avoid missing deadlines
- Track academic task progress
- Plan short-term study workload

### MVP features (Must-have)
- Course management
- Assignment tracking
- Exam tracking
- Calendar/schedule view
- Dashboard with upcoming deadlines
- Basic reminder support

## 2) User Stories

### Course management
- As a student, I can create, edit, and archive courses so I can organize my semester.
- As a student, I can assign assignments and exams to a course so I can view work by class.

### Assignment and exam tracking
- As a student, I can create assignments with due dates and status so I can track completion.
- As a student, I can create exams with date/time and preparation notes so I can plan revision.
- As a student, I can mark items complete so my remaining workload is clear.

### Dashboard and calendar
- As a student, I can see all upcoming deadlines in the next 7 days so I can prioritize work.
- As a student, I can view all academic events in a calendar so I can avoid schedule conflicts.

### Notifications/reminders
- As a student, I can receive reminders before deadlines so I do not forget tasks.

## 3) Data Model Entities

- **Student**: id, name, email, timezone, created_at
- **Course**: id, student_id, code, name, instructor, term, color, status
- **Assignment**: id, course_id, title, due_at, priority, status, notes
- **Exam**: id, course_id, title, exam_at, location, notes, status
- **Event**: id, student_id, title, start_at, end_at, type, linked_entity
- **Reminder**: id, student_id, entity_type, entity_id, channel, remind_at, sent_at, status

## 4) Priority Levels

### Must-have (MVP)
- Authentication
- Course CRUD
- Assignment/exam CRUD
- Dashboard upcoming deadlines
- Calendar view
- Basic in-app reminder scheduling

### Should-have (Post-MVP early)
- Email reminder channel
- Assignment/exam filters and search
- Lightweight analytics (completed vs pending)

### Later
- GPA and grade tracking
- Auto study planner
- Collaboration/group workflows
- LMS integrations
- AI planning assistant

## 5) MVP Success Criteria

- Weekly active users among beta testers
- % of tasks completed before due date
- Reminder delivery success rate
- 7-day retention across first beta users
- Qualitative feedback: dashboard usefulness and deadline clarity
