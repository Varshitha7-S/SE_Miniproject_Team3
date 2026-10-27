# Allocation Management Test Cases

**Project:** Hostel Management System  
**Tester:** Shailaja  
**Backlog Item:** HMS-025  
**Sprint:** Sprint 1  
**Status:** Execution recorded — see individual test results below.

## TC-ALLOC-001: Allocate Student to an Available Room

**Requirement:** HMS-FR-007

**Preconditions:** A valid student exists and the room has available capacity.

**Steps:**
1. Select the student.
2. Select the available room.
3. Submit the allocation.

**Expected Result:** The allocation is recorded successfully, and room occupancy increases by one.

**Actual Result:** Active allocation AL001 was recorded for student HMS-STU-001 in room RC301.

**Execution Status:** PASS

## TC-ALLOC-002: Reject Allocation to a Full Room

**Requirement:** HMS-FR-008

**Preconditions:** The selected room has reached its maximum capacity.

**Steps:**
1. Select a valid student.
2. Select the full room.
3. Submit the allocation.

**Expected Result:** The allocation is rejected, and occupancy remains unchanged.

**Actual Result:** An additional allocation to full room RC303 was rejected with a room-full validation message.

**Execution Status:** PASS

## TC-ALLOC-003: Prevent Duplicate Active Allocation

**Requirement:** HMS-FR-009

**Preconditions:** The student already has an active room allocation.

**Steps:**
1. Select the same student.
2. Attempt to allocate the student to another room.

**Expected Result:** The duplicate active allocation is rejected, and existing allocation records remain unchanged.

**Actual Result:** The duplicate active allocation was rejected.

**Execution Status:** PASS

## TC-ALLOC-004: Change Student Room

**Requirement:** HMS-FR-010

**Preconditions:** The student has an active allocation, and the destination room has available capacity.

**Steps:**
1. Select the student.
2. Choose the change-room action.
3. Select the destination room.
4. Confirm the change.

**Expected Result:** The student is assigned to the destination room, and both rooms' occupancy values are updated correctly.

**Actual Result:** The change-room operation was tested. The student's allocation was moved to the destination room, and the allocation and room occupancy records were updated.

**Execution Status:** PASS

## TC-ALLOC-005: Vacate an Allocated Room

**Requirement:** HMS-FR-011

**Preconditions:** The student has an active room allocation.

**Steps:**
1. Select the student or active allocation.
2. Choose the vacate-room action.
3. Confirm the action.

**Expected Result:** The active allocation is ended, and room occupancy decreases by one.

**Actual Result:** The allocation was vacated successfully, and the dashboard updated accordingly.

**Execution Status:** PASS

## TC-ALLOC-006: Test Room Capacity Boundary

**Requirements:** HMS-FR-008, HMS-NFR-003

**Preconditions:** A room has exactly one available space.

**Steps:**
1. Allocate a valid student to that room.
2. Attempt another allocation after the room becomes full.

**Expected Result:** The first allocation succeeds; the second is rejected. Occupancy never exceeds room capacity.

**Actual Result:** Room RC303 reached its capacity of 1. An additional allocation was rejected because the room was full.

**Execution Status:** PASS

## TC-ALLOC-007: Reject Invalid Student or Room

**Requirements:** HMS-FR-007, HMS-SR-002

**Preconditions:** An invalid/nonexistent student ID or room ID can be submitted for validation.

**Steps:**
1. Attempt an allocation using an invalid student or room ID.
2. Submit the request.

**Expected Result:** The invalid allocation is rejected with an appropriate error, and no allocation or occupancy data is incorrectly changed.

**Actual Result:** The invalid student/room validation case was tested, and the invalid allocation was rejected.

**Execution Status:** PASS

## Execution Note

Manual allocation execution results have been recorded under HMS-032. The results above reflect the allocation scenarios tested.
