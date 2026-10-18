# Hostel Management System - Product Backlog (Phase 1)

Source: SRS v1.1 (FR-001..017, NFR-001..007, SR-001..005), SAD v1.1, Test Plan. Story points use the Fibonacci scale (1,2,3,5,8). Tracked in a GitHub Project linked to the mini-project repo.

## Team and roles

| Member | Role | Stories | Points |
|---|---|---|---|
| Aditya | Developer | 23 | 80 |
| Varshita | QA Lead | 6 | 21 |
| Shailaja | Tester | 3 | 18 |
| Krishna | Product Owner | 5 | 13 |

## Sprint load

| Sprint | Stories | Points |
|---|---|---|
| Sprint 1 | 18 | 60 |
| Sprint 2 | 19 | 72 |

## Backlog

| ID | Title | Requirements | Priority | SP | Sprint | Assignee |
|---|---|---|---|---|---|---|
| HMS-001 | Project setup: repo structure, README, .env.example, DB connection | HMS-NFR-005, HMS-SR-003 | High | 3 | 1 | Aditya |
| HMS-002 | Create student record | HMS-FR-001 | High | 3 | 1 | Aditya |
| HMS-003 | View student details | HMS-FR-002 | High | 2 | 1 | Aditya |
| HMS-004 | Update student details | HMS-FR-003 | High | 3 | 1 | Aditya |
| HMS-005 | Search students by ID or name | HMS-FR-004 | Medium | 3 | 2 | Aditya |
| HMS-006 | Add room with unique number and positive capacity | HMS-FR-005 | High | 3 | 1 | Aditya |
| HMS-007 | Show room capacity, occupancy and remaining capacity | HMS-FR-006 | High | 5 | 1 | Aditya |
| HMS-008 | Allocate student to a room | HMS-FR-007 | High | 5 | 1 | Aditya |
| HMS-009 | Reject allocation to a full room | HMS-FR-008 | High | 2 | 1 | Aditya |
| HMS-010 | Prevent duplicate active allocation per student | HMS-FR-009 | High | 3 | 1 | Aditya |
| HMS-011 | Change a student's room | HMS-FR-010 | Medium | 5 | 2 | Aditya |
| HMS-012 | Vacate a room | HMS-FR-011 | High | 3 | 2 | Aditya |
| HMS-013 | Filter rooms and allocations | HMS-FR-013 | Medium | 3 | 2 | Aditya |
| HMS-014 | Dashboard summary | HMS-FR-015 | Medium | 3 | 2 | Aditya |
| HMS-015 | Form validation and user-friendly error messages | HMS-FR-016 | High | 3 | 1 | Aditya |
| HMS-016 | Server-side validation of all API input | HMS-NFR-007, HMS-SR-002 | High | 3 | 1 | Aditya |
| HMS-017 | Safe, consistent error handling | HMS-SR-004 | Medium | 2 | 2 | Aditya |
| HMS-018 | Allocation data integrity (no overbooking, no contradictory records) | HMS-NFR-003 | High | 5 | 2 | Aditya |
| HMS-019 | Admin authentication/authorization with hashed passwords (conditional) | HMS-FR-014, HMS-NFR-004, HMS-SR-001, HMS-SR-005 | High | 8 | 2 | Aditya |
| HMS-020 | Performance check on list/search (<= 3 s) | HMS-NFR-002 | Medium | 2 | 2 | Aditya |
| HMS-021 | Usability polish, responsive layout and Chromium check | HMS-NFR-001, HMS-NFR-006 | Medium | 3 | 2 | Aditya |
| HMS-022 | Fee amount and payment status (optional extension) | HMS-FR-012 | Low | 5 | 2 | Aditya |
| HMS-023 | Allocation history per student (optional extension) | HMS-FR-017 | Low | 3 | 2 | Aditya |
| HMS-024 | Finalise test data set and test environment | Test Plan: Test Data | High | 3 | 1 | Varshita |
| HMS-025 | Design allocation test cases (TC-ALLOC-001..007) | HMS-FR-007..011, HMS-NFR-003 | High | 5 | 1 | Varshita |
| HMS-026 | Design security, usability, performance and compatibility test cases | HMS-NFR-001/002/004/006, HMS-SR-001..005 | High | 5 | 1 | Varshita |
| HMS-027 | Maintain RTM and triage defects | SRS Sec. 9 | Medium | 3 | 2 | Varshita |
| HMS-028 | Run team usability check (NFR-001) | HMS-NFR-001 | Medium | 2 | 2 | Varshita |
| HMS-029 | Test Summary Report | Test Plan: Deliverables | High | 3 | 2 | Varshita |
| HMS-030 | Design student and validation test cases (TC-STU, TC-ROOM) | HMS-FR-001..006, HMS-FR-016, HMS-NFR-007 | High | 5 | 1 | Shailaja |
| HMS-031 | Design filter and dashboard test cases; write API test scripts | HMS-FR-013, HMS-FR-015 | Medium | 5 | 2 | Shailaja |
| HMS-032 | Execute test cycles, log results and file defects (Sprint 1 and 2) | All planned TCs | High | 8 | 2 | Shailaja |
| HMS-033 | Decide optional scope: login, fee tracking, allocation history | SRS Sec. 1.2, 10 | High | 2 | 1 | Krishna |
| HMS-034 | Refine backlog and confirm acceptance criteria | SRS Sec. 4, 7 | High | 3 | 1 | Krishna |
| HMS-035 | Approve API contract and SAD alignment | SAD Sec. 5 | Medium | 2 | 1 | Krishna |
| HMS-036 | Sprint reviews and test-result sign-off | Test Plan: Roles | High | 3 | 2 | Krishna |
| HMS-037 | Final demo preparation and deviation list | SRS Sec. 7 | High | 3 | 2 | Krishna |

