
# Test Execution Report — Hostel Management System

## 1. Execution Details

- **Project:** Hostel Management System
- **Tester:** Shailaja P.C.
- **Test Type:** Automated Backend API Tests and Manual UI Tests
- **Test Framework:** Jest and Supertest
- **Test File:** `backend/tests/api.test.js`
- **Automated Execution Date:** 24 October 2026
- **Manual UI Execution Date:** 25 October 2026
- **Automated Execution Command:** `npm test`
- **Execution Directory:** `backend`

## 2. Execution Summary

| Metric | Result |
|---|---|
| Total automated test suites | 1 |
| Automated test suites passed | 1 |
| Total automated tests | 40 |
| Automated tests passed | 40 |
| Automated tests failed | 0 |
| Snapshots | 0 |
| Reported automated test runtime | Approximately 10.883 seconds |
| Automated test result | PASS |
## 3. Areas Covered

The existing automated test suite reported passing tests for:

- Student operations (HMS-002 to HMS-005)
- Form and server-side validation (HMS-015, HMS-016)
- Room management and availability filtering (HMS-006, HMS-007, HMS-013)
- Room allocation and related validation
- Dashboard summary calculations (HMS-014)
- Fee records and validation (HMS-022)
- Error handling (HMS-017)
- Authentication (HMS-019)
- Performance checks (HMS-020)

The following manual UI scenarios were also executed against the running application.

### 3.1 Student Management

| Test Scenario | Actual Result | Status |
|---|---|---|
| Create a student with valid details | Student record was created and appeared in the student list. | PASS |
| Create a student using a duplicate student ID | Application rejected the duplicate ID and displayed an already-exists message. | PASS |
| Submit the student form without the required student ID | Application displayed “Student ID is required”; the record was not saved. | PASS |
| Search for an existing student by ID | Matching student record was displayed. | PASS |
| Search for an existing student by name | Matching student record was displayed. | PASS |
| Search for a student who does not exist | Application displayed a no-match result. | PASS |
| Update an existing student | Application displayed a successful update message and showed the updated student details. | PASS |

### 3.2 Room Management

| Test Scenario | Actual Result | Status |
|---|---|---|
| Add a room with valid details | Room C301 was created with capacity 4. | PASS |
| Add a room with a duplicate room number | Application rejected the duplicate room number. | PASS |
| Submit a room with capacity 0 | Application displayed a positive whole-number validation message; no room was added. | PASS |
| Verify occupancy of an empty room | C301 showed 0 occupied and 4 free beds before allocation. | PASS |
| Submit the room form without a room number | Required-field validation message was displayed. | Validation observed; confirm save was prevented before marking PASS |
| Filter rooms by “With free space” | Rooms with available capacity were displayed. | PASS |
| Filter rooms by “Full only” when no room was full | No matching rooms were displayed. | PASS |

### 3.3 Allocation Management

| Test Scenario | Actual Result | Status |
|---|---|---|
| Allocate a student to a room with available capacity | Active allocation AL001 was created for the student in room RC301. | PASS |
| Allocate the same student again while an active allocation exists | Application rejected the duplicate active allocation. | PASS |
| Allocate a student to a room that is already full | Application rejected the allocation and displayed a room-full message. | PASS |
| Filter allocations by Vacated status | Only vacated allocations were displayed. | PASS |
| Filter allocations by room and Vacated status with no matching allocation | Application displayed a no-matching-allocations message. | PASS |
| Vacate an active allocation | Allocation status changed as expected and dashboard occupancy values updated. | PASS |

### 3.4 Dashboard Verification

| Test Scenario | Actual Result | Status |
|---|---|---|
| Verify student count after creating student records | Dashboard displayed 3 total students and 3 active students. | PASS |
| Verify room and occupancy summaries after room and allocation changes | Dashboard displayed 3 rooms, 2 rooms with space, 1 full room, total capacity 9, 2 occupied beds and 7 free beds. | PASS |
| Verify dashboard after changing allocation status | Dashboard values changed following the vacate operation. | PASS |

## 4. Defects and Observations

- No failing tests were reported in the recorded automated test run.
- Duplicate student IDs and duplicate room numbers were rejected.
- Student ID and room-capacity validation messages were observed.
- Allocation validation prevented a duplicate active allocation and prevented allocation to a full room.
- Room availability and allocation-status filters returned results consistent with the selected filters.
- Dashboard values were consistent with the observed room capacity and occupancy: 9 total beds = 2 occupied beds + 7 free beds.
- The room-number required-field validation message was observed; confirm that submission was blocked before recording that scenario as PASS.
- Passing these tests does not establish that the entire application is defect-free.
- Test scenarios not listed as executed remain pending until they are run and recorded.

## 5. Evidence

Evidence for the recorded tests consists of:

- Terminal output from the successful `npm test` execution showing 1 suite passed and 38 tests passed.
- Screenshots of student creation, duplicate student ID rejection, search results and student update.
- Screenshots of room creation, duplicate room number rejection, capacity validation and room availability filtering.
- Screenshots of allocation creation, duplicate allocation rejection, full-room rejection and allocation-status filtering.
- Screenshots of dashboard values before and after allocation changes.

Retain the screenshots with the project submission or in the team's designated test-evidence location. Add a GitHub issue link for any failure if a defect is identified.

## 6. Current Status

- Automated backend test run: Completed — PASS (38/38 tests).
- Manual student-management scenarios listed in this report: Completed — PASS.
- Manual room-management scenarios listed in this report: Completed, with room-number required-field submission outcome to confirm.
- Manual allocation scenarios listed in this report: Completed — PASS.
- Manual dashboard verification listed in this report: Completed — PASS.
- Remaining planned test cases not executed in the recorded sessions: Pending.
- API coverage review for HMS-031: To be checked against the implemented API and existing `backend/tests/api.test.js`.
- Regression testing after any defect fixes: Pending, if applicable.










