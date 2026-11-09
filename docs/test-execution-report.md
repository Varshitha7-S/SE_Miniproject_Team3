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
- Supplementary performance checks (HMS-020).

The following manual UI scenarios were also executed against the running application.

### 3.1 Student Management

| Test Scenario | Actual Result | Status |
|---|---|---|
| TC-STU-001 — Create a student with valid details | Student record was created and appeared in the student list. | PASS |
| TC-STU-002 — Create a student using a duplicate student ID | Application rejected the duplicate ID and displayed an already-exists message. | PASS |
| TC-STU-003 — Submit the student form without the required student ID | Application displayed "Student ID is required"; the record was not saved. | PASS |
| TC-STU-004 — Search for an existing student by ID | Matching student record was displayed. | PASS |
| TC-STU-005 — Update an existing student | Application displayed a successful update message and showed the updated student details. | PASS |
| TC-STU-006 — Search for a student who does not exist | Application displayed a no-match result. | PASS |
| TC-STU-007 — View existing student details | Existing student details were displayed successfully. | PASS |

### 3.2 Room Management

| Test Scenario | Actual Result | Status |
|---|---|---|
| TC-ROOM-001 — Add a room with valid details | Room C301 was created with capacity 4. | PASS |
| TC-ROOM-002 — Add a room with a duplicate room number | Application rejected the duplicate room number. | PASS |
| TC-ROOM-003 — Submit room with capacity 0 and -1 | Both zero and negative capacity values were rejected with the positive whole-number validation message. | PASS |
| TC-ROOM-004 — Verify occupancy of an empty room | C301 showed 0 occupied and 4 free beds before allocation. | PASS |
| TC-ROOM-005 — Submit the room form without a room number | The application displayed the "Room number is required" validation message and prevented room creation. After submission, I checked the room list and verified that no new room record had been created. | PASS |
| TC-ROOM-007 — Verify room occupancy after allocation | RC301 occupancy increased from 0/4 to 1/4 after allocation. Available capacity decreased from 4 to 3. | PASS |
| TC-FILT-001 — Filter rooms by "With free space" | Rooms with available capacity were displayed. | PASS |

### 3.3 Allocation Management

| Test Scenario | Actual Result | Status |
|---|---|---|
| TC-ALLOC-001 — Allocate a student to a room with available capacity | Active allocation AL001 was created for the student in room RC301. | PASS |
| TC-ALLOC-002 — Allocate a student to a room that is already full | Application rejected the allocation and displayed a room-full message. | PASS |
| TC-ALLOC-003 — Allocate the same student again while an active allocation exists | Application rejected the duplicate active allocation. | PASS |
| TC-ALLOC-004 — Change-room workflow | The change-room control was available for active allocation AL001. The recorded workflow was followed by an updated dashboard summary. | PASS |
| TC-ALLOC-005 — Vacate an active allocation | Allocation status changed as expected and dashboard occupancy values updated. | PASS |
| TC-ALLOC-006 — Verify allocation at room capacity boundary | The first allocation to RC303 succeeded and filled the room to 1/1. A subsequent allocation was rejected with the message "Room RC303 is full". | PASS |
| TC-FILT-002 — Filter allocations by Vacated status | Only vacated allocations were displayed. | PASS |
| TC-FILT-003 — Filter allocations by room and Vacated status with no matching allocation | Application displayed a no-matching-allocations message. | PASS |

### 3.4 Dashboard Verification

| Test Scenario | Actual Result | Status |
|---|---|---|
| TC-DASH-001 — Verify student count after creating student records | Dashboard displayed 3 total students and 3 active students. | PASS |
| TC-DASH-002 — Verify room count | Dashboard displayed 3 rooms. | PASS |
| TC-DASH-003 — Verify room capacity and occupancy | Dashboard displayed total capacity 9, occupied spaces 2 and available spaces 7. | PASS |
| TC-DASH-004 — Verify dashboard after changing allocation status | After vacating an allocation, occupied spaces decreased from 1 to 0, free spaces increased from 12 to 13, and total capacity remained 13. | PASS |

