# Unit Test Report — Hostel Management System

## 1. Introduction

This report documents the automated backend testing performed for the Hostel Management System (HMS) as part of Software Engineering Mini-Project Deliverable Part 3.

The testing verifies backend application behaviour, API operations, input validation, database interactions, allocation workflows, authentication, error handling and performance-related requirements.

The existing automated suite is implemented using Jest and Supertest, with MongoDB Memory Server providing an isolated database environment.

**Testing classification:** The current suite primarily contains backend API and integration tests. It exercises application behaviour through HTTP requests rather than testing every function independently.

## 2. Testing Objectives

The objectives of the automated testing are:

- Verify student creation, retrieval, searching and updating.
- Verify room creation, room capacity and availability.
- Verify allocation, room occupancy, room changes and vacating operations.
- Verify input validation and rejection of invalid data.
- Verify that duplicate and invalid operations are handled correctly.
- Verify dashboard summary calculations.
- Verify fee management operations.
- Verify authentication and authorization behaviour.
- Verify consistent error responses.
- Perform supplementary API performance checks.

## 3. Testing Environment and Tools

| Component | Details |
|---|---|
| Project | Hostel Management System |
| Backend framework | Node.js and Express |
| Testing framework | Jest 29.7.0 |
| API testing library | Supertest 7.0.0 |
| Database | MongoDB |
| Test database | MongoDB Memory Server 9.4.1 |
| ODM | Mongoose 8.5.1 |
| Test environment | Node |
| Automated test file | `backend/tests/api.test.js` |
| Test execution directory | `backend/` |
| Test execution command | `npm test` |
| Coverage execution command | `npx jest --runInBand --coverage --collectCoverageFrom="src/**/*.js"` |

The automated tests use an in-memory MongoDB instance to isolate database operations during execution.

## 4. Test Execution Details

**Execution Date:** 10 November 2026

**Automated Test File:** `tests/api.test.js`

### Test Execution Summary

| Metric | Result |
|---|---:|
| Total test suites | 1 |
| Test suites passed | 1 |
| Total automated tests | 40 |
| Tests passed | 40 |
| Tests failed | 0 |
| Snapshots | 0 |
| Standard test execution time | 15.775 seconds |
| Coverage-enabled execution time | 9.183 seconds |

**Overall Result: PASS**

All 40 automated tests passed during the recorded execution. No test failures were reported.

The coverage-enabled execution also completed successfully with 40 passing tests.

The standard test execution displayed a Jest force-exit warning after the tests completed. This warning is recorded as an execution observation and does not change the reported passing test count.

**Execution Session Clarification:** The earlier execution records dated 26 October are retained as historical test results. A subsequent execution was performed on 10 November 2026 on the `part3-reports` branch. The latest standard execution completed with 40/40 tests passing in 15.775 seconds. The separate coverage-enabled execution also completed with 40/40 tests passing in 9.183 seconds.

## 5. Automated Testing Areas

### 5.1 Student Management

The student management tests verify:

- Creating and listing student records.
- Retrieving an individual student.
- Rejecting duplicate student IDs.
- Handling requests for unknown students.
- Updating student information.
- Preventing changes to the student ID.
- Searching students by ID or name.
- Handling searches with no matching records.

**Result:** PASS

### 5.2 Input Validation

The validation tests verify rejection of:

- Missing required student fields.
- Invalid email addresses.
- Invalid phone numbers.
- Out-of-range and non-numeric academic years.
- Invalid student status values.
- Negative fee amounts.
- Invalid object values supplied in string fields.
- Illegal student ID characters.
- Invalid room capacities.
- Malformed allocation requests.
- Invalid query parameters.

The tests also verify that rejected requests do not create unintended database records.

**Result:** PASS

### 5.3 Room Management

The room tests verify:

- Creating rooms with valid capacity information.
- Calculating room occupancy and remaining capacity.
- Rejecting duplicate room numbers.
- Filtering rooms by availability and full status.
- Returning the correct room list.

**Result:** PASS

