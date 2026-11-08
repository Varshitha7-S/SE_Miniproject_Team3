# Test Execution Report — Hostel Management System

## 1. Execution Details

- **Project:** Hostel Management System
- **Tester:** Shailaja P.C.
- **Test Type:** Automated Backend API Tests and Manual UI Tests
- **Test Framework:** Jest and Supertest
- **Test File:** `backend/tests/api.test.js`
- **Automated Execution Date:** 26 October 2026
- **Manual UI Execution Date:** 26 October 2026
- **Additional API Negative Test Date:** 02 November 2026
- **Automated Execution Command:** `npm test`
- **Execution Directory:** `backend`
- **Test Environment:** Jest, Node.js test environment, Supertest and MongoDB Memory Server.
- **Reported Automated Test-Suite Runtime:** Approximately 14.785 seconds.

**Runtime clarification:** The 14.785-second value is the total Jest suite runtime, not an individual API response time. The exact Node.js version and operating system are not established by the repository files.

## 2. Execution Summary

| Metric | Result |
|---|---:|
| Total automated test suites | 1 |
| Automated test suites passed | 1 |
| Total automated tests | 40 |
| Automated tests passed | 40 |
| Automated tests failed | 0 |
| Snapshots | 0 |
| Total automated test-suite runtime | Approximately 14.785 seconds |
| Automated test result | PASS |

The initial automated execution contained 38 passing tests. Two dashboard tests were subsequently added. The later verified execution completed with 40 passing tests and no failures.

## 3. Areas Covered

The automated test suite reported passing tests for:

- Student operations (HMS-002 to HMS-005).
- Form and server-side validation (HMS-015 and HMS-016).
- Room management and availability filtering (HMS-006, HMS-007 and HMS-013).
- Room allocation and related validation.
- Dashboard summary calculations (HMS-014).
- Fee records and validation (HMS-022).
- Error handling (HMS-017).
- Authentication-related operations (HMS-019).
- Performance checks (HMS-020), linked to HMS-NFR-002 and TC-NFR-001.

The following manual UI scenarios were also executed against the running application.

### 3.1 Student Management

| Test Scenario | Actual Result | Status |
|---|---|---|
| Create a student with valid details | Student record was created and appeared in the student list. | PASS |
| Create a student using a duplicate student ID | Application rejected the duplicate ID and displayed an already-exists message. | PASS |
| Submit the student form without the required student ID | Application displayed "Student ID is required"; the record was not saved. | PASS |
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
| Submit the room form without a room number | Required-field validation was displayed, submission was prevented, and no room record was saved. | PASS |
| Filter rooms by "With free space" | Rooms with available capacity were displayed. | PASS |
| Filter rooms by "Full only" when no room was full | No matching rooms were displayed. | PASS |

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

## 4. Performance Test — TC-NFR-001

**Requirement:** HMS-NFR-002 — Common list/search operations should complete within three seconds in the agreed test environment.

**Automated Test Group:** `Performance (HMS-020)`

**Test File:** `backend/tests/api.test.js`

**Execution Date:** 26 October 2026

### Test Implementation

The automated performance test:

1. Inserts 500 student records and 100 room records into the test database.
2. Sends 10 requests to each of the following five endpoints:
   - `GET /api/students`
   - `GET /api/students?search=Student 42`
   - `GET /api/rooms`
   - `GET /api/allocations`
   - `GET /api/dashboard`
3. Measures each request duration using `Date.now()`.
4. Asserts that every request completes in less than 3000 milliseconds.

**Total Requests:** 50 (10 requests to each of five endpoints).

**Actual Result:** All performance assertions passed in the verified 40-test automated execution. Every measured request satisfied the under-3000-millisecond assertion.

**Status:** PASS

**Evidence:**
- Automated performance test implementation in `backend/tests/api.test.js`, under `Performance (HMS-020)`.
- Successful Jest execution showing 1 suite passed, 40 tests passed and 0 tests failed.

