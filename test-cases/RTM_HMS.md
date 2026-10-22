
# Requirements Traceability Matrix (RTM)

**Project:** Hostel Management System  
**Version:** 1.1  
**Prepared by:** Varshitha S (QA Lead)  
**Sprint:** Sprint 1  
**Status:** Draft — pending final team review

## 1. Purpose

This document maps the Hostel Management System requirements to the corresponding design modules and test cases. It supports requirements coverage tracking and helps identify requirements that still need testing.

## 2. Functional Requirements Traceability

| Requirement ID | Requirement Summary | Design / Module | Test Case IDs | Status |
|---|---|---|---|---|
| HMS-FR-001 | Create student with a unique identifier | Student Management | TC-STU-001, TC-STU-002 | Planned |
| HMS-FR-002 | View student details | Student Management | TC-STU-007 | Planned |
| HMS-FR-003 | Update student details | Student Management | TC-STU-005 | Planned |
| HMS-FR-004 | Search students by identifier or name | Student Management | TC-STU-004, TC-STU-006 | Planned |
| HMS-FR-005 | Add a room with a unique room number and positive capacity | Room Management | TC-ROOM-001, TC-ROOM-002, TC-ROOM-003 | Planned |
| HMS-FR-006 | Display room capacity, occupancy, and remaining capacity | Room Management / Allocation Service | TC-ROOM-004, TC-ROOM-007, TC-ALLOC-001, TC-ALLOC-004, TC-ALLOC-005, TC-ALLOC-006 | Planned |
| HMS-FR-007 | Allocate a student to a room with available capacity | Allocation Service / UI | TC-ALLOC-001, TC-ALLOC-007 | Planned |
| HMS-FR-008 | Reject allocation when the room is full | Allocation Validation | TC-ALLOC-002, TC-ALLOC-006 | Planned |
| HMS-FR-009 | Prevent multiple active allocations for the same student | Allocation Validation | TC-ALLOC-003 | Planned |
| HMS-FR-010 | Change a student's room allocation | Allocation Service / UI | TC-ALLOC-004 | Planned |
| HMS-FR-011 | Mark a student as having vacated a room | Allocation Service / UI | TC-ALLOC-005 | Planned |
| HMS-FR-012 | Manage fee amount and payment status, if approved | Fee Management | TC-FEE-001, if implemented | Conditional |
| HMS-FR-013 | Filter rooms by availability and allocations by status | Search / Filter UI / API | TC-FILT-001, TC-FILT-002, TC-FILT-003 | Planned |
| HMS-FR-014 | Protect administrative actions with authorization, if implemented | Authentication / Authorization | TC-SEC-001, if implemented | Conditional |
| HMS-FR-015 | Display dashboard summaries | Dashboard | TC-DASH-001, TC-DASH-002, TC-DASH-003, TC-DASH-004 | Planned |
| HMS-FR-016 | Validate required fields and display understandable messages | Input Validation | TC-STU-003, TC-ROOM-003, TC-ROOM-005, TC-SEC-002 | Planned |
| HMS-FR-017 | View allocation history, if approved | Allocation History | TC-HIST-001, if approved and implemented | Conditional |

## 3. Non-Functional Requirements Traceability

| Requirement ID | Requirement Summary | Design / Module | Test Case IDs | Status |
|---|---|---|---|---|
| HMS-NFR-001 | Usability of labels and common tasks | UI / Usability | TC-UX-001 | Planned |
| HMS-NFR-002 | Common list/search operations complete within 3 seconds in the agreed test environment | API / UI Performance | TC-NFR-001 | Planned |
| HMS-NFR-003 | Maintain room capacity and allocation data integrity | Allocation / Data Integrity | TC-ALLOC-002, TC-ALLOC-003, TC-ALLOC-006 | Planned |
| HMS-NFR-004 | Security controls and safe password handling, if authentication is implemented | Authentication / Security | TC-SEC-001, TC-SEC-005, where applicable | Conditional |
| HMS-NFR-005 | Maintainable separation of application responsibilities | Code Structure / Documentation | TC-REV-001 | Planned |
| HMS-NFR-006 | Compatibility with the target Chromium-based browser | Browser Compatibility | TC-COMP-001 | Planned |
| HMS-NFR-007 | Validate input before saving data | Input Validation | TC-STU-003, TC-ROOM-003, TC-ROOM-005, TC-SEC-002 | Planned |

