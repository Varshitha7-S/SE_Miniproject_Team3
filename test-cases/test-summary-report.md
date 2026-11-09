# TEST SUMMARY REPORT

## Hostel Management System — Sprint 2

**Project:** Hostel Management System

**Document Version:** 1.0

**Prepared By:** Varshitha S (QA Lead)

**Role:** Quality Assurance Lead

**Report Date:** 10 November 2026

**Sprint:** Sprint 2

**Build / Revision Details:** 26 October execution: Team development build; 28 October QA follow-up: 2c239a3 (main); 2 November API negative test and 31 October usability test: revision not recorded

**Report Status:** Draft — Pending Final Team Review

---

## 1. Executive Summary

This Test Summary Report presents the testing activities, execution results, defects, requirements coverage, and outstanding testing activities for the Hostel Management System (HMS) during Sprint 2.

The testing activities included automated backend API testing, manual UI testing, usability evaluation, security checks, performance verification, and selected browser compatibility checks.

The verified automated backend API suite completed with 40 tests passed and zero failures; the initial 38-test run was followed by two dashboard tests. The initial manual UI execution recorded 26 of 26 test cases as passed on 26 October 2026. A QA Lead follow-up on 28 October rechecked six selected cases, with two additional UI observations; these are follow-up checks, not six additional unique manual cases. A separate authenticated API negative test (TC-ALLOC-007) passed on 2 November 2026.

The usability evaluation conducted under HMS-028 involved five representative participants. All five participants successfully completed the student search and room availability tasks without assistance, achieving a 100% completion rate and satisfying the acceptance criterion.

No reproducible defects were observed during the recorded testing activities. Additionally, no currently open GitHub issues carrying the repository's `bug` label were found during the defect review conducted on 10 November 2026.

However, some quality tests and requirements remain partially tested or pending. Therefore, the report represents partial Sprint 2 QA coverage rather than final approval of the entire application.

## 2. Testing Objectives

The objectives of Sprint 2 testing were:

1. Verify the correctness of implemented student, room, allocation, filtering, and dashboard functionalities.

2. Validate backend API operations and server-side input validation.

3. Verify authentication controls and password handling where implemented.

4. Evaluate the usability of the application through representative users.

5. Assess API performance and selected UI workflows.

6. Identify, record, and track defects.

7. Maintain traceability between software requirements and corresponding test cases.

8. Summarize completed, partially tested, and pending testing activities.

## 3. Test Environment

| Parameter | Details |
|---|---|
| Operating System | Windows desktop for manual UI/usability checks; automated execution OS not recorded |
| Browser | Google Chrome |
| Runtime Environment | Node.js test environment (exact version not recorded) |
| Package Manager | npm (version not recorded) |
| Backend | Node.js / Express |
| Frontend | React / Vite |
| Backend Database | MongoDB Memory Server for automated tests; in-memory demo data for UI testing |
| Frontend URL | http://localhost:5173 |
| API URL | http://localhost:5001 |
| Application Revision | 2c239a3 (main) for 28 October QA follow-up; other execution revisions not recorded |
| QA Follow-up Dataset (28 October) | 10 students, 5 rooms, 8 allocations |

Manual UI testing used fictional demo data in an in-memory database; data modifications were not persistent across application restarts. The automated API suite used MongoDB Memory Server.

The browser version and desktop resolution were not formally recorded for the compatibility evaluation.

## 4. Scope of Testing

### 4.1 Functional Testing

Functional testing covered:

- Student creation, search, and management.

- Room creation and capacity validation.

- Student-room allocation and room changes.

- Allocation status and availability filtering.

- Dashboard summary verification.

- Input validation and error handling.

### 4.2 Security Testing

Security testing covered:

- Unauthenticated API request handling.

- Server-side invalid payload validation.

- Password hashing verification.

- User-facing error response checks.

- Repository secret review, which remains pending.

### 4.3 Performance Testing

Performance testing included automated API list/search performance checks. The separate formal browser-based performance measurement remains pending.

### 4.4 Usability Testing

Five representative participants were evaluated on:

1. Finding student STU003 through the student search functionality.

2. Identifying a room with available capacity.

No verbal guidance was provided during task execution.

### 4.5 Compatibility Testing

Selected core pages and workflows were exercised in Google Chrome on Windows. The formal browser-version and desktop-resolution compatibility checklist remains incomplete.

## 5. Automated Test Execution Results

### 5.1 Backend API Test Suite

| Test Suite | Actual Result | Status |
|---|---|---|
| Backend API test suite | 40 tests passed, 0 failed | PASS |
| API list/search performance check | 50 requests across five endpoints satisfied the under-three-second assertion | PASS |
| Additional API negative test (TC-ALLOC-007) | One separately executed authenticated negative test passed on 2 November 2026 | PASS |

**Execution Details:**

- Test execution date: 26 October 2026.

- Application revision for the 26 October automated execution: not recorded. The 2c239a3 (main) revision is recorded for the 28 October QA follow-up.