## Story details

### HMS-001 - Project setup: repo structure, README, .env.example, DB connection
- **Story:** As a team member, I want a documented frontend/backend skeleton with MongoDB connection so everyone can run the app locally.
- **Requirements:** HMS-NFR-005, HMS-SR-003  |  **Epic:** Foundation  |  **Type:** Dev
- **Acceptance:** frontend/ and backend/ exist; README lists setup/run steps; .env.example has no secrets; .env is git-ignored.

### HMS-002 - Create student record
- **Story:** As an admin, I want to create a student with a unique student ID so the student appears in the list.
- **Requirements:** HMS-FR-001  |  **Epic:** Student Management  |  **Type:** Dev
- **Acceptance:** Valid student saved and visible in list; duplicate studentId rejected (409).

### HMS-003 - View student details
- **Story:** As an admin, I want to open a student to see stored details.
- **Requirements:** HMS-FR-002  |  **Epic:** Student Management  |  **Type:** Dev
- **Acceptance:** Selecting a student shows all stored details.

### HMS-004 - Update student details
- **Story:** As an admin, I want to edit a student's permitted details.
- **Requirements:** HMS-FR-003  |  **Epic:** Student Management  |  **Type:** Dev
- **Acceptance:** Updated values persist after refresh.

### HMS-005 - Search students by ID or name
- **Story:** As an admin, I want to search students so I can find a record quickly.
- **Requirements:** HMS-FR-004  |  **Epic:** Student Management  |  **Type:** Dev
- **Acceptance:** Matches shown; no-match shows a clear message.

### HMS-006 - Add room with unique number and positive capacity
- **Story:** As an admin, I want to add rooms so students can be allocated.
- **Requirements:** HMS-FR-005  |  **Epic:** Room Management  |  **Type:** Dev
- **Acceptance:** Valid room saved; duplicate room number or capacity <= 0 rejected.

### HMS-007 - Show room capacity, occupancy and remaining capacity
- **Story:** As an admin, I want to see how full each room is.
- **Requirements:** HMS-FR-006  |  **Epic:** Room Management  |  **Type:** Dev
- **Acceptance:** Occupancy derived from active allocations and matches allocation records.

### HMS-008 - Allocate student to a room
- **Story:** As an admin, I want to allocate a student to a room with free capacity.
- **Requirements:** HMS-FR-007  |  **Epic:** Allocation  |  **Type:** Dev
- **Acceptance:** Allocation recorded; occupancy updated.

### HMS-009 - Reject allocation to a full room
- **Story:** As an admin, I want a clear error when a room is full.
- **Requirements:** HMS-FR-008  |  **Epic:** Allocation  |  **Type:** Dev
- **Acceptance:** No allocation created; clear error shown.

### HMS-010 - Prevent duplicate active allocation per student
- **Story:** As an admin, I want a student to hold only one active allocation.
- **Requirements:** HMS-FR-009  |  **Epic:** Allocation  |  **Type:** Dev
- **Acceptance:** Second active allocation rejected (409) until first is ended.