### 5.4 Allocation Management

The allocation tests verify:

- Creating student-room allocations.
- Updating room occupancy after allocation.
- Rejecting allocations for unknown students or rooms.
- Preventing inactive students from being allocated.
- Rejecting allocations to full rooms.
- Enforcing the room-capacity boundary.
- Preventing multiple active allocations for one student.
- Vacating allocations and freeing room capacity.
- Rejecting invalid vacation dates.
- Allowing a previously vacated student to be allocated again.
- Preserving allocation history.
- Changing rooms and recording the new allocation.
- Rejecting invalid room-change operations.
- Handling concurrent allocation requests without overbooking.
- Filtering allocations by status, room and student.

**Result:** PASS

### 5.5 Dashboard

The dashboard test verifies that summary values agree with stored student, room and allocation records.

It also verifies:

- Student and room counts.
- Total capacity.
- Occupied and available spaces.
- Active allocation counts.
- Zeroed summary values when there are no records.
- Dashboard updates after an allocation is vacated.

**Result:** PASS

### 5.6 Fee Management

The fee tests verify:

- Retrieving the default fee status.
- Updating fee amount and payment status.
- Rejecting invalid fee statuses.
- Rejecting negative fee amounts.
- Handling fee updates for unknown students.

**Result:** PASS

### 5.7 Error Handling

The error-handling tests verify:

- Malformed JSON request handling.
- Unknown route handling.
- Internal server error responses.
- Consistent JSON error formats.
- Prevention of sensitive internal error details and stack traces from being exposed in API responses.

**Result:** PASS

### 5.8 Authentication

The authentication tests verify:

- Rejection of unauthenticated requests.
- Rejection of invalid authentication tokens.
- Admin login with valid credentials.
- Rejection of incorrect credentials.
- Password hashing.
- Successful access to protected endpoints using a valid token.
- Availability of the health endpoint.

**Result:** PASS

### 5.9 Supplementary Performance Check

The performance test uses demo-sized data consisting of 500 student records and 100 room records.

It sends ten requests to each of five endpoints:

- `GET /api/students`
- `GET /api/students?search=Student 42`
- `GET /api/rooms`
- `GET /api/allocations`
- `GET /api/dashboard`

A total of 50 requests are measured. Each request is checked against an execution threshold of less than three seconds.

**Result:** PASS

This is a supplementary automated performance check and is not a replacement for the formal TC-NFR-001 measurement procedure.

## 6. Test Results Summary

| Testing Area | Result |
|---|---|
| Student Management | PASS |
| Input Validation | PASS |
| Room Management | PASS |
| Allocation Management | PASS |
| Dashboard | PASS |
| Fee Management | PASS |
| Error Handling | PASS |
| Authentication | PASS |
| Supplementary Performance Check | PASS |

**Total Automated Tests:** 40

**Passed:** 40

**Failed:** 0

## 7. Observations and Limitations

1. The automated test suite primarily exercises backend API and integration behaviour using Supertest and MongoDB Memory Server. It should not be interpreted as 40 isolated unit tests.
2. The current automated suite does not include a separately configured frontend React component unit-testing framework.
3. The `src/server.js` startup entry point was not executed by the current API test suite. It therefore appears with 0% coverage in the generated coverage report.
4. The supplementary performance test verifies the under-three-second assertion for each measured request. Individual timing values are not persisted by the test implementation.
5. The formal TC-NFR-001 ten-operation measurement procedure remains pending.
6. The standard Jest execution displayed a force-exit warning after test completion.

These limitations are documented to distinguish the testing activities actually performed from testing that remains outside the current automated suite.

## 8. Conclusion

The automated backend test execution completed successfully, with all 40 tests passing and no reported test failures.

The tests cover major Hostel Management System backend operations, including student management, room management, allocation workflows, validation, dashboard calculations, fee management, authentication and error handling.

The supplementary performance check also passed its defined response-time assertions.

The generated test and coverage results will be used alongside the existing manual test execution log and screenshots for the remaining Part 3 testing reports.