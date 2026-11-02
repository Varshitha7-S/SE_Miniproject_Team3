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
| TC-STU-004 | Team development build | Existing student was found by searching with student ID and student name. | Pass | Shailaja P.C. | 26 Oct 2026 | [Search by ID](../docs/evidence/10-student-search-by-id.png); [Search by name](../docs/evidence/11-student-search-by-name.png) |
| TC-STU-005 | Team development build | The application displayed the "Student updated" confirmation and showed the saved student record with phone value 9876543210. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/13-student-update-success.png) |
| TC-STU-006 | Team development build | Searching for NO-SUCH-STU-999 displayed a no-match message and no student record. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/12-student-search-no-match.png) |
| TC-STU-007 | Team development build | The selected student's stored details were displayed in the details panel and could be reviewed. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/05-student-details-view.png) |
| TC-ROOM-001 | Team development build | Room C301 was added successfully with a capacity of 4. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/16-room-created-success.png) |
| TC-ROOM-002 | Team development build | Duplicate room number C301 was rejected. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/17-room-duplicate-number-rejected.png) |
| TC-ROOM-003 | Team development build | Capacity 0 was rejected with the message "Capacity must be a positive whole number". The negative-capacity check was also performed and rejected. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot — zero capacity](../docs/evidence/18-room-zero-capacity-validation.png) |
| TC-ROOM-004 | Team development build | Room C301 displayed occupancy 0/4, showing four available spaces. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/19-room-list-empty-occupancy.png) |
| TC-ROOM-005 | Team development build | Required room-number validation message was displayed and the form did not submit. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/20-room-required-number-validation.png) |
| TC-ROOM-007 | Team development build | After allocation, room occupancy and available capacity were checked and reflected the allocation. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/23-room-occupancy-after-allocation.png) |
| TC-FILT-001 | Team development build | The room page offered the "With free space" filter, and rooms with available capacity were displayed. | Pass | Shailaja P.C. | 26 Oct 2026 | [Filter options](../docs/evidence/14-room-availability-filter-options.png); [Room availability](../docs/evidence/19-room-list-empty-occupancy.png) |
| TC-ALLOC-001 | Team development build | Active allocation AL001 for student HMS-STU-001 in room RC301 was displayed successfully. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/22-active-allocation-change-room-control.png) |
| TC-ALLOC-002 | Team development build | An additional allocation to full room RC303 was rejected with a room-full validation message. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/27-allocation-success-and-full-room-rejection.png) |
| TC-ALLOC-003 | Team development build | A duplicate active allocation for student HMS-STU-001 was rejected because the student already had an active allocation in room RC301. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/26-duplicate-active-allocation-rejected.png) |
| TC-ALLOC-004 | Team development build | The change-room workflow was performed and the resulting allocation records and room occupancy were checked. | Pass | Shailaja P.C. | 26 Oct 2026 | [Active allocation controls](../docs/evidence/22-active-allocation-change-room-control.png); [Room occupancy after allocation](../docs/evidence/23-room-occupancy-after-allocation.png) |
| TC-ALLOC-005 | Team development build | Allocation was marked vacated successfully, and the vacated records and dashboard counts were checked. | Pass | Shailaja P.C. | 26 Oct 2026 | [Vacated records](../docs/evidence/28-vacated-allocation-records.png); [Final dashboard](../docs/evidence/31-dashboard-final-counts.png) |
| TC-ALLOC-006 | Team development build | An additional allocation to full room RC303 was rejected. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/27-allocation-success-and-full-room-rejection.png) |
| TC-ALLOC-007 | Team development build | An authenticated API request was submitted using non-existent student ID `NO-SUCH-STU-999` and room ID `RC303`. The API returned HTTP 404 with the message `Student NO-SUCH-STU-999 not found`. The invalid allocation was rejected. | Pass | Shailaja P.C. | 02 Nov 2026 | [View Screenshot](../docs/evidence/32-invalid-student-allocation-rejected.png) |
| TC-FILT-002 | Team development build | The Vacated filter displayed vacated allocation records. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/28-vacated-allocation-records.png) |
| TC-FILT-003 | Team development build | Combining the Vacated status with room C303 displayed a no-match result. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/30-vacated-filter-no-match-C303.png) |
| TC-DASH-001 | Team development build | Dashboard displayed 3 students. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/31-dashboard-final-counts.png) |
| TC-DASH-002 | Team development build | Dashboard displayed 3 rooms. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/31-dashboard-final-counts.png) |
| TC-DASH-003 | Team development build | Dashboard showed total capacity 9, occupied beds 2 and free beds 7. | Pass | Shailaja P.C. | 26 Oct 2026 | [View Screenshot](../docs/evidence/31-dashboard-final-counts.png) |
| TC-DASH-004 | Team development build | Dashboard counts were checked after allocation changes and vacating; the final summary reflected the updated totals. | Pass | Shailaja P.C. | 26 Oct 2026 | [Vacated records](../docs/evidence/28-vacated-allocation-records.png); [Final dashboard](../docs/evidence/31-dashboard-final-counts.png) |

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
