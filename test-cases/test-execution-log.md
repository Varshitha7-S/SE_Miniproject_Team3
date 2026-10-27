# HMS Test Execution Log

**Project:** Hostel Management System (HMS)  
**Tester:** Shailaja P.C.  
**Branch:** `test/shailaja-test-plan`  
**Manual execution date recorded:** 26 Oct 2026  
**Automated test file:** `backend/tests/api.test.js`  
**Evidence folder:** `docs/evidence/`

## 1. Manual Test Execution

| Test ID | Build / Version | Actual Result | Status | Tester | Date | Evidence |
|---|---|---|---|---|---|---|
| TC-STU-001 | Team development build | Student created and listed successfully. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/03-student-list-after-creation.png) |
| TC-STU-002 | Team development build | Duplicate student ID was rejected. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/07-student-duplicate-id-validation.png) |
| TC-STU-003 | Team development build | Missing student ID displayed the required-field validation message; record was not saved. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/06-student-validation-error.png) |
| TC-STU-004 | Team development build | Existing student was found by searching with student ID. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/09-student-search-existing-by-id.png) |
| TC-STU-005 | Team development build | Search by student name was tested successfully. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/08-student-details-and-search-section.png) |
| TC-STU-006 | Team development build | No-match student search displayed no matching result. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/10-student-search-no-match.png) |
| TC-STU-007 | Team development build | Existing student details were updated successfully. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/11-student-details-after-edit.png) |
| TC-ROOM-001 | Team development build | Room C301 was added with capacity 4. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/14-room-created-list.png) |
| TC-ROOM-002 | Team development build | Duplicate room number C301 was rejected. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/17-room-duplicate-number-validation.png) |
| TC-ROOM-003 | Team development build | Capacity 0 was rejected with a positive-whole-number validation message; room was not added. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/15-room-capacity-validation-error.png) |
| TC-ROOM-004 | Team development build | Room occupancy and free-space information was displayed; C301 showed 0/4 occupancy. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/16-room-list-capacity-and-occupancy.png) |
| TC-ROOM-005 | Team development build | Required room-number validation message was displayed and the form did not submit. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/13-room-add-form.png) |
| TC-FILT-001 | Team development build | “With free space” filter displayed rooms with available capacity. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/12-room-filter-options.png) |
| TC-ALLOC-001 | Team development build | Active allocation AL001 for student HMS-STU-001 in room RC301 was displayed successfully. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/19-allocation-active-record-change-room-controls.png) |
| TC-ALLOC-002 | Team development build | An additional allocation to full room RC303 was rejected with a room-full validation message. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/24-allocation-room-full-validation.png) |
| TC-ALLOC-003 | Team development build | Duplicate active allocation for the same student was rejected. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/23-allocation-duplicate-or-invalid-validation.png) |
| TC-ALLOC-004 | Team development build | Change-room workflow was tested successfully. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/19-allocation-active-record-change-room-controls.png) |
| TC-ALLOC-005 | Team development build | Allocation was marked vacated successfully and the dashboard updated. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/28-dashboard-after-vacating-allocation.png) |
| TC-ALLOC-006 | Team development build | Room RC303 with capacity 1 became full; an additional allocation was rejected. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/24-allocation-room-full-validation.png) |
| TC-ALLOC-007 | Team development build | Invalid student/room allocation validation was tested; invalid allocation was rejected. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/30-allocation-form-validation-state.png) |
| TC-FILT-002 | Team development build | “Vacated” filter displayed vacated allocations. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/25-allocation-vacated-filter-results.png) |
| TC-FILT-003 | Team development build | Combining room RC303 with Vacated status displayed a no-match result. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/27-allocation-vacated-filter-no-match.png) |
| TC-DASH-001 | Team development build | Dashboard displayed 3 students. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/22-dashboard-updated-counts.png) |
| TC-DASH-002 | Team development build | Dashboard displayed 3 rooms. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/22-dashboard-updated-counts.png) |
| TC-DASH-003 | Team development build | Dashboard showed capacity 9, occupied 2, and free 7; totals were internally consistent. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/22-dashboard-updated-counts.png) |
| TC-DASH-004 | Team development build | Dashboard counts updated after an allocation was vacated. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/28-dashboard-after-vacating-allocation.png) |

## 2. Automated API Test Execution

| Test Suite | Build / Version | Actual Result | Status | Tester | Date | Evidence |
|---|---|---|---|---|---|---|
| Backend API tests (Jest/Supertest) | Team development build | 40 tests passed; 0 failed; 1 suite passed. Jest displayed a force-exit warning after the successful run. | Pass | Shailaja P.C. | 26 Oct 2026 | [`backend/tests/api.test.js`](../backend/tests/api.test.js); commit `73c3ea7` |

## 3. Execution Summary

- **Manual test cases recorded:** 26
- **Manual cases marked Pass:** 26
- **Automated API tests:** 40 passed, 0 failed
- **Test-run note:** Jest displayed a force-exit warning after the passing test run; this was a warning, not a test failure.
- **Evidence location:** `docs/evidence/`

## 4. Defect Summary

- No defects were observed during the manual test execution recorded in this log.
- Validation scenarios behaved as expected, including duplicate student ID rejection, invalid room capacity rejection, duplicate room rejection, and allocation validation.
- No defect reports were raised based on these test results.