- Total test suites passed: 1.

- Total automated tests passed: 40.

- Failed tests: 0.

- Execution time: Approximately 14.785 seconds.

The verified 40-test automated suite covered student management, input validation, room management, allocation rules, capacity restrictions, duplicate allocation prevention, filtering, dashboard summaries, fee records and validation, authentication-related operations, error handling, and supplementary API performance checks.

**Result:** The automated backend test suite completed successfully.

Note: The successful API performance assertion does not replace the separate browser-based performance test defined in TC-NFR-001.

## 6. Manual UI Test Execution Results

The following six selected manual UI test cases were rechecked during the QA Lead follow-up on 28 October. They are a subset of the 26 manual UI test cases recorded in the initial 26 October execution and are not additional unique test cases.

| Test Case ID | Scenario | Actual Result | Status |
|---|---|---|---|
| TC-STU-004 | Search existing student by ID and name | Searching for STU003 displayed Rohan Kapoor. Searching by the student's name returned the matching record. | PASS |
| TC-STU-006 | Search with no matching student | Searching for STU011 displayed an empty result with an appropriate no-match message. | PASS |
| TC-FILT-001 | Filter rooms by availability | Rooms R102, R103, and R104 were displayed as having free space, while full rooms were excluded. | PASS |
| TC-FILT-002 | Filter allocations by status | Active and vacated allocation records were displayed according to the selected status. | PASS |
| TC-ALLOC-004 | Change student room | STU003 was moved from R102 to R103. Previous allocation AL003 was vacated and new allocation AL009 became active. | PASS |
| TC-DASH-001 | Verify dashboard student count | The dashboard displayed 10 students, and the automated dashboard API verification passed. | PASS |

### 6.1 Additional Observed UI Checks

| Check | Actual Result | Status |
|---|---|---|
| Allocation filter by room | Active allocations in R102 were reduced from AL003 and AL004 to AL004 after the student moved. | PASS |
| Room occupancy after allocation change | R102 changed from 2 occupied / 1 free to 1 occupied / 2 free. R103 changed from 0 occupied / 2 free to 1 occupied / 1 free. | PASS |

These results demonstrate successful execution of the selected student, room, allocation, filtering, and dashboard workflows.

## 7. Usability Testing Results

**Task:** HMS-028 — Run Team Usability Check

**Test Case:** TC-UX-001 — Evaluate Labels, Navigation, and Task Clarity

**Requirement:** HMS-NFR-001

**Execution Date:** 31 October 2026

Five representative participants independently performed two tasks:

1. Search for student STU003 and identify the student's name.

2. Identify a room with available space and report its room number and available capacity.

### 7.1 Participant Results

| Participant | Student Search | Room Availability | Both Tasks Without Help? |
|---|---|---|---|
| P1 | Pass | Pass | Yes |
| P2 | Pass | Pass | Yes |
| P3 | Pass | Pass | Yes |
| P4 | Pass | Pass | Yes |
| P5 | Pass | Pass | Yes |

### 7.2 Usability Summary

| Metric | Result |
|---|---|
| Total participants | 5 |
| Participants completing both tasks independently | 5 |
| Successful completion rate | 100% |
| Required acceptance criterion | At least 4 out of 5 |
| Actual result | 5 out of 5 |
| Overall outcome | PASS |

All five participants completed both tasks without verbal assistance.

The usability acceptance criterion was satisfied.

**Conclusion:** TC-UX-001 passed, and HMS-NFR-001 is marked Passed in the Sprint 2 updated RTM.

**Evidence:** `test-cases/usability-test-results.md`

## 8. Quality Test Execution Summary

The following table summarizes the recorded execution status of the quality test cases.

| Test Case ID | Description | Execution Result | Status |
|---|---|---|---|
| TC-SEC-001 | Deny unauthenticated administrative actions | Automated API authentication checks passed. | PASS |
| TC-SEC-002 | Validate invalid data on the server | Automated API validation checks passed. | PASS |
| TC-SEC-003 | Check repository for committed secrets | Repository secret review not yet performed. | NOT RUN |
| TC-SEC-004 | Check user-facing error messages | Consistent JSON error responses were verified; broader sensitive-information review remains pending. | PARTIAL |
| TC-SEC-005 | Verify password hashing | Automated testing verified password hashing rather than plaintext storage. | PASS |
| TC-UX-001 | Evaluate labels, navigation, and task clarity | All five participants completed both assigned tasks independently. | PASS |
| TC-NFR-001 | Measure common list/search response time | Formal browser-based timing measurements have not been performed. | NOT RUN |
| TC-COMP-001 | Check compatibility in target Chromium browser | Selected Chrome workflows were exercised; formal compatibility checklist remains incomplete. | PARTIAL |
| TC-REV-001 | Review modular code organization | Maintainability review has not yet been executed. | PLANNED |

**Note:** TC-NFR-001 remains Not Run even though automated API performance checks passed. The formal test requires browser-based measurements.