### HMS-011 - Change a student's room
- **Story:** As an admin, I want to move a student to another room.
- **Requirements:** HMS-FR-010  |  **Epic:** Allocation  |  **Type:** Dev
- **Acceptance:** Old allocation closed, new one recorded, capacity never exceeded.

### HMS-012 - Vacate a room
- **Story:** As an admin, I want to mark a student as vacated.
- **Requirements:** HMS-FR-011  |  **Epic:** Allocation  |  **Type:** Dev
- **Acceptance:** Allocation ended with end date; room capacity increases.

### HMS-013 - Filter rooms and allocations
- **Story:** As an admin, I want to filter by room availability and allocation status.
- **Requirements:** HMS-FR-013  |  **Epic:** Search & Filter  |  **Type:** Dev
- **Acceptance:** List shows only records matching the filter.

### HMS-014 - Dashboard summary
- **Story:** As an admin, I want totals of students, rooms, occupancy and free capacity.
- **Requirements:** HMS-FR-015  |  **Epic:** Dashboard  |  **Type:** Dev
- **Acceptance:** Summary values agree with stored records.

### HMS-015 - Form validation and user-friendly error messages
- **Story:** As an admin, I want invalid/incomplete input explained and not saved.
- **Requirements:** HMS-FR-016  |  **Epic:** Validation  |  **Type:** Dev
- **Acceptance:** Invalid input not saved; field-level messages shown.

### HMS-016 - Server-side validation of all API input
- **Story:** As a maintainer, I want the backend to validate IDs, required fields, capacity and status values.
- **Requirements:** HMS-NFR-007, HMS-SR-002  |  **Epic:** Validation  |  **Type:** Dev
- **Acceptance:** Invalid payload sent directly to API is rejected with no data change.

### HMS-017 - Safe, consistent error handling
- **Story:** As a user, I never want stack traces or sensitive details in errors.
- **Requirements:** HMS-SR-004  |  **Epic:** Security  |  **Type:** Dev
- **Acceptance:** Invalid request returns consistent JSON message; no stack trace.

### HMS-018 - Allocation data integrity (no overbooking, no contradictory records)
- **Story:** As an admin, I want occupancy never to exceed capacity even on repeated/concurrent requests.
- **Requirements:** HMS-NFR-003  |  **Epic:** Reliability  |  **Type:** Dev
- **Acceptance:** Boundary and duplicate-allocation tests pass.

### HMS-019 - Admin authentication/authorization with hashed passwords (conditional)
- **Story:** As an admin, I want login so only authorised users change records.
- **Requirements:** HMS-FR-014, HMS-NFR-004, HMS-SR-001, HMS-SR-005  |  **Epic:** Security  |  **Type:** Dev
- **Acceptance:** Unauthenticated write requests denied; passwords hashed. Build only if approved (HMS-033), else document as limitation.

### HMS-020 - Performance check on list/search (<= 3 s)
- **Story:** As an admin, I want lists and searches to respond quickly.
- **Requirements:** HMS-NFR-002  |  **Epic:** Performance  |  **Type:** Dev
- **Acceptance:** 10 repeated list/search calls each under 3 s on demo data.

### HMS-021 - Usability polish, responsive layout and Chromium check
- **Story:** As an admin, I want clear labels and a layout that works in Chrome.
- **Requirements:** HMS-NFR-001, HMS-NFR-006  |  **Epic:** UX  |  **Type:** Dev
- **Acceptance:** Core workflows work in current Chromium browser at desktop resolution.

### HMS-022 - Fee amount and payment status (optional extension)
- **Story:** As an admin, I want to record fee amount and Paid/Pending status.
- **Requirements:** HMS-FR-012  |  **Epic:** Optional Extension  |  **Type:** Dev
- **Acceptance:** Only if approved by instructor (HMS-033). Fee status saved and shown correctly.

### HMS-023 - Allocation history per student (optional extension)
- **Story:** As an admin, I want to see past and active allocations of a student.
- **Requirements:** HMS-FR-017  |  **Epic:** Optional Extension  |  **Type:** Dev
- **Acceptance:** Only if approved. Past and active allocations distinguishable.

### HMS-024 - Finalise test data set and test environment
- **Story:** As QA lead, I want sample students/rooms and a documented environment so tests are repeatable.
- **Requirements:** Test Plan: Test Data  |  **Epic:** Testing  |  **Type:** Test
- **Acceptance:** Demo dataset (incl. full-room and boundary cases) and environment steps documented in repo.

