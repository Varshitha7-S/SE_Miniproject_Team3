# Allocation Management Test Cases

**Backlog Item:** HMS-025  
**Sprint:** Sprint 1  
**Owner:** Varshitha S  
**Status:** Execution in progress — selected cases executed; see test-execution-log.md

## TC-ALLOC-001: Allocate Student to an Available Room
- **Preconditions:** A valid student exists and the room has available capacity.
- **Steps:**
  1. Select the student.
  2. Select the available room.
  3. Submit the allocation.
- **Expected Result:** The allocation is recorded successfully, and room occupancy increases by one.

## TC-ALLOC-002: Reject Allocation to a Full Room
- **Preconditions:** The selected room has reached its maximum capacity.
- **Steps:**
  1. Select a valid student.
  2. Select the full room.
  3. Submit the allocation.
- **Expected Result:** The allocation is rejected, and occupancy remains unchanged.

## TC-ALLOC-003: Prevent Duplicate Active Allocation
- **Preconditions:** The student already has an active room allocation.
- **Steps:**
  1. Select the same student.
  2. Attempt to allocate the student to another room.
- **Expected Result:** The duplicate active allocation is rejected, and existing allocation records remain unchanged.

## TC-ALLOC-004: Change Student Room
- **Preconditions:** The student has an active allocation, and the destination room has available capacity.
- **Steps:**
  1. Select the student.
  2. Choose the change-room action.
  3. Select the destination room.
  4. Confirm the change.
- **Expected Result:** The student is assigned to the destination room, and both rooms' occupancy values are updated correctly.

## TC-ALLOC-005: Vacate an Allocated Room
- **Preconditions:** The student has an active room allocation.
- **Steps:**
  1. Select the student or active allocation.
  2. Choose the vacate-room action.
  3. Confirm the action.
- **Expected Result:** The active allocation is ended, and room occupancy decreases by one.

## TC-ALLOC-006: Test Room Capacity Boundary
- **Preconditions:** A room has exactly one available space.
- **Steps:**
  1. Allocate a valid student to that room.
  2. Attempt another allocation after the room becomes full.
- **Expected Result:** The first allocation succeeds; the second is rejected. Occupancy never exceeds room capacity.

## TC-ALLOC-007: Reject Invalid Student or Room
- **Preconditions:** An invalid/nonexistent student ID or room ID can be submitted for validation.
- **Steps:**
  1. Attempt an allocation using an invalid student or room ID.
  2. Submit the request.
- **Expected Result:** The invalid allocation is rejected with an appropriate error, and no allocation or occupancy data is incorrectly changed.

## Review Notes
- Review these cases with the Product Owner.
- Map the cases to the relevant requirements in the Requirements Traceability Matrix (RTM).
- Update the status to Executed only after testing has actually been performed.
- Confirm the exact application fields and workflows with the development team before execution.
