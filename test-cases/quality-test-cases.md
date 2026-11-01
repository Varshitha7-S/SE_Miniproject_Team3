# Quality Test Cases - Hostel Management System

**Project:** Hostel Management System

**Version:** 1.2

**Task:** HMS-026 - Design security, usability, performance, and compatibility test cases

**Prepared by:** Varshitha S (QA Lead)

**Status:** Execution in progress - selected test cases executed; pending and partially executed cases are recorded below.

## 1. Purpose and Scope

This document expands the quality test cases already referenced by the SRS, Software Test Plan, and Requirements Traceability Matrix (RTM).

It covers security, usability, performance, and browser compatibility for the agreed MVP.

Use fictional test data and the agreed development/test environment.

Record actual results only after executing a test against a testable build. Optional-feature tests apply only when the relevant feature is implemented.

## 2. Security Test Cases

### TC-SEC-001 - Deny Unauthenticated Administrative Actions

**Requirement:** HMS-SR-001; HMS-FR-014; HMS-NFR-004

**Priority:** High

**Applicability:** Conditional - only if authentication/authorization is implemented.

**Preconditions:** A testable build and a protected administrative operation are available.

**Steps:**

1. Identify an operation that creates, updates, allocates, or deallocates data.

2. Make the request without logging in or without a valid session.

3. Check the response and inspect the relevant test data.

**Expected result:** The protected operation is denied. No unauthorized data change occurs.

**Evidence:** Request/response or screenshot and relevant test-data verification.

### TC-SEC-002 - Validate Invalid Data on the Server

**Requirement:** HMS-SR-002; HMS-FR-016; HMS-NFR-007

**Priority:** High

**Applicability:** Where the corresponding API endpoint is implemented.

**Preconditions:** A testable backend/API and disposable test data are available.

**Steps:**

1. Send a request directly to the API with a required field missing.

2. Send a room-creation request with capacity set to zero or a negative value.

3. Where applicable, submit another invalid identifier or status value.

4. Inspect the responses and check whether invalid records were saved.

**Expected result:** The server rejects invalid payloads with an understandable error. No invalid record or unintended data change is persisted.

**Evidence:** Sanitized API request/response and verification of stored test data.

### TC-SEC-003 - Check the Repository for Committed Secrets

**Requirement:** HMS-SR-003

**Priority:** High

**Preconditions:** Access to the project repository and its tracked configuration/source files.

**Steps:**

1. Review tracked source and configuration files for credentials, database connection secrets, API keys, and real passwords.

2. Check whether local environment files containing secrets are accidentally tracked.

3. Review repository history according to the team's approved review process.

4. Record any suspected exposure without copying the secret into an issue or report.

**Expected result:** No real credentials or database secrets are committed. Any suspected exposure is reported and handled according to team practice.

**Evidence:** Review notes and relevant file/path references, without revealing secret values.

### TC-SEC-004 - Check User-Facing Error Messages

**Requirement:** HMS-SR-004

**Priority:** Medium

**Preconditions:** A testable build and a safe, controlled invalid request are available.

**Steps:**

1. Submit an invalid request that produces a validation or error response.

2. Inspect the message displayed to the user and, where applicable, the API response.

3. Check for stack traces, internal file paths, database details, passwords, or other sensitive information.

**Expected result:** The user receives an understandable error without sensitive internal details. Diagnostic information, if needed, is handled outside the user-facing response.

**Evidence:** Screenshot or sanitized response.

### TC-SEC-005 - Verify Password Hashing

**Requirement:** HMS-SR-005; HMS-NFR-004

**Priority:** High

**Applicability:** Conditional - only if password storage is implemented.

**Preconditions:** The authentication feature and a disposable test account are available.

**Steps:**

1. Create or use a test account through the approved test process.

2. Inspect the relevant password-storage implementation.

3. Inspect the test account's stored password field in the test database.

**Expected result:** The stored password is a suitable password hash, not plaintext.

**Evidence:** Sanitized code/database verification. Never include actual passwords in the evidence.

## 3. Usability Test Case

### TC-UX-001 - Evaluate Labels, Navigation, and Task Clarity

**Requirement:** HMS-NFR-001

**Priority:** Medium

**Preconditions:** A working UI and representative fictional test data are available.

**Participants:** Five representative demo users.

**Steps:**

1. Ask each participant to find a specified student using the search control.

2. Ask each participant to view a room's availability.

3. Do not provide verbal guidance while the participant attempts each task.

4. Record task completion, requests for help, unclear labels, navigation difficulties, and error-message issues.

**Expected result:** Labels and controls are understandable, feedback is clear, and the tasks can be completed without assistance.

**Acceptance criterion:** At least four of the five representative users complete the assigned tasks without assistance, as specified by the SRS.

