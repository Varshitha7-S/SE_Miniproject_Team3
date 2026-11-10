# Code Coverage Report — Hostel Management System

## 1. Introduction

This report presents the code coverage results obtained during automated backend testing of the Hostel Management System (HMS).

Code coverage measures how much of the application source code was executed during the automated test run. It helps identify tested and untested portions of the backend implementation.

The coverage results were generated using Jest's built-in coverage functionality.

## 2. Coverage Testing Environment

| Component | Details |
|---|---|
| Project | Hostel Management System |
| Backend | Node.js and Express |
| Testing framework | Jest 29.7.0 |
| API testing library | Supertest 7.0.0 |
| Database testing | MongoDB Memory Server |
| Test file | `tests/api.test.js` |
| Coverage scope | `src/**/*.js` |
| Execution date | 10 November 2026 |
| Execution branch | `part3-reports` |

### Coverage Command

The following command was executed from the backend directory:

```bash
npx jest --runInBand --coverage --collectCoverageFrom="src/**/*.js"
```

Jest generated the coverage results in the `backend/coverage/` directory.

## 3. Overall Code Coverage Results

The following results were obtained from the coverage-enabled execution.

| Coverage Metric | Coverage |
|---|---:|
| Statement Coverage | 89.85% |
| Branch Coverage | 77.31% |
| Function Coverage | 94.02% |
| Line Coverage | 93.25% |

### Coverage Interpretation

- **Statement Coverage:** Measures the percentage of executable statements that were executed.
- **Branch Coverage:** Measures the percentage of conditional decision outcomes that were exercised.
- **Function Coverage:** Measures the percentage of functions that were called during testing.
- **Line Coverage:** Measures the percentage of executable source lines that were executed.

The results indicate that most of the measured backend source code was exercised during the automated test execution. Branch coverage is lower than statement, function and line coverage, indicating that some conditional paths were not exercised.

## 4. File-wise Coverage Results

The following table records the file-wise coverage values displayed in the Jest terminal output.

| Source File | Statements (%) | Branches (%) | Functions (%) | Lines (%) |
|---|---:|---:|---:|---:|
| `src/app.js` | 100.00 | 100.00 | 100.00 | 100.00 |
| `src/server.js` | 0.00 | 0.00 | 0.00 | 0.00 |
| `src/config/db.js` | 88.88 | 33.33 | 100.00 | 100.00 |
| `src/middleware/index.js` | 88.57 | 80.76 | 100.00 | 100.00 |
| `src/models/index.js` | 100.00 | 100.00 | 100.00 | 100.00 |
| `src/routes/index.js` | 91.74 | 85.71 | 94.73 | 95.50 |
| `src/services/allocationService.js` | 84.05 | 85.00 | 100.00 | 83.92 |
| `src/utils/errors.js` | 100.00 | 100.00 | 100.00 | 100.00 |
| `src/utils/validators.js` | 95.52 | 76.52 | 100.00 | 100.00 |

## 5. Coverage Analysis

### 5.1 Areas with Complete Coverage

The following source files achieved 100% coverage across all four measured metrics:

- `src/app.js`
- `src/models/index.js`
- `src/utils/errors.js`

These files had all measured statements, branches, functions and lines exercised during the coverage run.

### 5.2 Areas with High Coverage

The following files achieved high statement, function or line coverage:

- `src/routes/index.js`
- `src/utils/validators.js`
- `src/middleware/index.js`

Some conditional branches remain untested in these files.

### 5.3 Areas Requiring Further Coverage

The following areas have lower coverage values:

- `src/config/db.js` has 33.33% branch coverage.
- `src/services/allocationService.js` has 84.05% statement coverage and 83.92% line coverage.
- `src/utils/validators.js` has 76.52% branch coverage.
- `src/server.js` has 0% coverage.

These results identify areas that could be considered for additional testing in future testing cycles.

## 6. Server Startup Entry Point — Coverage Limitation

The file `src/server.js` has 0% coverage in the current Jest execution.

This is because the existing automated API tests exercise the Express application through `createApp()` in `src/app.js` without executing the server startup process.

The server startup entry point handles:

- Environment variable loading.
- Database connection.
- JWT secret validation.
- HTTP server initialization.
- Startup error handling.

These startup operations were not exercised by the current API test suite.

This is a documented testing-scope limitation and does not indicate that the application routes or API tests have failed.

## 7. Coverage Report Artifacts

Jest generated the following coverage artifacts inside the backend coverage directory:

| File / Directory | Purpose |
|---|---|
| `coverage/coverage-final.json` | Detailed coverage data for source files |
| `coverage/lcov.info` | Coverage information in LCOV format |
| `coverage/clover.xml` | Coverage information in Clover XML format |
| `coverage/lcov-report/` | HTML coverage report directory |

The HTML report can be opened locally using:

```text
backend/coverage/lcov-report/index.html
```

The generated files provide supporting evidence for the reported coverage percentages.

## 8. Execution Summary

| Metric | Result |
|---|---:|
| Test suites passed | 1 |
| Total test suites | 1 |
| Tests passed | 40 |
| Total tests | 40 |
| Failed tests | 0 |
| Coverage-enabled execution time | 9.183 seconds |

**Execution Result: PASS**

All 40 automated tests passed during the coverage-enabled execution.

## 9. Conclusion

The backend code coverage analysis was completed successfully using Jest.

The overall results were 89.85% statement coverage, 77.31% branch coverage, 94.02% function coverage and 93.25% line coverage.

The analysis identifies source files with complete coverage as well as areas where additional testing could improve coverage, particularly database connection branches, validation branches, allocation service paths and the server startup entry point.

The generated coverage artifacts provide supporting evidence for the reported results and can be used for future testing improvements.