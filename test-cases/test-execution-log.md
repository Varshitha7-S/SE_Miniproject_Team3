# HMS Test Execution Log

**Project:** Hostel Management System  
**Tester:** Shailaja P.C.  
**Branch:** `test/shailaja-test-plan`  
**Build / Version:** Team development build  
**Manual Test Execution Date:** 26 Oct 2026  
**Automated Test Execution Date:** 26 Oct 2026  
**Additional API Negative Test Date:** 02 Nov 2026  
**Evidence Folder:** `docs/evidence/`  
**Automated Test File:** `backend/tests/api.test.js`

## 1. Manual UI Test Execution

| Test ID | Build / Version | Actual Result | Status | Tester | Date | Evidence |
|---|---|---|---|---|---|---|
| TC-STU-001 | Team development build | Student created and listed successfully. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/04-student-created-success.png) |
| TC-STU-002 | Team development build | Duplicate student ID was rejected. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/07-student-duplicate-id-rejected.png) |
| TC-STU-003 | Team development build | Missing student ID displayed the required-field validation message; record was not saved. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/08-student-required-id-validation.png) |
| TC-STU-004 | Team development build | Existing student was found by searching with student ID. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/10-student-search-by-id.png) |
| TC-STU-005 | Team development build | Application displayed the student-updated confirmation and showed the saved student record. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/13-student-update-success.png) |
| TC-STU-006 | Team development build | Searching with a non-existing student returned no matching record. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/12-student-search-no-match.png) |
| TC-STU-007 | Team development build | Existing student details were displayed successfully. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/05-student-details-view.png) |
| TC-ROOM-001 | Team development build | Room was created successfully and appeared in the room list. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/16-room-created-success.png) |
| TC-ROOM-002 | Team development build | Duplicate room number was rejected and the existing room remained unchanged. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/17-room-duplicate-number-rejected.png) |
| TC-ROOM-003 | Team development build | Capacity values 0 and -1 were rejected with validation. Neither invalid room capacity was accepted. | Pass | Shailaja P.C. | 26 Oct 2026 | [Zero Capacity](../docs/evidence/18-room-zero-capacity-validation.png), [Negative Capacity](../docs/evidence/33-room-negative-capacity-validation.png) |
| TC-ROOM-004 | Team development build | Empty room occupancy was displayed as 0/4. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/19-room-list-empty-occupancy.png) |
| TC-ROOM-005 | Team development build | Required room-number validation was displayed when the field was left empty. Submission was prevented and no room record was saved. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/20-room-required-number-validation.png) |
| TC-ROOM-007 | Team development build | RC301 occupancy increased from 0/4 to 1/4 after allocation. Available capacity decreased from 4 to 3. | Pass | Shailaja P.C. | 26 Oct 2026 | [Before Allocation](../docs/evidence/19-room-list-empty-occupancy.png), [After Allocation](../docs/evidence/23-room-occupancy-after-allocation.png) |
| TC-FILT-001 | Team development build | Selecting the free-space filter automatically displayed rooms with available capacity. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/34-room-filter-with-free-space-results.png) |
| TC-ALLOC-001 | Team development build | Allocation AL001 was successfully created for HMS-STU-001 in RC301. Occupancy increased from 0/4 to 1/4 and available capacity decreased from 4 to 3. | Pass | Shailaja P.C. | 26 Oct 2026 | [Allocation AL001](../docs/evidence/22-active-allocation-change-room-control.png), [Updated Occupancy](../docs/evidence/23-room-occupancy-after-allocation.png) |
| TC-ALLOC-002 | Team development build | Allocation to a full room was rejected. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/27-allocation-success-and-full-room-rejection.png) |
| TC-ALLOC-003 | Team development build | Attempt to create another active allocation for a student who already had an active allocation was rejected. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/26-duplicate-active-allocation-rejected.png) |
| TC-ALLOC-004 | Team development build | Change-room workflow was tested and the dashboard reflected the updated allocation information. | Pass | Shailaja P.C. | 26 Oct 2026 | [Change-Room Control](../docs/evidence/22-active-allocation-change-room-control.png), [Dashboard After Change](../docs/evidence/25-dashboard-after-allocation-change.png) |
| TC-ALLOC-005 | Team development build | Allocation was vacated successfully and the dashboard reflected the updated occupancy. | Pass | Shailaja P.C. | 26 Oct 2026 | [Vacated Confirmation](../docs/evidence/37-allocation-vacated-confirmation.png), [Dashboard After Vacating](../docs/evidence/36-dashboard-after-vacating.png) |
| TC-ALLOC-006 | Team development build | First allocation of HMS-STU-001 to RC303 succeeded, filling the room to 1/1. The subsequent allocation was rejected with the message "Room RC303 is full". | Pass | Shailaja P.C. | 26 Oct 2026 | [Successful Allocation and Subsequent Rejection](../docs/evidence/27-allocation-success-and-full-room-rejection.png) |
| TC-FILT-002 | Team development build | Selecting the Vacated status displayed vacated allocation records. | Pass | Shailaja P.C. | 26 Oct 2026 | [Vacated Records](../docs/evidence/28-vacated-allocation-records.png), [Room C301 Filter](../docs/evidence/29-vacated-filter-room-C301.png) |
| TC-FILT-003 | Team development build | Combining Vacated status with room C303 returned no matching records. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/30-vacated-filter-no-match-C303.png) |
| TC-DASH-001 | Team development build | Dashboard displayed the recorded student count of 3. | Pass | Shailaja P.C. | 26 Oct 2026 | [Intermediate Counts](../docs/evidence/24-dashboard-intermediate-counts.png), [Final Counts](../docs/evidence/31-dashboard-final-counts.png) |
| TC-DASH-002 | Team development build | Dashboard displayed the recorded room count of 3. | Pass | Shailaja P.C. | 26 Oct 2026 | [Intermediate Counts](../docs/evidence/24-dashboard-intermediate-counts.png), [Final Counts](../docs/evidence/31-dashboard-final-counts.png) |
| TC-DASH-003 | Team development build | Dashboard displayed total capacity 9, occupied spaces 2, and available spaces 7 for the recorded verification. | Pass | Shailaja P.C. | 26 Oct 2026 | [Intermediate Counts](../docs/evidence/24-dashboard-intermediate-counts.png), [Final Counts](../docs/evidence/31-dashboard-final-counts.png) |
| TC-DASH-004 | Team development build | After vacating an allocation, occupied spaces decreased from 1 to 0, free spaces increased from 12 to 13, and total capacity remained 13. | Pass | Shailaja P.C. | 26 Oct 2026 | [Allocation Vacated](../docs/evidence/37-allocation-vacated-confirmation.png), [Before Vacating](../docs/evidence/35-dashboard-before-vacating.png), [After Vacating](../docs/evidence/36-dashboard-after-vacating.png) |

