# System Validation Report — Hostel Management System

## 1. Introduction

This report documents the system-level validation performed for the Hostel Management System (HMS) as part of Software Engineering Mini-Project Deliverable Part 3.

System validation verifies that the application workflows behave according to the expected requirements and that related modules work together correctly.

The validation covers student management, room management, allocation management, filtering, dashboard updates, input validation and error handling.

The report is based on the recorded manual UI test execution, supporting screenshots and the separately recorded authenticated API negative test.

## 2. Validation Objectives

The objectives of system validation are:

- Verify the complete student management workflow.
- Verify room creation, capacity and occupancy behaviour.
- Verify student allocation and room assignment workflows.
- Verify room-change and allocation-vacating operations.
- Verify that room occupancy and availability are updated correctly.
- Verify filtering and search functionality.
- Verify dashboard summaries after application operations.
- Verify rejection of invalid and duplicate operations.
- Verify that invalid API allocation requests are rejected.

## 3. Validation Environment

| Component | Details |
|---|---|
| Project | Hostel Management System |
| Application | Web-based hostel management application |
| Backend | Node.js and Express |
| Frontend | React and Vite |
| Database | MongoDB |
| Manual testing | Browser-based UI testing |
| Automated API testing | Jest and Supertest |
| Test database | MongoDB Memory Server |
| Evidence location | `docs/evidence/` |
| Manual UI execution date | 26 October 2026 |
| Additional API negative test date | 02 November 2026 |

The report uses the execution dates recorded in the existing test execution log.

## 4. System Validation Scope

The following functional areas were validated.

| Module | Validation Scope |
|---|---|
| Student Management | Student creation, duplicate ID validation, required fields, search, update and viewing details |
| Room Management | Room creation, duplicate room validation, capacity validation and occupancy |
| Allocation Management | Student allocation, duplicate allocation rejection, room capacity and room changes |
| Vacating | Vacating active allocations and updating room availability |
| Filtering | Room availability and allocation-status filtering |
| Dashboard | Student count, room count, total capacity, occupied and free spaces |
| API Validation | Rejection of an allocation request using a nonexistent student ID |

## 5. System Validation Results

### 5.1 Student Management

The student management workflow was validated through the following scenarios:

| Test ID | Validation Scenario | Expected Behaviour | Actual Result | Status |
|---|---|---|---|---|
| TC-STU-001 | Create a student with valid details | Student should be created and displayed in the list. | Student was created and appeared in the student list. | PASS |
| TC-STU-002 | Create a duplicate student ID | Duplicate student ID should be rejected. | Application rejected the duplicate ID. | PASS |
| TC-STU-003 | Submit without the required student ID | Required-field validation should be displayed. | Application displayed the required-field validation message; record was not saved. | PASS |
| TC-STU-004 | Search using student ID | Matching student should be displayed. | Matching student record was displayed. | PASS |
| TC-STU-005 | Update an existing student | Student information should be updated. | Application displayed a successful update message and showed the updated details. | PASS |
| TC-STU-006 | Search for a nonexistent student | No matching result should be displayed. | Application displayed a no-match result. | PASS |
| TC-STU-007 | View student details | Existing student information should be displayed. | Student details were displayed successfully. | PASS |

**Module Result:** PASS

### 5.2 Room Management

The room management workflow was validated through the following scenarios:

