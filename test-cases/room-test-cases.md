
# Room Management Test Cases

**Project:** Hostel Management System  
**Tester:** Shailaja  
**Backlog Item:** HMS-030  
**Sprint:** Sprint 1  
**Status:** Execution in progress — selected cases executed; see test-execution-log.md

## TC-ROOM-001: Add Room with Valid Details
**Requirement:** HMS-FR-005  
**Precondition:** The room creation feature is available.  
**Steps:**
1. Open the room management page.
2. Enter a unique room number and valid capacity.
3. Click Save.

**Expected Result:** The room is saved and appears in the room list.

## TC-ROOM-002: Duplicate Room Number
**Requirement:** HMS-FR-005  
**Precondition:** A room with the test room number already exists.  
**Steps:**
1. Attempt to create another room with the same room number.
2. Click Save.

**Expected Result:** The duplicate room is rejected and the existing room remains unchanged.

## TC-ROOM-003: Invalid Capacity (Zero or Negative)
**Requirement:** HMS-FR-005  
**Steps:**
1. Open room creation.
2. Enter capacity as `0` and click Save.
3. Repeat with capacity as `-1`.

**Expected Result:** Both invalid capacities are rejected with a clear validation message, and no invalid room is saved.

## TC-ROOM-004: View Empty Room Occupancy
**Requirement:** HMS-FR-006  
**Precondition:** A room exists with no active student allocations.  
**Steps:**
1. Open the room details.
2. Check the displayed occupancy and available capacity.

**Expected Result:** Occupancy is shown as `0`, and available capacity matches the room's total capacity.

## TC-ROOM-005: Required Fields Validation
**Requirements:** HMS-FR-016, HMS-NFR-007  
**Steps:**
1. Leave a required room field empty.
2. Click Save.

**Expected Result:** A validation message appears and the invalid room is not saved.

## TC-ROOM-007: Occupancy After Allocation
**Requirement:** HMS-FR-006  
**Precondition:** A room exists with available capacity and the allocation feature is available.  
**Steps:**
1. Record the room's current occupancy and available capacity.
2. Allocate one student to the room.
3. View the room's occupancy and available capacity again.

**Expected Result:** Occupancy increases by one and available capacity decreases by one.

## Execution Note
These test cases are planned and have not yet been executed. Record actual results only after testing a working application.