**Total Manual UI Test Cases:** 26  
**Passed:** 26  
**Failed:** 0

## 2. Additional API Negative Test — TC-ALLOC-007

**Execution Date:** 02 Nov 2026  
**Test Type:** Authenticated Backend API Negative Test  
**Result:** Pass

**Evidence:** [Invalid Student Allocation Rejected](../docs/evidence/32-invalid-student-allocation-rejected.png)

### Request Details

- Method: `POST`
- Endpoint: `/api/allocations`
- Student ID: `NO-SUCH-STU-999`
- Room ID: `RC303`

### Actual Result

An authenticated API request was submitted using a nonexistent student ID and an existing room ID.

The API returned:

- HTTP Status: `404`
- Response: `Student NO-SUCH-STU-999 not found`

The invalid allocation was rejected. No allocation was created for the nonexistent student.

**Note:** This was an API-level negative test, not a frontend dropdown test. It is recorded separately and is not included in the manual UI test-case count.

## 3. Automated API Test Execution

**Test File:** `backend/tests/api.test.js`  
**Execution Date:** 26 Oct 2026  
**Command:** `npm test`  
**Execution Directory:** `backend`

| Metric | Result |
|---|---:|
| Test Suites Passed | 1 |
| Tests Passed | 40 |
| Tests Failed | 0 |
| Total Test-Suite Runtime | Approximately 14.785 seconds |

The automated backend API test execution completed with 40 passing tests and no failures. A force-exit warning was observed after execution.