## 4. Supplementary Automated Performance Check — HMS-020

**Requirement:** HMS-NFR-002  
**Automated Test Group:** `Performance (HMS-020)`  
**Test File:** `backend/tests/api.test.js`  
**Execution Date:** 26 October 2026

### Test Implementation

The supplementary automated performance check:

1. Inserts 500 student records and 100 room records into the test database.
2. Sends 10 requests to each of the following five endpoints:
   - `GET /api/students`
   - `GET /api/students?search=Student 42`
   - `GET /api/rooms`
   - `GET /api/allocations`
   - `GET /api/dashboard`
3. Measures each request duration using `Date.now()`.
4. Asserts that every request completes in less than 3000 milliseconds.

**Total Requests:** 50.

**Actual Result:** All performance assertions passed during the verified 40-test automated execution. Every measured request satisfied the under-3000-millisecond assertion.

**Status:** PASS — supplementary automated HMS-020 check.

**Evidence:**
- Automated performance test implementation in `backend/tests/api.test.js`, under `Performance (HMS-020)`.
- Successful Jest execution showing 1 suite passed, 40 tests passed and 0 tests failed.

**Measurement Limitation:** Individual response-time values are not saved or printed by the test code. The approximately 14.785-second value represents the total Jest suite runtime, not an individual API response time.

### Formal Test Case TC-NFR-001 — Pending

The formal TC-NFR-001 procedure in `quality-test-cases.md` requires ten measured list/search operations, individual timing records, and test-environment details.

The supplementary automated HMS-020 check does not replace this formal procedure.

**Status:** PENDING — formal TC-NFR-001 measurement and evidence have not yet been completed.

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
- TC-ROOM-005: Required-field validation prevented room creation. A subsequent check of the room list confirmed that no new room record was created.
- Allocation validation prevented duplicate active allocations and allocations to full rooms.
- Room availability and allocation-status filters returned results consistent with the selected filters.
- Dashboard values were consistent with the observed room capacity and occupancy.
- The authenticated API request using a nonexistent student ID was rejected with HTTP 404.
- The supplementary performance check enforced the three-second threshold for each tested request, but individual timings were not persisted.
- Passing these tests does not establish that the entire application is defect-free.
- Test scenarios not listed as executed remain pending until they are run and recorded.

## 7. Evidence

Evidence for the recorded tests is stored in `docs/evidence/`.

The evidence includes:

- Automated Jest execution showing one test suite passed and 40 tests passed.
- Screenshots of student creation, duplicate student ID rejection, search results and student update.
- Screenshots of room creation, duplicate room number rejection, capacity validation and room availability filtering.
- Screenshot 20 — room-number required-field validation.
- Screenshot 22 — active allocation change-room control.
- Screenshot 25 — dashboard after allocation change.
- Screenshot 27 — allocation success and full-room rejection.
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
- `docs/evidence/19-room-list-empty-occupancy.png`
- `docs/evidence/20-room-required-number-validation.png`
- `docs/evidence/22-active-allocation-change-room-control.png`
- `docs/evidence/23-room-occupancy-after-allocation.png`
- `docs/evidence/25-dashboard-after-allocation-change.png`
- `docs/evidence/27-allocation-success-and-full-room-rejection.png`
- `docs/evidence/28-vacated-allocation-records.png`
- `docs/evidence/29-vacated-filter-room-C301.png`
- `docs/evidence/30-vacated-filter-no-match-C303.png`
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
- TC-ROOM-005: Completed — PASS; required-field validation prevented room creation, and a subsequent room-list check confirmed that no new room record was created.
- Supplementary automated HMS-020 performance check: Completed — PASS.
- Formal TC-NFR-001: Pending — required ten-operation measurements and individual timing evidence have not yet been completed.
- HMS-NFR-001 usability testing: Planned; results from PR #44 are to be incorporated after branch integration.
- Other planned test cases not executed in the recorded sessions: Pending.
- Regression testing after any defect fixes: Pending, if applicable.
