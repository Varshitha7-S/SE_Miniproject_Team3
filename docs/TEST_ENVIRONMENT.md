# Hostel Management System — Test Environment Guide



## 1. Purpose



This document describes the planned test environment and the steps required to prepare repeatable testing for the Hostel Management System (HMS).



## 2. Technology Stack



| Component | Planned Technology |

|---|---|

| Frontend | React |

| Backend | Node.js and Express.js |

| Database | MongoDB |

| Browser | Current Chromium-based browser |

| API testing | Postman or equivalent tool |

| Test data | Fictional CSV files in `test-data/` |



Runtime versions, application startup commands, database connection settings, and data import procedures must be confirmed against the implemented application.



## 3. Prerequisites



\- Git and access to the project repository.

\- Node.js and npm when application source and package configuration are available.

\- MongoDB configured according to the team's implementation.

\- A current Chromium-based browser.

\- Postman or an equivalent API client, if required.

\- Access to the agreed test build and fictional test data.



Never commit database passwords, API keys, or other secrets.



## 4. Repository Setup



For a new checkout:



```powershell

git clone https://github.com/Varshitha7-S/SE\_Miniproject\_Team3.git

cd SE\_Miniproject\_Team3

```



If the repository already exists, navigate to that existing directory instead.



Inspect the files before attempting to start the application:



```powershell

git status

Get-ChildItem

Get-ChildItem docs

Get-ChildItem test-data

```



## 5. Test Data Preparation



The baseline test data is stored in `test-data/`:



\- `students.csv` — fictional student records.

\- `rooms.csv` — room capacities and baseline occupancy.

\- `allocations.csv` — active and historical vacated allocations.

\- `README.md` — dataset descriptions, integrity rules, and suggested scenarios.



Review `test-data/README.md` before testing.



These CSV files are reference fixtures. They are not automatically imported into MongoDB. The database seed or import procedure must be documented once the application and database schema are available.



## 6. Environment Setup Procedure



1\. Obtain the latest agreed test build.

2\. Confirm frontend and backend setup instructions from the implemented project files.

3\. Confirm database configuration, collections, and initialization instructions with the developer.

4\. Prepare the database using the team's approved setup or seed procedure.

5\. Use fictional test data only.

6\. Start the application using the commands specified by the implementation.

7\. Open the application in the agreed Chromium-based browser.

8\. Verify that the frontend can communicate with the backend and database.

9\. Record the build version, browser version, test date, and any setup problems.



Do not assume the application is ready to start until its source files and configuration are available.



## 7. Baseline Test Scenarios



The dataset supports testing for:



\- Successful allocation to a room with available capacity.

\- Rejection of allocation to a full room.

\- Allocation into the final available space.

\- Prevention of duplicate active allocations.

\- Rejection of nonexistent student or room references.

\- Vacating an active allocation.

\- Changing a student's room while maintaining correct occupancy.



Detailed allocation scenarios are documented in `test-cases/allocation-test-cases.md`.



## 8. Repeatability and Data Integrity



Before each test run:



\- Start from the agreed baseline dataset or a known database reset state.

\- Ensure referenced students and rooms exist.

\- Ensure each student has at most one active allocation.

\- Ensure room occupancy matches active allocation records.

\- Ensure occupancy never exceeds capacity.

\- Exclude vacated allocations from current occupancy calculations.

\- Record deviations from the baseline.



Do not mark tests as passed until they have been executed against a working build.



## 9. Current Limitations



The repository root was inspected during preparation and contained documentation and test-case files, but no visible application source directories or root `package.json`.



The following details therefore remain to be confirmed:



\- Application startup commands and runtime versions.

\- Frontend and backend configuration.

\- Database connection and initialization procedure.

\- CSV import or database seed procedure.

\- Availability of a working test build.



This guide documents the planned test environment; it does not claim that the application has been configured or tested successfully.



## 10. Maintenance



Update this guide when the developer confirms runtime versions, application configuration, database setup, data initialization, and the target browser.



Document environment changes so another team member can reproduce the same test setup.


