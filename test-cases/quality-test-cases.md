# Quality Test Cases — Hostel Management System

**Project:** Hostel Management System
**Version:** 1.1
**Task:** HMS-026 — Design security, usability, performance, and compatibility test cases
**Prepared by:** Varshitha S (QA Lead)
**Status:** Draft — selected checks executed; remaining quality checks pending; see test-execution-log.md

## 1. Purpose and Scope

This document expands the quality test cases already referenced by the
SRS, Software Test Plan, and Requirements Traceability Matrix (RTM).
It covers security, usability, performance, and browser compatibility
for the agreed MVP.

Use fictional test data and the agreed development/test environment.
Record actual results only after executing a test against a testable build.
Optional-feature tests apply only when the relevant feature is implemented.

## 2. Security Test Cases

### TC-SEC-001 — Deny Unauthenticated Administrative Actions

- **Requirement:** HMS-SR-001; HMS-FR-014; HMS-NFR-004
- **Priority:** High
- **Applicability:** Conditional — only if authentication/authorization is implemented
- **Preconditions:** A testable build and a protected administrative operation are available.
- **Steps:**
  1. Identify an operation that creates, updates, allocates, or deallocates data.
  2. Make the request without logging in or without a valid session.
  3. Check the response and inspect the relevant test data.
- **Expected result:** The protected operation is denied. No unauthorized data change occurs.
- **Evidence:** Request/response or screenshot and relevant test-data verification.

### TC-SEC-002 — Validate Invalid Data on the Server

- **Requirement:** HMS-SR-002; HMS-FR-016; HMS-NFR-007
- **Priority:** High
- **Applicability:** Where the corresponding API endpoint is implemented
- **Preconditions:** A testable backend/API and disposable test data are available.
- **Steps:**
  1. Send a request directly to the API with a required field missing.
  2. Send a room-creation request with capacity set to zero or a negative value.
  3. Where applicable, submit another invalid identifier or status value.
  4. Inspect the responses and check whether invalid records were saved.
- **Expected result:** The server rejects invalid payloads with an understandable error. No invalid record or unintended data change is persisted.
- **Evidence:** Sanitized API request/response and verification of stored test data.

### TC-SEC-003 — Check the Repository for Committed Secrets

- **Requirement:** HMS-SR-003
- **Priority:** High
- **Preconditions:** Access to the project repository and its tracked configuration/source files.
- **Steps:**
  1. Review tracked source and configuration files for credentials, database connection secrets, API keys, and real passwords.
  2. Check whether local environment files containing secrets are accidentally tracked.
  3. Review repository history according to the team's approved review process.
  4. Record any suspected exposure without copying the secret into an issue or report.
- **Expected result:** No real credentials or database secrets are committed. Any suspected exposure is reported and handled according to team practice.
- **Evidence:** Review notes and relevant file/path references, without revealing secret values.

### TC-SEC-004 — Check User-Facing Error Messages

- **Requirement:** HMS-SR-004
- **Priority:** Medium
- **Preconditions:** A testable build and a safe, controlled invalid request are available.
- **Steps:**
  1. Submit an invalid request that produces a validation or error response.
  2. Inspect the message displayed to the user and, where applicable, the API response.
  3. Check for stack traces, internal file paths, database details, passwords, or other sensitive information.
- **Expected result:** The user receives an understandable error without sensitive internal details. Diagnostic information, if needed, is handled outside the user-facing response.
- **Evidence:** Screenshot or sanitized response.

### TC-SEC-005 — Verify Password Hashing

- **Requirement:** HMS-SR-005; HMS-NFR-004
- **Priority:** High
- **Applicability:** Conditional — only if password storage is implemented
- **Preconditions:** The authentication feature and a disposable test account are available.
- **Steps:**
  1. Create or use a test account through the approved test process.
  2. Inspect the relevant password-storage implementation.
  3. Inspect the test account's stored password field in the test database.
- **Expected result:** The stored password is a suitable password hash, not plaintext.
- **Evidence:** Sanitized code/database verification. Never include actual passwords in the evidence.

## 3. Usability Test Case

### TC-UX-001 — Evaluate Labels, Navigation, and Task Clarity

- **Requirement:** HMS-NFR-001
- **Priority:** Medium
- **Preconditions:** A working UI and representative fictional test data are available.
- **Participants:** Five representative demo users.
- **Steps:**
  1. Ask each participant to find a specified student using the search control.
  2. Ask each participant to view a room's availability.
  3. Do not provide verbal guidance while the participant attempts each task.
  4. Record task completion, requests for help, unclear labels, navigation difficulties, and error-message issues.