### HMS-025 - Design allocation test cases (TC-ALLOC-001..007)
- **Story:** As QA lead, I want test cases for allocate, full room, duplicate, change and vacate.
- **Requirements:** HMS-FR-007..011, HMS-NFR-003  |  **Epic:** Testing  |  **Type:** Test
- **Acceptance:** Cases reviewed with PO; mapped in RTM.

### HMS-026 - Design security, usability, performance and compatibility test cases
- **Story:** As QA lead, I want TC-SEC, TC-UX, TC-NFR, TC-COMP cases covering NFR/SR.
- **Requirements:** HMS-NFR-001/002/004/006, HMS-SR-001..005  |  **Epic:** Testing  |  **Type:** Test
- **Acceptance:** Each NFR/SR has at least one case with measurable pass criteria.

### HMS-027 - Maintain RTM and triage defects
- **Story:** As QA lead, I want RTM kept current and defects triaged with the developer.
- **Requirements:** SRS Sec. 9  |  **Epic:** Testing  |  **Type:** Test
- **Acceptance:** RTM status updated each sprint; defects have severity and owner.

### HMS-028 - Run team usability check (NFR-001)
- **Story:** As QA lead, I want 5 demo users to attempt common tasks.
- **Requirements:** HMS-NFR-001  |  **Epic:** Testing  |  **Type:** Test
- **Acceptance:** At least 4 of 5 users finish tasks unaided; results recorded.

### HMS-029 - Test Summary Report
- **Story:** As QA lead, I want a final report of results, defects and coverage.
- **Requirements:** Test Plan: Deliverables  |  **Epic:** Testing  |  **Type:** Test
- **Acceptance:** Report lists executed cases, pass/fail, open defects and RTM coverage.

### HMS-030 - Design student and validation test cases (TC-STU, TC-ROOM)
- **Story:** As a tester, I want cases for student CRUD/search and room creation/validation.
- **Requirements:** HMS-FR-001..006, HMS-FR-016, HMS-NFR-007  |  **Epic:** Testing  |  **Type:** Test
- **Acceptance:** Positive, negative and boundary cases written with expected results.

### HMS-031 - Design filter and dashboard test cases; write API test scripts
- **Story:** As a tester, I want TC-FILT/TC-DASH cases plus automated API test scripts.
- **Requirements:** HMS-FR-013, HMS-FR-015  |  **Epic:** Testing  |  **Type:** Test
- **Acceptance:** Scripts run from one command; results logged.

### HMS-032 - Execute test cycles, log results and file defects (Sprint 1 and 2)
- **Story:** As a tester, I want to run all cases each sprint and report defects.
- **Requirements:** All planned TCs  |  **Epic:** Testing  |  **Type:** Test
- **Acceptance:** Execution logs and defect reports in repo; regression run before demo.

### HMS-033 - Decide optional scope: login, fee tracking, allocation history
- **Story:** As PO, I want a documented decision with instructor so the MVP scope is fixed.
- **Requirements:** SRS Sec. 1.2, 10  |  **Epic:** Product  |  **Type:** Process
- **Acceptance:** Decision recorded; conditional stories confirmed or dropped before Sprint 1 freeze.

### HMS-034 - Refine backlog and confirm acceptance criteria
- **Story:** As PO, I want priorities and acceptance criteria agreed before sprint start.
- **Requirements:** SRS Sec. 4, 7  |  **Epic:** Product  |  **Type:** Process
- **Acceptance:** Every story has priority, SP and acceptance criteria.

### HMS-035 - Approve API contract and SAD alignment
- **Story:** As PO, I want the SAD API table to match the implemented endpoints.
- **Requirements:** SAD Sec. 5  |  **Epic:** Product  |  **Type:** Process
- **Acceptance:** SAD updated/approved against the code.

### HMS-036 - Sprint reviews and test-result sign-off
- **Story:** As PO, I want to review each sprint and sign off results.
- **Requirements:** Test Plan: Roles  |  **Epic:** Product  |  **Type:** Process
- **Acceptance:** Sprint 1 and 2 review notes and sign-off recorded.

### HMS-037 - Final demo preparation and deviation list
- **Story:** As PO, I want a demo script and a list of unimplemented requirements.
- **Requirements:** SRS Sec. 7  |  **Epic:** Product  |  **Type:** Process
- **Acceptance:** Demo script ready; deviations documented.

## Requirement coverage

All FR-001..017, NFR-001..007 and SR-001..005 map to at least one story above (FR-012/014/017 are conditional on HMS-033).
