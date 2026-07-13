# UniKit Implementation Roadmap

## Phase 1 — Foundation

- Set up authentication
- Implement course CRUD
- Add initial database schema and migrations
- Deliver basic onboarding and settings (timezone)

## Phase 2 — Academic Tracking Core

- Implement assignment CRUD with due dates
- Implement exam CRUD with date/time
- Add status lifecycle (pending/in-progress/completed)
- Add validation and error handling for all forms

## Phase 3 — Student Planning Views

- Implement dashboard (next 7 days deadlines)
- Implement calendar view for assignments, exams, and events
- Add filtering by course and status

## Phase 4 — Reminders

- Build reminder scheduling logic
- Add in-app reminders (MVP channel)
- Prepare extension points for email/push channels
- Add retry behavior for failed reminder dispatch

## Phase 5 — Metrics and Refinement

- Add completed vs pending analytics
- Improve UX based on beta feedback
- Remove friction from core add-track-complete flow

## Quality Plan (Across All Phases)

- Add tests for:
  - Deadline calculations
  - Reminder scheduling
  - Completion status transitions
- Keep validations strict for date/time and required fields
- Track basic logs and crash signals

## Launch Strategy

- Release to a small beta group of students
- Gather weekly feedback:
  - Most-used features
  - Drop-off points
  - Missing workflow steps
- Prioritize fixes for high-friction workflows
- Publish stable v1 once core flows are reliable

## Post-MVP Roadmap

- Grade and GPA tracking
- Auto time-blocked study planner
- Group study/collaboration features
- LMS and calendar integrations
- AI assistant for prioritization and study planning

## Weekly Operating Rhythm

- Plan weekly feature goals
- Build and test one coherent workflow at a time
- Ship small increments continuously
- Review feedback and adjust backlog