**Measurement Limitation:** The test code checks each request against the three-second threshold but does not save or print individual response-time values. The 14.785-second value is the total Jest suite runtime, not an individual endpoint response time.

## 5. Additional API Negative Test — TC-ALLOC-007

**Execution Date:** 02 November 2026

**Test Type:** Authenticated Backend API Negative Test

**Result:** PASS

**Evidence:** [Invalid Student Allocation Rejected](evidence/32-invalid-student-allocation-rejected.png)

### Request Details

- **Method:** `POST`
- **Endpoint:** `/api/allocations`
- **Student ID:** `NO-SUCH-STU-999`
- **Room ID:** `RC303`

### Actual Result

An authenticated API request was submitted using a nonexistent student ID and an existing room ID.

The API returned:

- **HTTP Status:** `404`
- **Response:** `Student NO-SUCH-STU-999 not found`

The invalid allocation was rejected. No allocation was created for the nonexistent student.

This was an API-level negative test, not a frontend dropdown test.

## 6. Defects and Observations

- No failed tests were reported in the verified 40-test automated execution.
- Duplicate student IDs and duplicate room numbers were rejected.
- Student ID and room-capacity validation messages were observed.
- Zero and negative room capacities were rejected.
- The room-number required-field validation prevented submission, and no room record was saved.
- Allocation validation prevented duplicate active allocations and allocations to full rooms.
- Room availability and allocation-status filters returned results consistent with the selected filters.
- Dashboard values were consistent with the observed room capacity and occupancy.
- The authenticated API request using a nonexistent student ID was rejected with HTTP 404.
- The performance test enforced the three-second threshold for each tested request, but individual timings were not persisted.
- Passing these tests does not establish that the entire application is defect-free.
- Test scenarios not listed as executed remain pending until they are run and recorded.

## 7. Evidence

Evidence for the recorded tests is stored in `docs/evidence/`.

The evidence includes:

- Automated Jest execution showing one test suite passed and 40 tests passed.
- Screenshots of student creation, duplicate student ID rejection, search results and student update.
- Screenshots of room creation, duplicate room number rejection, capacity validation and room availability filtering.
- Screenshot 20 — room-number required-field validation.
- Screenshot 32 — invalid student allocation rejected by the authenticated API.
- Screenshot 33 — negative room capacity validation.
- Screenshot 34 — room filter displaying rooms with free space.
- Screenshot 35 — dashboard values before vacating an allocation.
- Screenshot 36 — dashboard values after vacating an allocation.
- Screenshot 37 — allocation-vacated confirmation.
- Additional screenshots showing allocation-status filtering and no-match results.

Relevant evidence files include:

- `docs/evidence/04-student-created-success.png`
- `docs/evidence/07-student-duplicate-id-rejected.png`
- `docs/evidence/10-student-search-by-id.png`
- `docs/evidence/11-student-search-by-name.png`
- `docs/evidence/13-student-update-success.png`
- `docs/evidence/18-room-zero-capacity-validation.png`
- `docs/evidence/20-room-required-number-validation.png`
- `docs/evidence/32-invalid-student-allocation-rejected.png`
- `docs/evidence/33-room-negative-capacity-validation.png`
- `docs/evidence/34-room-filter-with-free-space-results.png`
- `docs/evidence/35-dashboard-before-vacating.png`
- `docs/evidence/36-dashboard-after-vacating.png`
- `docs/evidence/37-allocation-vacated-confirmation.png`

## 8. Current Status

- Automated backend test run: Completed — PASS (40/40 tests).
- Manual UI test execution: Completed — PASS (26/26 test cases).
- Additional authenticated API negative test: Completed — PASS (02 November 2026).
- TC-ROOM-005: Completed — PASS; empty room-number submission was prevented and no room record was saved.
- TC-NFR-001: Automated performance test executed and passed its under-three-second assertions.
- HMS-NFR-001 usability testing: Planned; results from PR #44 are to be incorporated after branch integration.
- Other planned test cases not executed in the recorded sessions: Pending.
- Regression testing after any defect fixes: Pending, if applicable.
