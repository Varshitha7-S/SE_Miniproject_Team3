# Allocation Management Test Cases

**Project:** Hostel Management System  
**Backlog Item:** HMS-025  
**Sprint:** Sprint 1  
**Owner:** Varshitha S  
**Tester:** Shailaja P.C.  
**Status:** Executed

## TC-ALLOC-001: Allocate Student to an Available Room

**Preconditions:** Student HMS-STU-001 exists and room RC301 has available capacity.

**Steps:**
1. Select student HMS-STU-001.
2. Select room RC301.
3. Submit the allocation.
4. Verify the allocation record.
5. Check room occupancy.

**Expected Result:** The allocation is recorded successfully, and room occupancy increases by one.

**Actual Result:** Allocation AL001 was successfully created for student HMS-STU-001 in room RC301. Room occupancy increased from `0/4` to `1/4`, and available capacity decreased from `4` to `3`.

**Status:** PASS

**Evidence:**
- [Active Allocation AL001](../docs/evidence/22-active-allocation-change-room-control.png)
- [Updated Room Occupancy](../docs/evidence/23-room-occupancy-after-allocation.png)

## TC-ALLOC-002: Reject Allocation to a Full Room

**Preconditions:** The selected room has reached its maximum capacity.

**Steps:**
1. Select a valid student.
2. Select the full room.
3. Submit the allocation.

**Expected Result:** The allocation is rejected, and occupancy remains unchanged.

**Evidence:** [Full Room Rejection](../docs/evidence/27-allocation-success-and-full-room-rejection.png)

## TC-ALLOC-003: Prevent Duplicate Active Allocation

**Preconditions:** The student already has an active room allocation.

**Steps:**
1. Select the same student.
2. Attempt to allocate the student to another room.
3. Observe the system response.

**Expected Result:** The duplicate active allocation is rejected, and existing allocation records remain unchanged.

**Evidence:** [Duplicate Active Allocation Rejected](../docs/evidence/26-duplicate-active-allocation-rejected.png)

## TC-ALLOC-004: Change Student Room

**Preconditions:** The student has an active allocation, and the destination room has available capacity.

**Steps:**
1. Select the student.
2. Choose the change-room action.
3. Select the destination room.
4. Confirm the change.
5. Verify the updated allocation and room occupancy.

**Expected Result:** The student is assigned to the destination room, and both rooms' occupancy values are updated correctly.

**Evidence:**
- [Change-Room Control](../docs/evidence/22-active-allocation-change-room-control.png)
- [Dashboard After Room Change](../docs/evidence/25-dashboard-after-allocation-change.png)

## TC-ALLOC-005: Vacate an Allocated Room

**Preconditions:** The student has an active room allocation.

**Steps:**
1. Select the student or active allocation.
2. Choose the vacate-room action.
3. Confirm the action.
4. Verify the allocation status and room occupancy.

**Expected Result:** The active allocation is ended, and room occupancy decreases by one.

**Evidence:**
- [Allocation Vacated Confirmation](../docs/evidence/37-allocation-vacated-confirmation.png)
- [Dashboard After Vacating](../docs/evidence/36-dashboard-after-vacating.png)

## TC-ALLOC-006: Test Room Capacity Boundary

**Preconditions:** Room RC303 has capacity 1 and is initially empty.

**Steps:**
1. Select a valid student and room RC303.
2. Submit the first allocation.
3. Verify that the allocation succeeds and the room becomes full.
4. Select another valid student.
5. Attempt another allocation to RC303.
6. Verify that the subsequent allocation is rejected.

**Expected Result:** The first allocation succeeds. The subsequent allocation is rejected because the room has reached its maximum capacity. Occupancy never exceeds room capacity.

**Actual Result:** The first allocation of HMS-STU-001 to RC303 succeeded. The room reached its full capacity of `1/1`. A subsequent allocation attempt was rejected with the message `Room RC303 is full`.

**Status:** PASS

**Evidence:** [Successful First Allocation and Subsequent Full-Room Rejection](../docs/evidence/27-allocation-success-and-full-room-rejection.png)

## TC-ALLOC-007: Reject Invalid Student or Room

**Preconditions:** An invalid or nonexistent student ID or room ID can be submitted for validation.

**Steps:**
1. Attempt an allocation using an invalid student or room ID.
2. Submit the request.
3. Observe the API response.

**Expected Result:** The invalid allocation is rejected with an appropriate error, and no allocation or occupancy data is incorrectly changed.

**Actual Result:** An authenticated API request using nonexistent student ID `NO-SUCH-STU-999` and room ID `RC303` returned HTTP `404` with the message `Student NO-SUCH-STU-999 not found`.

**Status:** PASS

**Evidence:** [Invalid Student Allocation Rejected](../docs/evidence/32-invalid-student-allocation-rejected.png)