| Test ID | Validation Scenario | Expected Behaviour | Actual Result | Status |
|---|---|---|---|---|
| TC-ROOM-001 | Create a room with valid details | Room should be created successfully. | Room C301 was created with capacity 4. | PASS |
| TC-ROOM-002 | Create a duplicate room number | Duplicate room number should be rejected. | Application rejected the duplicate room number. | PASS |
| TC-ROOM-003 | Submit room capacity as 0 and -1 | Invalid capacities should be rejected. | Both zero and negative capacity values were rejected with validation. | PASS |
| TC-ROOM-004 | Verify empty room occupancy | Occupancy should initially be zero. | C301 displayed 0 occupied and 4 free beds. | PASS |
| TC-ROOM-005 | Submit without a room number | Required-field validation should prevent room creation. | Application displayed "Room number is required". A subsequent room-list check confirmed that no new room record was created. | PASS |
| TC-ROOM-007 | Verify occupancy after allocation | Occupancy should increase and available capacity should decrease. | RC301 occupancy increased from 0/4 to 1/4; available capacity decreased from 4 to 3. | PASS |
| TC-FILT-001 | Filter rooms with free space | Rooms with available capacity should be displayed. | Rooms with available capacity were displayed. | PASS |

**Module Result:** PASS

### 5.3 Allocation Management

The allocation workflow was validated to ensure that students could be assigned to available rooms while preventing invalid and duplicate allocations.

| Test ID | Validation Scenario | Expected Behaviour | Actual Result | Status |
|---|---|---|---|---|
| TC-ALLOC-001 | Allocate a student to an available room | Allocation should be created and occupancy updated. | Allocation AL001 was created for HMS-STU-001 in RC301. | PASS |
| TC-ALLOC-002 | Allocate a student to a full room | Allocation should be rejected. | Application rejected allocation to the full room. | PASS |
| TC-ALLOC-003 | Create another active allocation for the same student | Duplicate active allocation should be rejected. | Application rejected the duplicate active allocation. | PASS |
| TC-ALLOC-004 | Change-room workflow | Existing allocation should be handled and dashboard information updated. | Change-room control was available for active allocation AL001, and the recorded workflow was followed by updated dashboard information. | PASS |
| TC-ALLOC-005 | Vacate an active allocation | Allocation should be vacated and capacity released. | Allocation status changed as expected and dashboard occupancy values updated. | PASS |
| TC-ALLOC-006 | Verify room capacity boundary | The last available space should be allocated, and a subsequent allocation should be rejected. | First allocation filled RC303 to 1/1; the subsequent allocation was rejected with "Room RC303 is full". | PASS |

**Module Result:** PASS

### 5.4 Allocation Filtering

| Test ID | Validation Scenario | Expected Behaviour | Actual Result | Status |
|---|---|---|---|---|
| TC-FILT-002 | Filter allocations by Vacated status | Only vacated allocations should be displayed. | Vacated allocation records were displayed. | PASS |
| TC-FILT-003 | Filter by Vacated status and room C303 | No matching records should be displayed when none exist. | Application displayed a no-matching-allocations message. | PASS |

**Module Result:** PASS

### 5.5 Dashboard Validation

The dashboard was checked after student, room and allocation operations.

| Test ID | Validation Scenario | Expected Behaviour | Actual Result | Status |
|---|---|---|---|---|
| TC-DASH-001 | Verify student count | Dashboard should display the recorded student count. | Dashboard displayed 3 students. | PASS |
| TC-DASH-002 | Verify room count | Dashboard should display the recorded room count. | Dashboard displayed 3 rooms. | PASS |
| TC-DASH-003 | Verify room capacity and occupancy | Dashboard values should agree with the recorded room and allocation information. | Dashboard displayed capacity 9, occupied spaces 2 and available spaces 7 for the recorded verification. | PASS |
| TC-DASH-004 | Verify dashboard after vacating | Occupied and free spaces should update after vacating. | Occupied spaces decreased from 1 to 0, free spaces increased from 12 to 13, and total capacity remained 13. | PASS |

**Module Result:** PASS

## 6. Additional API System Validation — TC-ALLOC-007

**Execution Date:** 02 November 2026

**Test Type:** Authenticated Backend API Negative Test

This test was executed separately from the 26 manual UI test cases.

### Request Details

| Parameter | Value |
|---|---|
| HTTP Method | POST |
| Endpoint | `/api/allocations` |
| Student ID | `NO-SUCH-STU-999` |
| Room ID | `RC303` |

### Expected Behaviour

