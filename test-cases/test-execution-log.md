# HMS Test Execution Log

**Project:** Hostel Management System (HMS)  
**Tester:** Shailaja P.C.  
**Branch:** `test/shailaja-test-plan`  
**Manual execution date recorded:** 26 Oct 2026  
**Additional API verification:** 02 Nov 2026  
**Automated test file:** `backend/tests/api.test.js`  
**Evidence folder:** `docs/evidence/`

## 1. Manual Test Execution

| Test ID | Build / Version | Actual Result | Status | Tester | Date | Evidence |
|---|---|---|---|---|---|---|
| TC-STU-001 | Team development build | Student created and listed successfully. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/04-student-created-success.png) |
| TC-STU-002 | Team development build | Duplicate student ID was rejected. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/07-student-duplicate-id-rejected.png) |
| TC-STU-003 | Team development build | Missing student ID displayed the required-field validation message; record was not saved. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/08-student-required-id-validation.png) |
| TC-STU-004 | Team development build | Existing student was found by searching with student ID. | Pass | Shailaja P.C. | 26 Oct 2026 | [Search by ID](../docs/evidence/10-student-search-by-id.png) |
| TC-STU-005 | Team development build | Application displayed the student-updated confirmation and showed the saved student record. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/13-student-update-success.png) |
| TC-STU-006 | Team development build | Searching with a non-existing student returned no matching record. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/12-student-search-no-match.png) |
| TC-STU-007 | Team development build | Existing student details and allocation history were displayed successfully. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/05-student-details-view.png) |
| TC-ROOM-001 | Team development build | Room was created successfully and appeared in the room list. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/16-room-created-success.png) |
| TC-ROOM-002 | Team development build | Duplicate room number was rejected and the existing room remained unchanged. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/17-room-duplicate-number-rejected.png) |
| TC-ROOM-003 | Team development build | Zero room capacity was rejected with validation. Negative capacity validation was also recorded. | Pass | Shailaja P.C. | 26 Oct 2026 | [Zero Capacity](../docs/evidence/18-room-zero-capacity-validation.png), [Negative Capacity](../docs/evidence/33-room-negative-capacity-validation.png) |
| TC-ROOM-004 | Team development build | Room occupancy was displayed as 0/4, showing all four spaces available. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/19-room-list-empty-occupancy.png) |
| TC-ROOM-005 | Team development build | Required room number validation was displayed when the room number was missing. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/20-room-required-number-validation.png) |
| TC-ROOM-007 | Team development build | After allocating one student, room occupancy increased from 0/4 to 1/4 and available capacity decreased from 4 to 3. | Pass | Shailaja P.C. | 26 Oct 2026 | [Before Allocation](../docs/evidence/19-room-list-empty-occupancy.png), [After Allocation](../docs/evidence/23-room-occupancy-after-allocation.png) |
| TC-FILT-001 | Team development build | Selecting the free-space filter displayed rooms with available capacity. Results updated automatically without an Apply button. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/34-room-filter-with-free-space-results.png) |
| TC-ALLOC-001 | Team development build | Allocation AL001 was successfully created for student HMS-STU-001 in room RC301. Room occupancy increased from 0/4 to 1/4. | Pass | Shailaja P.C. | 26 Oct 2026 | [Active Allocation AL001](../docs/evidence/22-active-allocation-change-room-control.png), [Updated Occupancy](../docs/evidence/23-room-occupancy-after-allocation.png) |
| TC-ALLOC-002 | Team development build | Allocation to a full room was rejected, and the room capacity was not exceeded. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/27-allocation-success-and-full-room-rejection.png) |
| TC-ALLOC-003 | Team development build | Attempt to create another active allocation for a student who already had an active allocation was rejected. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/26-duplicate-active-allocation-rejected.png) |
| TC-ALLOC-004 | Team development build | Change-room workflow was tested and the dashboard reflected the updated allocation information. | Pass | Shailaja P.C. | 26 Oct 2026 | [Change-Room Control](../docs/evidence/22-active-allocation-change-room-control.png), [Dashboard After Change](../docs/evidence/25-dashboard-after-allocation-change.png) |
| TC-ALLOC-005 | Team development build | Allocation was vacated successfully and the dashboard reflected the updated occupancy. | Pass | Shailaja P.C. | 26 Oct 2026 | [Vacated Confirmation](../docs/evidence/37-allocation-vacated-confirmation.png), [Dashboard After Vacating](../docs/evidence/36-dashboard-after-vacating.png) |
| TC-ALLOC-006 | Team development build | The first allocation of HMS-STU-001 to RC303 was successful. The room reached its full capacity of 1/1. A subsequent allocation attempt was rejected with the message "Room RC303 is full". | Pass | Shailaja P.C. | 26 Oct 2026 | [Successful Allocation and Subsequent Full-Room Rejection](../docs/evidence/27-allocation-success-and-full-room-rejection.png) |
| TC-ALLOC-007 | Team development build | Authenticated API request using a nonexistent student ID was rejected with HTTP 404. | Pass | Shailaja P.C. | 02 Nov 2026 | [View Screenshot](../docs/evidence/32-invalid-student-allocation-rejected.png) |
| TC-FILT-002 | Team development build | Selecting the Vacated status displayed vacated allocation records. | Pass | Shailaja P.C. | 26 Oct 2026 | [Vacated Records](../docs/evidence/28-vacated-allocation-records.png), [Room C301 Filter](../docs/evidence/29-vacated-filter-room-C301.png) |
| TC-FILT-003 | Team development build | Combining the Vacated status with room C303 returned no matching records. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/30-vacated-filter-no-match-C303.png) |
| TC-DASH-001 | Team development build | Dashboard displayed the recorded student count of 3. | Pass | Shailaja P.C. | 26 Oct 2026 | [Intermediate Counts](../docs/evidence/24-dashboard-intermediate-counts.png), [Final Counts](../docs/evidence/31-dashboard-final-counts.png) |
| TC-DASH-002 | Team development build | Dashboard displayed the recorded room count of 3. | Pass | Shailaja P.C. | 26 Oct 2026 | [Intermediate Counts](../docs/evidence/24-dashboard-intermediate-counts.png), [Final Counts](../docs/evidence/31-dashboard-final-counts.png) |
| TC-DASH-003 | Team development build | Dashboard displayed total capacity 9, occupied spaces 2, and available spaces 7 for the recorded verification. | Pass | Shailaja P.C. | 26 Oct 2026 | [Intermediate Counts](../docs/evidence/24-dashboard-intermediate-counts.png), [Final Counts](../docs/evidence/31-dashboard-final-counts.png) |
| TC-DASH-004 | Team development build | Dashboard was checked before and after vacating an allocation. Occupancy and available capacity reflected the change. | Pass | Shailaja P.C. | 26 Oct 2026 | [Before Vacating](../docs/evidence/35-dashboard-before-vacating.png), [After Vacating](../docs/evidence/36-dashboard-after-vacating.png) |


