# UniKit UX and App Structure

## 1) Screen Inventory

- Onboarding
- Dashboard
- Courses
- Assignments
- Exams
- Calendar
- Settings

## 2) Primary User Flow

1. User signs up and sets timezone.
2. User creates courses for current term.
3. User adds assignment and exam deadlines.
4. Dashboard shows upcoming workload (next 7 days).
5. User receives reminder before deadlines.
6. User marks items complete.

## 3) UX Principles

- Mobile-first layout with desktop support
- Low-friction data entry (few required fields)
- Due-date-first hierarchy on dashboard
- Status clarity (pending, in-progress, completed)
- Fast navigation between course view and global calendar

## 4) Navigation Structure

- **Top level**: Dashboard, Courses, Assignments, Exams, Calendar, Settings
- **Context links**: From course to associated assignments/exams
- **Quick actions**: Add assignment, add exam, mark complete

## 5) Core States to Support

- Empty states (no courses, no deadlines)
- Overdue states
- Upcoming soon states (24h/48h windows)
- Completed states
- Error and retry states for create/update actions