## 9. Requirements Traceability Coverage

The following coverage summary is based on the Sprint 2 RTM from HMS-027, updated to incorporate the completed usability evaluation from HMS-028.

### 9.1 Functional Requirements

| Coverage Status | Number of Requirements |
|---|---:|
| Passed | 15 |
| Partially Tested | 0 |
| Planned | 0 |
| Conditional | 2 |
| **Total** | **17** |

### 9.2 Non-Functional Requirements

| Coverage Status | Number of Requirements |
|---|---:|
| Passed | 4 |
| Partially Tested | 2 |
| Planned | 1 |
| Conditional | 0 |
| **Total** | **7** |

HMS-NFR-001 is included under Passed based on the HMS-028 usability results.

### 9.3 Security Requirements

| Coverage Status | Number of Requirements |
|---|---:|
| Passed | 3 |
| Partially Tested | 1 |
| Planned | 1 |
| Conditional | 0 |
| **Total** | **5** |

### 9.4 Overall RTM Coverage

| Coverage Status | Number of Requirements |
|---|---:|
| Passed | 22 |
| Partially Tested | 3 |
| Planned | 2 |
| Conditional | 2 |
| **Total** | **29** |

The coverage figures represent requirement-level status classifications, not a count of individual test executions.

## 10. Defect Summary

A fresh review of the repository's open issues was performed on 10 November 2026.

The repository's `bug` label was used to identify explicitly tracked open defects.

| Defect Metric | Result |
|---|---:|
| Open GitHub issues labelled bug | 0 |
| Reproducible defects observed in recorded tests | 0 |
| Failed test executions recorded in the summarized automated/manual checks | 0 |

No reproducible defects were observed during the testing activities recorded in the execution log.

A GitHub CLI query on 10 November 2026 returned no currently open issues carrying the `bug` label.

This does not establish that no defects exist outside the recorded testing scope or that untested functionality is defect-free.

Documentation review observations and pending pull-request changes are tracked separately from application defects.

## 11. Pending Testing Activities

The following activities remain incomplete and require further execution or review:

| Test Case / Activity | Pending Work | Status |
|---|---|---|
| TC-SEC-003 | Review repository files and history for committed secrets. | Not Run |
| TC-SEC-004 | Complete the review of sensitive information in user-facing error messages. | Partial |
| TC-NFR-001 | Perform ten formal browser-based list/search timing measurements. | Not Run |
| TC-COMP-001 | Complete browser-version and desktop-resolution compatibility checks. | Partial |
| TC-REV-001 | Review modular code organization and separation of application responsibilities. | Planned |


Optional requirements remain conditional where the corresponding features have not been approved or implemented.

## 12. Testing Limitations and Risks

1. The application was tested using an in-memory demo database. Data changes are lost when the backend process stops.

2. Testing was performed using a controlled fictional dataset rather than a production-scale dataset.

3. The automated API performance result does not replace formal browser-based performance testing.

4. The formal browser compatibility checklist remains incomplete.

5. Some security and maintainability checks are still pending.

6. The RTM and execution documentation are undergoing pull-request review and consolidation.

7. The test outcomes represent selected Sprint 2 execution activities and do not establish complete coverage of every requirement.

## 13. Recommendations

1. Prioritize completion of the outstanding quality checks listed in Section 11.

2. Conduct the formal browser-based performance evaluation.

3. Complete the security review of committed configuration and source files.

4. Finish the browser compatibility checklist.

5. Perform the maintainability review.

6. Consolidate test execution records and supporting evidence.

7. Obtain final review and approval from the Development Lead and Product Owner.

8. Update the RTM whenever additional tests are executed or requirement statuses change.

## 14. Final QA Assessment

The Hostel Management System has successfully completed the selected automated backend tests, manual UI tests, and usability evaluation recorded in this report.

The verified automated backend suite achieved 40 successful tests with zero failures. The initial manual UI execution recorded 26/26 passing cases; six selected cases were rechecked on 28 October, with two additional UI observations. A separate authenticated TC-ALLOC-007 negative API test passed on 2 November. All five participants completed the two usability tasks without assistance on 31 October.

The latest RTM on main records 22 of the 29 tracked requirements as Passed, three as Partially tested, two as Planned, and two as Conditional.

No open GitHub issues labelled as bugs were identified during the defect review conducted on 10 November 2026.

However, outstanding security, performance, compatibility, and maintainability checks remain.

**Overall QA Assessment:** Selected Sprint 2 testing activities completed successfully. The application has not yet received final QA sign-off because the remaining tests and team approvals are pending.

---

## 15. Approval

| Role | Name | Approval Status |
|---|---|---|
| QA Lead | Varshitha S | Prepared |
| Development Lead | Aditya Singhal | Pending Review |
| Product Owner | Krishna Tejas Voruganti | Pending Final Sign-off |

**Document Status:** Draft — Pending Final Team Review and Approval.

**End of Report**
