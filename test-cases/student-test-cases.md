# Student Management Test Cases

**Project:** Hostel Management System  
**Tester:** Shailaja  
**Backlog Item:** HMS-030  
**Sprint:** Sprint 1  
**Status:** Planned — not yet executed

## TC-STU-001: Add Student with Valid Details
**Steps:** Enter valid student details and click Save.  
**Expected Result:** Student is saved and appears in the student list.

## TC-STU-002: Required Fields Validation
**Steps:** Leave a required field empty and click Save.  
**Expected Result:** A validation message appears and the invalid record is not saved.

## TC-STU-003: Duplicate Student ID
**Precondition:** A student with the test ID already exists.  
**Steps:** Attempt to create another student using the same ID.  
**Expected Result:** The duplicate is rejected and the existing record remains unchanged.

## TC-STU-004: View Student Details
**Precondition:** A test student exists.  
**Steps:** Open the student's details.  
**Expected Result:** The correct student information is displayed.

## TC-STU-005: Update Student Details
**Precondition:** A test student exists.  
**Steps:** Change a field and save.  
**Expected Result:** The updated information is saved and displayed correctly.

## TC-STU-006: Invalid Student Input
**Steps:** Submit invalid or incomplete student data.  
**Expected Result:** Invalid data is rejected with a clear validation message.

## TC-STU-007: Student Does Not Exist
**Precondition:** Student lookup is available.  
**Steps:** Request a student ID that does not exist.  
**Expected Result:** A clear not-found response is displayed.

**Execution note:** These tests are planned and have not yet been executed. Record actual results only after testing a working application.
