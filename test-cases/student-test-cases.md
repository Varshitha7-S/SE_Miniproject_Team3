# Student Management Test Cases

**Project:** Hostel Management System  
**Tester:** Shailaja  
**Backlog Item:** HMS-030  
**Sprint:** Sprint 1  
**Status:** Execution recorded — see individual test results below.

## TC-STU-001: Create Student with Valid Required Fields

**Requirement:** HMS-FR-001

**Steps:**
1. Enter a unique student ID and valid required details.
2. Save the student record.

**Expected Result:** The student is created and appears in the student list.

**Actual Result:** A student record was created successfully and appeared in the student list.

**Execution Status:** PASS

## TC-STU-002: Reject Duplicate Student ID

**Requirement:** HMS-FR-001

**Precondition:** A student with the test ID already exists.

**Steps:**
1. Attempt to create another student using the existing student ID.

**Expected Result:** The duplicate is rejected and the original record remains unchanged.

**Actual Result:** The duplicate student ID was rejected.

**Execution Status:** PASS

## TC-STU-003: Reject Missing Required Field

**Requirement:** HMS-FR-016

**Steps:**
1. Submit the student form with a required field empty.

**Expected Result:** A validation message appears and no record is saved.

**Actual Result:** The message "Student ID is required" appeared, and the record was not saved.

**Execution Status:** PASS

## TC-STU-004: Search for Existing Student

**Requirement:** HMS-FR-004

**Precondition:** A test student exists.

**Steps:**
1. Search using the exact student ID or name.

**Expected Result:** The matching student is displayed.

**Actual Result:** Searching for an existing student by ID returned the matching record.

**Execution Status:** PASS

## TC-STU-005: Update Existing Student Details

**Requirement:** HMS-FR-003

**Precondition:** A test student exists.

**Steps:**
1. Open the student record.
2. Change a permitted field.
3. Save the changes.

**Expected Result:** The updated value is displayed and remains after refresh.

**Actual Result:** The existing student record was updated successfully.

**Execution Status:** PASS

## TC-STU-006: Search with No Matching Student

**Requirement:** HMS-FR-004

**Steps:**
1. Search for a student ID or name that does not exist.

**Expected Result:** No records are shown and a clear no-match message appears.

**Actual Result:** A search with no matching student returned no matching record.

**Execution Status:** PASS

## TC-STU-007: View Stored Student Details

**Requirement:** HMS-FR-002

**Precondition:** A test student exists.

**Steps:**
1. Select the existing student from the list.

**Expected Result:** The displayed details match the saved record.

**Actual Result:** The existing student's details were available in the student list and could be reviewed.

**Execution Status:** PASS

## Execution Note

Manual execution results have been recorded under HMS-032. The results above reflect the completed student management checks.