**Evidence:** Anonymized results table and observations in `test-cases/usability-test-results.md`.

**Execution outcome:** PASS - All five participants successfully completed both assigned tasks without assistance (5/5).

## 4. Performance Test Case

### TC-NFR-001 - Measure Common List/Search Response Time

**Requirement:** HMS-NFR-002

**Priority:** Medium

**Preconditions:** The agreed test build, demo dataset, and local test environment are available.

**Steps:**

1. Record the test machine, browser/version, build, dataset, and environment.

2. Choose a representative list operation and a student-search operation.

3. Run a total of ten measured list/search operations under the same test conditions, including both operation types.

4. Measure each operation consistently, from the user action until the results are available.

5. Record all ten timings and note errors or unusually slow runs.

**Expected result:** Each measured operation completes within three seconds in the agreed environment.

**Acceptance criterion:** Every recorded run meets the three-second target.

**Evidence:** Table of individual timings and test-environment details.

## 5. Compatibility Test Case

### TC-COMP-001 - Check Compatibility in the Target Chromium Browser

**Requirement:** HMS-NFR-006

**Priority:** Medium

**Preconditions:** A working build and the team's selected Chromium-based browser are available.

**Steps:**

1. Record the browser name/version, operating system, and desktop resolution.

2. Open the application and inspect the main student, room, allocation, and dashboard/filter screens that are implemented.

3. Exercise representative student search, room availability, and allocation workflows using fictional test data.

4. Check for broken layouts, inaccessible controls, clipped content, and browser errors that affect the core workflow.

**Expected result:** The implemented core workflows and controls function in the agreed target browser at desktop resolution.

**Evidence:** Browser/version details and screenshots or notes for any compatibility defects.

## 6. Execution Record

The following table records the tests actually executed. Partially executed and pending tests are identified separately.

| Test Case ID | Build/Version | Actual Result | Status | Tester | Date | Evidence / Issue |
|---|---|---|---|---|---|---|
| TC-SEC-001 | 2c239a3 (main) | Automated API test confirmed that unauthenticated protected requests were denied and valid login worked. | Pass | Varshitha S | 28-Oct-2026 | Backend automated test results in test-execution-log.md |
| TC-SEC-002 | 2c239a3 (main) | Automated API tests confirmed server-side rejection of invalid payloads. | Pass | Varshitha S | 28-Oct-2026 | Backend automated test results in test-execution-log.md |
| TC-SEC-003 | - | Repository secret review and history inspection have not yet been executed. | Not Run | - | - | Pending review |
| TC-SEC-004 | 2c239a3 (main) | API error responses returned consistent JSON without stack traces. Broader review of sensitive information in user-facing errors remains pending. | Partial | Varshitha S | 28-Oct-2026 | Backend error-handling test results in test-execution-log.md |
| TC-SEC-005 | 2c239a3 (main) | Automated test verified that the stored password was hashed rather than stored as plaintext. | Pass | Varshitha S | 28-Oct-2026 | Backend authentication test results in test-execution-log.md |
| TC-UX-001 | 2c239a3 (main) | All five participants independently completed student search and room availability tasks without assistance. Successful completion rate: 5/5 (100%). | Pass | Varshitha S | 31-Oct-2026 | test-cases/usability-test-results.md |
| TC-NFR-001 | 2c239a3 (main) | Formal measurement of ten browser-based list/search operations has not yet been performed. API performance checks were performed separately. | Not Run | - | - | Browser timing measurements pending |
| TC-COMP-001 | 2c239a3 (main) | Selected core pages and workflows were exercised in Chrome on Windows. The formal browser-version and desktop-resolution compatibility checklist remains pending. | Partial | Varshitha S | 28-Oct-2026 | Selected UI observations in test-execution-log.md |

**Status definitions:**

- **Pass:** All applicable acceptance criteria for the test case were satisfied.

- **Fail:** The test was executed and one or more acceptance criteria were not satisfied.

- **Blocked:** Execution could not proceed because of an identified blocker.

- **Partial:** Some checks were completed successfully, but remaining checks are pending.

- **Not Run:** The test case has not yet been executed.

## 7. Review Notes

1. Keep all test case IDs consistent with the existing Test Plan and RTM.

2. Treat TC-SEC-001 and TC-SEC-005 as conditional when their features are not implemented.

3. Record unimplemented or blocked checks as such; do not claim they passed.

4. Use fictional data and sanitize evidence before attaching it to GitHub issues.

5. The usability test TC-UX-001 achieved its acceptance criterion with all five participants completing both tasks without assistance.

6. TC-SEC-003 and TC-NFR-001 remain pending execution.

7. TC-SEC-004 and TC-COMP-001 are partially executed and require the remaining checks before final closure.

8. Update this document if the agreed MVP scope or acceptance criteria change.
