# Room Management Test Cases

**Project:** Hostel Management System  
**Tester:** Shailaja  
**Backlog Item:** HMS-030  
**Sprint:** Sprint 1  
**Status:** Planned — not yet executed

## TC-ROOM-001: Add Room with Valid Details
**Precondition:** The room creation feature is available.  
**Steps:**
1. Open the room management page.
2. Enter a unique room number and valid capacity.
3. Click Save.

**Expected Result:** The room is saved and appears in the room list.

## TC-ROOM-002: Duplicate Room Number
**Precondition:** A room with the test room number already exists.  
**Steps:**
1. Attempt to create another room with the same room number.
2. Click Save.

**Expected Result:** The duplicate room is rejected and the existing room remains unchanged.

## TC-ROOM-003: Zero Capacity
**Steps:**
1. Open room creation.
2. Enter capacity as `0`.
3. Click Save.

**Expected Result:** The invalid capacity is rejected with a clear validation message.

## TC-ROOM-004: Negative Capacity
**Steps:**
1. Enter capacity as `-1`.
2. Click Save.

**Expected Result:** The invalid capacity is rejected and the room is not saved.

## TC-ROOM-005: Required Fields Validation
**Steps:**
1. Leave a required room field empty.
2. Click Save.

**Expected Result:** A validation message appears and the invalid room is not saved.

## TC-ROOM-006: View Empty Room Occupancy
**Precondition:** A room exists with no active student allocations.  
**Steps:**
1. Open the room details.

**Expected Result:** Occupancy is shown as `0`, and available capacity matches the room's total capacity.

## TC-ROOM-007: Occupancy After Allocation
**Precondition:** A room exists and the allocation feature is available.  
**Steps:**
1. Allocate one student to the room.
2. View the room's occupancy and available capacity.

**Expected Result:** Occupancy increases by one and available capacity decreases by one.

## Execution Note
These test cases are planned and have not yet been executed. Record actual results only after testing a working application.