The API should reject an allocation request when the supplied student ID does not exist.

### Actual Result

The authenticated API request was rejected with:

- HTTP status: `404`
- Response: `Student NO-SUCH-STU-999 not found`

No allocation was created for the nonexistent student.

**Result:** PASS

**Evidence:** `docs/evidence/32-invalid-student-allocation-rejected.png`

## 7. System Validation Summary

### Manual UI Validation

| Module | Test Cases | Passed | Failed |
|---|---:|---:|---:|
| Student Management | 7 | 7 | 0 |
| Room Management | 7 | 7 | 0 |
| Allocation Management | 6 | 6 | 0 |
| Allocation Filtering | 2 | 2 | 0 |
| Dashboard | 4 | 4 | 0 |
| **Total** | **26** | **26** | **0** |

### Additional API Validation

| Test ID | Test Type | Result |
|---|---|---|
| TC-ALLOC-007 | Authenticated API negative test | PASS |

The additional API test is recorded separately and is not included in the 26 manual UI test cases.

## 8. Supporting Evidence

The following screenshots support the recorded system validation activities.

### Student Management

- `docs/evidence/04-student-created-success.png`
- `docs/evidence/07-student-duplicate-id-rejected.png`
- `docs/evidence/08-student-required-id-validation.png`
- `docs/evidence/10-student-search-by-id.png`
- `docs/evidence/12-student-search-no-match.png`
- `docs/evidence/13-student-update-success.png`

### Room Management

- `docs/evidence/16-room-created-success.png`
- `docs/evidence/17-room-duplicate-number-rejected.png`
- `docs/evidence/18-room-zero-capacity-validation.png`
- `docs/evidence/19-room-list-empty-occupancy.png`
- `docs/evidence/20-room-required-number-validation.png`
- `docs/evidence/23-room-occupancy-after-allocation.png`
- `docs/evidence/33-room-negative-capacity-validation.png`
- `docs/evidence/34-room-filter-with-free-space-results.png`

### Allocation Management

- `docs/evidence/22-active-allocation-change-room-control.png`
- `docs/evidence/23-room-occupancy-after-allocation.png`
- `docs/evidence/26-duplicate-active-allocation-rejected.png`
- `docs/evidence/27-allocation-success-and-full-room-rejection.png`
- `docs/evidence/37-allocation-vacated-confirmation.png`

### Filtering and Dashboard

- `docs/evidence/24-dashboard-intermediate-counts.png`
- `docs/evidence/25-dashboard-after-allocation-change.png`
- `docs/evidence/28-vacated-allocation-records.png`
- `docs/evidence/29-vacated-filter-room-C301.png`
- `docs/evidence/30-vacated-filter-no-match-C303.png`
- `docs/evidence/31-dashboard-final-counts.png`
- `docs/evidence/35-dashboard-before-vacating.png`
- `docs/evidence/36-dashboard-after-vacating.png`

### API Validation

- `docs/evidence/32-invalid-student-allocation-rejected.png`

## 9. Limitations and Observations

1. The system validation results are based on the recorded manual UI execution and additional API negative test.
2. The report does not claim that every possible application workflow or input combination has been tested.
3. The formal TC-NFR-001 ten-operation performance measurement procedure remains pending.
4. The supplementary automated performance check is documented separately in the Unit Test Report.
5. The manual UI validation results and automated backend test results represent different testing activities and are reported separately.

## 10. Conclusion

The recorded system validation completed successfully across student management, room management, allocation management, filtering and dashboard workflows.

All 26 recorded manual UI test cases passed. The additional authenticated API negative test TC-ALLOC-007 also passed.

The observed application behaviour was consistent with the expected outcomes for the recorded scenarios, including validation of invalid inputs, allocation capacity enforcement, room occupancy updates and dashboard changes after vacating an allocation.

The validation results and supporting screenshots provide evidence of the tested Hostel Management System workflows for Software Engineering Mini-Project Deliverable Part 3.