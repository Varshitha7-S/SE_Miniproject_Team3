# Room Management Test Cases

**Project:** Hostel Management System  
**Tester:** Shailaja P.C.  
**Backlog Item:** HMS-030  
**Sprint:** Sprint 1  
**Status:** Executed

## TC-ROOM-001: Add Room with Valid Details

**Requirement:** HMS-FR-005

**Precondition:** The room creation feature is available.

**Steps:**
1. Open the room management page.
2. Enter a unique room number and valid capacity.
3. Click Save.

**Expected Result:** The room is saved and appears in the room list.

**Evidence:** [Room Created Successfully](../docs/evidence/16-room-created-success.png)

## TC-ROOM-002: Duplicate Room Number

**Requirement:** HMS-FR-005

**Precondition:** A room with the test room number already exists.

**Steps:**
1. Attempt to create another room with the same room number.
2. Click Save.

**Expected Result:** The duplicate room is rejected and the existing room remains unchanged.

**Evidence:** [Duplicate Room Rejected](../docs/evidence/17-room-duplicate-number-rejected.png)

## TC-ROOM-003: Invalid Capacity (Zero or Negative)

**Requirement:** HMS-FR-005

**Steps:**
1. Open room creation.
2. Enter capacity as `0` and click Save.
3. Repeat with capacity as `-1`.
4. Observe the validation messages.

**Expected Result:**
- Capacity `0` must be rejected.
- Capacity `-1` must be rejected.
- Appropriate validation messages must be displayed.
- No room with an invalid capacity must be saved.

**Actual Result:** Both zero and negative capacity values were rejected by the application. The application displayed validation messages and did not accept the invalid capacity values.

**Status:** PASS

**Evidence:**
- [Zero Capacity Validation](../docs/evidence/18-room-zero-capacity-validation.png)
- [Negative Capacity Validation](../docs/evidence/33-room-negative-capacity-validation.png)

## TC-ROOM-004: View Empty Room Occupancy

**Requirement:** HMS-FR-006

**Precondition:** A room exists with no active student allocations.

**Steps:**
1. Open the room details or room list.
2. Check the displayed occupancy and available capacity.

**Expected Result:** Occupancy is shown as `0`, and available capacity matches the room's total capacity.

**Evidence:** [Empty Room Occupancy](../docs/evidence/19-room-list-empty-occupancy.png)

## TC-ROOM-005: Required Fields Validation

**Requirements:** HMS-FR-016, HMS-NFR-007

**Steps:**
1. Open room creation.
2. Leave the required room number field empty.
3. Click Save.

**Expected Result:** A validation message appears and the invalid room is not saved.

**Evidence:** [Required Room Number Validation](../docs/evidence/20-room-required-number-validation.png)

## TC-ROOM-007: Occupancy After Allocation

**Requirement:** HMS-FR-006

**Precondition:** Room RC301 exists with capacity 4 and no active student allocations.

**Steps:**
1. Record RC301's current occupancy and available capacity.
2. Allocate one student to RC301.
3. View the room's occupancy and available capacity again.
4. Compare the before-and-after values.

**Expected Result:** Occupancy increases by one and available capacity decreases by one.

**Actual Result:** RC301 occupancy increased from `0/4` to `1/4` after one student was allocated. Available capacity decreased from `4` to `3`.

**Status:** PASS

**Evidence:**
- [Before Allocation – 0/4](../docs/evidence/19-room-list-empty-occupancy.png)
- [After Allocation – 1/4](../docs/evidence/23-room-occupancy-after-allocation.png)