## 4. Security Requirements Traceability

| Requirement ID | Requirement Summary | Design / Module | Test Case IDs | Status |
|---|---|---|---|---|
| HMS-SR-001 | Deny unauthenticated administrative actions when login is implemented | Authentication / Authorization | TC-SEC-001, if implemented | Conditional |
| HMS-SR-002 | Validate user-supplied data on the server | Backend Validation | TC-SEC-002 | Planned |
| HMS-SR-003 | Keep secrets and database credentials out of committed source code | Configuration / Repository | TC-SEC-003 | Planned |
| HMS-SR-004 | Avoid exposing sensitive details in user-facing errors | Error Handling | TC-SEC-004 | Planned |
| HMS-SR-005 | Hash stored passwords if password storage is implemented | Authentication / Password Storage | TC-SEC-005, if applicable | Conditional |

## 5. Allocation Test Case Traceability

| Test Case ID | Scenario | Requirement ID | Expected Result |
|---|---|---|---|
| TC-ALLOC-001 | Allocate student to an available room | HMS-FR-007, HMS-FR-006 | Allocation is recorded and occupancy increases by one. |
| TC-ALLOC-002 | Reject allocation to a full room | HMS-FR-008, HMS-NFR-003 | Allocation is rejected and occupancy does not exceed capacity. |
| TC-ALLOC-003 | Prevent duplicate active allocation | HMS-FR-009, HMS-NFR-003 | Second active allocation is rejected. |
| TC-ALLOC-004 | Change student room | HMS-FR-010, HMS-FR-006 | Previous allocation is closed, the new allocation is recorded, and room occupancy is updated correctly. |
| TC-ALLOC-005 | Vacate an allocated room | HMS-FR-011, HMS-FR-006 | Active allocation ends and available capacity increases. |
| TC-ALLOC-006 | Test room capacity boundary | HMS-FR-008, HMS-NFR-003, HMS-FR-006 | The final available space can be allocated; a further allocation is rejected, and capacity is never exceeded. |
| TC-ALLOC-007 | Reject invalid student or room references | HMS-FR-007, HMS-SR-002 | Invalid allocation is rejected without incorrect data changes. |

## 6. Coverage Status Definitions

- **Planned:** Test coverage is documented, but execution has not necessarily occurred.
- **Conditional:** Applicable only if the optional feature is approved and implemented.
- **Executed:** The test has been run against a testable build and its actual result recorded.
- **Passed:** The actual result matches the expected result after execution.
- **Failed:** The actual result does not match the expected result after execution.
- **Blocked:** Execution could not proceed because of a documented dependency or environment issue.

## 7. Review and Maintenance

1. Verify requirement descriptions against the SRS.
2. Review allocation test cases with the Product Owner.
3. Keep test case IDs consistent across the RTM, Test Plan, and detailed test-case documents.
4. Update statuses only when supported by evidence.
5. Document requirements that are not implemented or are excluded from the agreed MVP.
6. Update the RTM whenever requirements or test cases change.
7. Ensure every referenced test case is defined in the relevant test documentation.

## 8. Approval

| Role | Name | Status |
|---|---|---|
| QA Lead | Varshitha S | Prepared |
| Dev Lead | Aditya Singhal | Pending review |
| Product Owner | Krishna Tejas Voruganti | Allocation test cases and RTM mapping reviewed and approved in GitHub issue HMS-025 |

**Document status:** Draft — pending Dev Lead review and final team approval.
