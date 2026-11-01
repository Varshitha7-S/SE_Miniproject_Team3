# TEST SUMMARY REPORT

## Hostel Management System — Sprint 2

**Project:** Hostel Management System

**Document Version:** 1.0

**Prepared By:** Varshitha S (QA Lead)

**Role:** Quality Assurance Lead

**Report Date:** 1 November 2026

**Sprint:** Sprint 2

**Application Revision Tested:** 2c239a3 (main)

**Report Status:** Draft — Pending Final Team Review

---

## 1. Executive Summary

This Test Summary Report presents the testing activities, execution results, defects, requirements coverage, and outstanding testing activities for the Hostel Management System (HMS) during Sprint 2.

The testing activities included automated backend API testing, manual UI testing, usability evaluation, security checks, performance verification, and selected browser compatibility checks.

The automated backend test suite completed successfully with 38 tests passed and zero failures. Six formal manual UI test cases were recorded as passed, along with two additional successful UI observations.

The usability evaluation conducted under HMS-028 involved five representative participants. All five participants successfully completed the student search and room availability tasks without assistance, achieving a 100% completion rate and satisfying the acceptance criterion.

No reproducible defects were observed during the recorded testing activities. Additionally, no currently open GitHub issues carrying the repository's `bug` label were found during the defect review conducted on 1 November 2026.

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
| Operating System | Windows |
| Browser | Google Chrome |
| Runtime Environment | Node.js v24.19.0 |
| Package Manager | npm 11.17.0 |
| Backend | Node.js / Express |
| Frontend | React / Vite |
| Backend Database | In-memory demo database |
| Frontend URL | http://localhost:5173 |
| API URL | http://localhost:5001 |
| Application Revision | 2c239a3 (main) |
| Initial Test Dataset | 10 students, 5 rooms, 8 allocations |

The application was executed using fictional demo data and an in-memory database. Data modifications made during testing were not persistent across application restarts.

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
| Backend API test suite | 38 tests passed, 0 failed | PASS |
| API list/search performance check | Ten repeated list/search operations met the automated three-second assertion | PASS |

**Execution Details:**

- Test execution date: 28 October 2026.

- Application revision: 2c239a3.

- Total test suites passed: 1.

- Total automated tests passed: 38.

- Failed tests: 0.

- Execution time: 16.042 seconds.

The automated test suite covered student management, input validation, room management, allocation rules, capacity restrictions, duplicate allocation prevention, filtering, dashboard summaries, fees, authentication, password hashing, error handling, and API performance.

**Result:** The automated backend test suite completed successfully.

Note: The successful API performance assertion does not replace the separate browser-based performance test defined in TC-NFR-001.

## 6. Manual UI Test Execution Results

The following formal manual UI test cases were executed and recorded in the Sprint 2 execution log.

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
| Passed | 8 |
| Partially Tested | 7 |
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
| Passed | 15 |
| Partially Tested | 10 |
| Planned | 2 |
| Conditional | 2 |
| **Total** | **29** |

The coverage figures represent requirement-level status classifications, not a count of individual test executions.

## 10. Defect Summary

A review of the repository's open issues was performed on 1 November 2026.

The repository's `bug` label was used to identify explicitly tracked open defects.

| Defect Metric | Result |
|---|---:|
| Open GitHub issues labelled bug | 0 |
| Reproducible defects observed in recorded tests | 0 |
| Failed test executions recorded in the summarized automated/manual checks | 0 |

No reproducible defects were observed during the testing activities recorded in the execution log.

No currently open GitHub issues carrying the `bug` label were found during the review.

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
| Remaining functional test cases | Complete the pending student, room, allocation, filtering, dashboard, and other applicable test scenarios. | Pending |

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

1. Complete all pending functional and non-functional test cases.

2. Conduct the formal browser-based performance evaluation.

3. Complete the security review of committed configuration and source files.

4. Finish the browser compatibility checklist.

5. Perform the maintainability review.

6. Consolidate test execution records and supporting evidence.

7. Obtain final review and approval from the Development Lead and Product Owner.

8. Update the RTM whenever additional tests are executed or requirement statuses change.

## 14. Final QA Assessment

The Hostel Management System has successfully completed the selected automated backend tests, manual UI tests, and usability evaluation recorded in this report.

The automated backend suite achieved 38 successful tests with zero failures. Six formal manual UI test cases passed, two additional UI checks were successful, and all five participants passed the usability evaluation.

The RTM indicates that 15 of the 29 tracked requirements are passed, 10 are partially tested, two remain planned, and two are conditional.

No open GitHub issues labelled as bugs were identified during the defect review conducted on 1 November 2026.

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
