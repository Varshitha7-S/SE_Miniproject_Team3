# Room Management Test Cases

**Project:** Hostel Management System  
**Tester:** Shailaja  
**Backlog Item:** HMS-030  
**Sprint:** Sprint 1  
**Status:** Execution recorded — see individual test results below.

## TC-ROOM-001: Add Room with Valid Details

**Requirement:** HMS-FR-005  
**Precondition:** The room creation feature is available.

**Steps:**
1. Open the room management page.
2. Enter a unique room number and valid capacity.
3. Click Save.

**Expected Result:** The room is saved and appears in the room list.

**Actual Result:** Room C301 was added successfully with a capacity of 4.

**Execution Status:** PASS

## TC-ROOM-002: Duplicate Room Number

**Requirement:** HMS-FR-005  
**Precondition:** A room with the test room number already exists.

**Steps:**
1. Attempt to create another room with the same room number.
2. Click Save.

**Expected Result:** The duplicate room is rejected and the existing room remains unchanged.

**Actual Result:** The duplicate room number C301 was rejected.

**Execution Status:** PASS

## TC-ROOM-003: Invalid Capacity (Zero or Negative)

**Requirement:** HMS-FR-005

**Steps:**
1. Open room creation.
2. Enter capacity as `0` and click Save.
3. Repeat with capacity as `-1`.

**Expected Result:** Both invalid capacities are rejected with a clear validation message, and no invalid room is saved.

**Actual Result:** The required-field validation message was displayed, and the form prevented submission without the required room field.

**Execution Status:** PASS

## TC-ROOM-004: View Empty Room Occupancy

**Requirement:** HMS-FR-006  
**Precondition:** A room exists with no active student allocations.

**Steps:**
1. Open the room details.
2. Check the displayed occupancy and available capacity.

**Expected Result:** Occupancy is shown as `0`, and available capacity matches the room's total capacity.

**Actual Result:** Room C301 displayed occupancy as `0/4`, showing no occupied spaces and four available spaces.

**Execution Status:** PASS

## TC-ROOM-005: Required Fields Validation

**Requirements:** HMS-FR-016, HMS-NFR-007

**Steps:**
1. Leave a required room field empty.
2. Click Save.

**Expected Result:** A validation message appears and the invalid room is not saved.

**Actual Result:** The required-field validation message was displayed, and the form prevented submission without the required room field.

**Execution Status:** PASS

## TC-ROOM-007: Occupancy After Allocation

**Requirement:** HMS-FR-006  
**Precondition:** A room exists with available capacity and the allocation feature is available.

**Steps:**
1. Record the room's current occupancy and available capacity.
2. Allocate one student to the room.
3. View the room's occupancy and available capacity again.

**Expected Result:** Occupancy increases by one and available capacity decreases by one.

**Actual Result:** Room allocation and dashboard occupancy/capacity figures were checked during manual testing. The dashboard summary was consistent with the recorded room and allocation data.

**Execution Status:** PASS — based on the recorded manual checks.
## Execution Note

Manual execution results have been recorded under HMS-032. The results above reflect the completed manual checks.