## 2. Automated API Test Execution

| Test Suite | Build / Version | Actual Result | Status | Tester | Date | Evidence |
|---|---|---|---|---|---|---|
| Backend API tests (Jest/Supertest) — initial run | Team development build | 38 tests passed, 0 failed. | Pass | Shailaja P.C. | 26 Oct 2026 | `backend/tests/api.test.js` |
| Backend API tests (Jest/Supertest) — updated run | Team development build | Two additional dashboard API test cases were added: empty dashboard summary and dashboard update after vacating an allocation. The updated suite ran with 40 tests passed, 0 failed; 1 suite passed. Jest displayed a force-exit warning after the successful run. | Pass | Shailaja P.C. | 26 Oct 2026 | [`backend/tests/api.test.js`](../backend/tests/api.test.js); commit `73c3ea7` |

## 3. Execution Summary

- **Manual test cases recorded:** 27
- **Manual cases marked Pass:** 27
- **Initial automated API run:** 38 passed, 0 failed.
- **Updated automated API run:** 40 passed, 0 failed, after adding two dashboard test cases.
- **Latest automated suite result:** 1 suite passed; 40 tests passed, 0 failed.
- **Test-run note:** Jest displayed a force-exit warning after the successful test run. This was a warning, not a test failure.
- **Evidence location:** `docs/evidence/`

## 4. Defect Summary

- No defects were observed during the manual test execution recorded in this log.
- Validation scenarios behaved as expected, including duplicate student ID rejection, invalid room capacity rejection, duplicate room rejection, and allocation validation.
- No defect reports were raised based on these test results.

  