- **Expected result:** Labels and controls are understandable, feedback is clear, and the tasks can be completed without assistance.
- **Acceptance criterion:** At least four of the five representative users complete the assigned tasks without assistance, as specified by the SRS.
- **Evidence:** Anonymized results table and observations.

## 4. Performance Test Case

### TC-NFR-001 — Measure Common List/Search Response Time

- **Requirement:** HMS-NFR-002
- **Priority:** Medium
- **Preconditions:** The agreed test build, demo dataset, and local test environment are available.
- **Steps:**
  1. Record the test machine, browser/version, build, dataset, and environment.
  2. Choose a representative list operation and a student-search operation.
  3. Run a total of ten measured list/search operations under the same test conditions, including both operation types.
  4. Measure each operation consistently, from the user action until the results are available.
  5. Record all ten timings and note errors or unusually slow runs.
- **Expected result:** Each measured operation completes within three seconds in the agreed environment.
- **Acceptance criterion:** Every recorded run meets the three-second target.
- **Evidence:** Table of individual timings and test-environment details.

## 5. Compatibility Test Case

### TC-COMP-001 — Check Compatibility in the Target Chromium Browser

- **Requirement:** HMS-NFR-006
- **Priority:** Medium
- **Preconditions:** A working build and the team's selected Chromium-based browser are available.
- **Steps:**
  1. Record the browser name/version, operating system, and desktop resolution.
  2. Open the application and inspect the main student, room, allocation, and dashboard/filter screens that are implemented.
  3. Exercise representative student search, room availability, and allocation workflows using fictional test data.
  4. Check for broken layouts, inaccessible controls, clipped content, and browser errors that affect the core workflow.
- **Expected result:** The implemented core workflows and controls function in the agreed target browser at desktop resolution.
- **Evidence:** Browser/version details and screenshots or notes for any compatibility defects.

## 6. Maintainability Test Case

### TC-REV-001 — Review Modular Code Organization

- **Requirement:** HMS-NFR-005
- **Priority:** Low
- **Preconditions:** Access to the current frontend/backend source code and setup documentation.
- **Steps:**
  1. Review the frontend pages and components and identify their responsibilities.
  2. Review backend routes, models, validation, configuration, and allocation logic.
  3. Confirm that the frontend communicates with the backend through the API rather than connecting directly to MongoDB.
  4. Review the README and API documentation for setup and endpoint guidance.
  5. Record unclear responsibilities or missing documentation as observations.
  6. If a reproducible defect is found, create a GitHub issue with severity, owner, reproduction steps, and evidence.
- **Expected result:** Frontend, backend, and data-access responsibilities are separated into understandable modules, and setup instructions are documented.
- **Evidence:** Reviewed file paths, observations, and any linked defect issue.
- **Status:** Planned — not yet executed.

## 7. Execution Record

Complete this table only after the tests have actually been run.

| Test Case ID | Build/Version | Actual Result | Status (Pass/Fail/Blocked/Partial) | Tester | Date | Evidence / Issue |
|---|---|---|---|---|---|---|
| TC-SEC-001 | 2c239a3 | Automated API test denied unauthenticated requests; login also worked. | Pass | Varshitha S | 2026-10-28 | npm test output |
| TC-SEC-002 | 2c239a3 | Automated API validation tests rejected invalid payloads without saving invalid records. | Pass | Varshitha S | 2026-10-28 | npm test output |
| TC-SEC-003 | | | | | | |
| TC-SEC-004 | 2c239a3 | Automated error tests returned consistent JSON without stack traces; broader sensitive-detail review remains pending. | Partial | Varshitha S | 2026-10-28 | npm test output |
| TC-SEC-005 | 2c239a3 | Automated authentication test verified that passwords were hashed, not stored as plaintext. | Pass | Varshitha S | 2026-10-28 | npm test output |
| TC-UX-001 | | | | | | |
| TC-NFR-001 | | | | | | |
| TC-COMP-001 | 2c239a3 | Core pages and selected workflows were exercised in Chrome; formal browser/version and resolution checklist remains pending. | Partial | Varshitha S | 2026-10-28 | Browser screenshots in conversation; checklist pending |
| TC-REV-001 | | | | | | |

## 8. Review Notes

- Keep all test case IDs consistent with the existing Test Plan and RTM.
- Treat TC-SEC-001 and TC-SEC-005 as conditional when their features are not implemented.
- Record unimplemented or blocked checks as such; do not claim they passed.
- Use fictional data and sanitize evidence before attaching it to GitHub issues.
- Update this document if the agreed MVP scope or acceptance criteria change.