### Automated Test Progress

- Initial automated execution: 38 tests passed.
- Two dashboard tests were added.
- Subsequent verified execution: 40 tests passed.

## 4. Performance Test Execution — TC-NFR-001

**Requirement:** HMS-NFR-002  
**Automated Test Group:** `Performance (HMS-020)`  
**Test File:** `backend/tests/api.test.js`  
**Execution Date:** 26 Oct 2026  
**Status:** Pass

### Test Implementation

The automated performance test:

1. Inserts 500 student records and 100 room records into the test database.
2. Sends 10 requests to each of the following endpoints:
   - `GET /api/students`
   - `GET /api/students?search=Student 42`
   - `GET /api/rooms`
   - `GET /api/allocations`
   - `GET /api/dashboard`
3. Measures each request duration using `Date.now()`.
4. Asserts that every request completes in less than 3000 milliseconds.

**Total Requests:** 50.

### Actual Result

All performance assertions passed during the verified 40-test execution. Each measured request satisfied the under-3000-millisecond assertion.

### Evidence and Measurement Limitation

The supporting evidence is the automated performance test implementation in `backend/tests/api.test.js` and the successful 40-test Jest execution.

The test code does not save or print individual response-time values. The 14.785-second value is the total Jest suite runtime, not an individual API response time.

## 5. Dashboard Verification

The dashboard verification covered:

- Student count.
- Room count.
- Total room capacity.
- Occupied spaces.
- Available spaces.
- Dashboard updates after allocation changes.

The recorded dashboard values for the corresponding verification were:

| Metric | Value |
|---|---:|
| Students | 3 |
| Rooms | 3 |
| Total Capacity | 9 |
| Occupied Spaces | 2 |
| Available Spaces | 7 |

### Dashboard After Vacating an Allocation

**Before vacating:**

| Metric | Value |
|---|---:|
| Occupied Spaces | 1 |
| Free Spaces | 12 |
| Total Capacity | 13 |

**After vacating:**

| Metric | Value |
|---|---:|
| Occupied Spaces | 0 |
| Free Spaces | 13 |
| Total Capacity | 13 |

Evidence:
- [Allocation Vacated Confirmation](../docs/evidence/37-allocation-vacated-confirmation.png)
- [Dashboard Before Vacating](../docs/evidence/35-dashboard-before-vacating.png)
- [Dashboard After Vacating](../docs/evidence/36-dashboard-after-vacating.png)

**Traceability Note:** This automated API performance check is recorded as an executed supplementary performance test. It does not replace the formal ten-operation measurement procedure specified in `quality-test-cases.md` for TC-NFR-001. The formal test-case result remains pending until the required individual timings and environment details are recorded.

## 6. Defect Summary

No failed test cases were recorded in the execution results.

## 7. Overall Execution Summary

| Category | Total | Passed | Failed |
|---|---:|---:|---:|
| Manual UI Test Cases | 26 | 26 | 0 |
| Automated API Tests | 40 | 40 | 0 |
| Additional API Negative Test | 1 | 1 | 0 |

The additional API negative test is a separately recorded execution of TC-ALLOC-007 and is not included in the 26 manual UI test-case count.

## 8. Execution Notes

- TC-ROOM-003 records rejection of both zero and negative room capacities.
- TC-ROOM-005 records required-field validation, prevented submission, and confirmation that no room record was saved.
- TC-ROOM-007 records RC301 occupancy increasing from 0/4 to 1/4 and available capacity decreasing from 4 to 3.
- TC-ALLOC-001 records successful creation of AL001 for HMS-STU-001 in RC301 and the corresponding occupancy increase.
- TC-ALLOC-006 records successful first allocation to RC303, the room reaching 1/1 capacity, and rejection of the subsequent allocation.
- TC-FILT-001 uses automatic filter application; no Apply button is required.
- TC-DASH-004 records dashboard values before and after vacating an allocation.
- TC-ALLOC-007 was verified through an authenticated backend API request on 02 November 2026.
- TC-NFR-001 is linked to the automated performance test group `Performance (HMS-020)`.
- Screenshot evidence is stored in `docs/evidence/`.
