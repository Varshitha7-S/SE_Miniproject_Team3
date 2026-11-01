# Sprint 2 Test Execution Log — Hostel Management System

**Project:** Hostel Management System
**Version:** 1.1
**Prepared by:** Varshitha S (QA Lead)
**Execution date:** 28 October 2026
**Application revision tested:** 2c239a3 (main)
**Environment:** Windows, Chrome, Node.js v24.19.0, npm 11.17.0
**Backend:** Node.js/Express, in-memory demo database
**Frontend:** React/Vite, http://localhost:5173
**API:** http://localhost:5001
**Test data:** Initially seeded with 10 students, 5 rooms, and 8 allocations

## 1. Automated Backend Test Execution

| Test suite | Actual result | Status | Evidence |
|---|---|---|---|
| Backend API suite | 38 tests passed, 0 failed; 1 suite passed in 16.042 seconds | Passed | PowerShell output from `npm test` |
| API list/search performance check | Automated performance test passed; list/search operations were repeated 10 times each and met the test's 3-second assertion | Passed | Performance section of `npm test` output |

The automated suite covered student management, validation, rooms, allocation rules, capacity and duplicate-allocation protection, filters, dashboard, fees, error handling, authentication, password hashing, and API performance.

## 2. Manual UI Test Execution

| Test Case ID | Scenario | Actual result | Status |
|---|---|---|---|
| TC-STU-004 | Search existing student by ID and name | Searching for STU003 displayed only Rohan Kapoor. Searching for Rohan Kapoor displayed the same matching student. | Passed |
| TC-STU-006 | Search with no matching student | Searching for STU011 displayed an empty result and the message `No students match "STU011".` | Passed |
| TC-FILT-001 | Filter rooms by availability | The "With free space" filter displayed R102, R103, and R104, excluding full rooms R101 and R105. | Passed |
| TC-FILT-002 | Filter allocations by status | The Active filter displayed active allocations. The Vacated filter displayed vacated allocations, including AL007 and AL008. After the room change, AL003 also appeared as vacated. | Passed |
| TC-ALLOC-004 | Change student room | STU003 moved from R102 to R103. Previous allocation AL003 became vacated with end date 2026-10-28. New allocation AL009 was active in R103. | Passed |
| TC-DASH-001 | Verify dashboard student count | The automated dashboard API test compared summary values with stored records and passed; the UI also displayed 10 students. | Passed |

## 3. Additional Observed UI Check

| Check | Actual result | Status |
|---|---|---|
| Allocation filter by room | Active + R102 initially displayed AL003 and AL004. After moving STU003, only AL004 remained in the active R102 list. | Passed |
| Room occupancy after changing allocation | R102 changed from 2 occupied / 1 free bed to 1 occupied / 2 free beds. R103 changed from 0 occupied / 2 free beds to 1 occupied / 1 free bed. | Passed |

## 4. Tests Still Requiring Execution

| Test Case ID | Scenario | Status |
|---|---|---|
| TC-FILT-003 | Filter with no matching results | Planned |
| TC-UX-001 | Usability check with five representative users | Planned |
| TC-NFR-001 | Browser-based list/search performance measurement | Planned |
| TC-COMP-001 | Compatibility check in the agreed Chromium browser | Planned |
| Remaining student, room, allocation, dashboard, and security cases | Execute according to the Test Plan and implemented scope | Planned or conditional, as applicable |

The automated API performance result does not replace the separate browser-based performance procedure in TC-NFR-001.

## 5. Defect Triage

No reproducible defect was observed in the tests recorded above. This statement applies only to the executed checks; untested functionality is not considered defect-free.

If a defect is identified in a subsequent test, create or update the corresponding GitHub issue with:
- Reproduction steps and expected versus actual result.
- Severity and assigned owner.
- Build/environment details and screenshot or log evidence.
- Retest outcome after a fix.

## 6. Evidence and Limitations

The test outcomes above are based on the displayed browser results and the captured PowerShell output. Relevant screenshots should be attached to the HMS-027 GitHub issue or stored in the agreed evidence location before final review.

The UI tests used an in-memory demo database. Data changes, including the room change that created AL009 and vacated AL003, disappear when the demo process is stopped.

These results represent partial Sprint 2 execution, not completion of the entire RTM or final test plan.
