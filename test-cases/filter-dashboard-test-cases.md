
# Filter and Dashboard Test Cases

**Project:** Hostel Management System  
**Tester:** Shailaja  
**Backlog Item:** HMS-031  
**Sprint:** Sprint 2  
**Status:** Planned — not yet executed

## TC-FILT-001: Filter Rooms by Availability
**Requirement:** HMS-FR-013  
**Precondition:** Rooms with different availability statuses exist.  
**Steps:**
1. Open the room management page.
2. Select the available-room filter.
3. Apply the filter.

**Expected Result:** Only rooms matching the selected availability are displayed.

## TC-FILT-002: Filter Allocations by Status
**Requirement:** HMS-FR-013  
**Precondition:** Allocations with different statuses exist.  
**Steps:**
1. Open the allocation list.
2. Select an allocation status filter.
3. Apply the filter.

**Expected Result:** Only allocations matching the selected status are displayed.

## TC-FILT-003: Filter with No Matching Results
**Requirement:** HMS-FR-013  
**Steps:**
1. Apply a filter for which no records match.

**Expected Result:** No unrelated records are displayed, and a clear empty-results message appears.

## TC-DASH-001: Verify Student Count
**Requirement:** HMS-FR-015  
**Precondition:** Student records exist.  
**Steps:**
1. Open the dashboard.
2. Compare the displayed student count with the stored student records.

**Expected Result:** The dashboard student count matches the stored records according to the agreed counting rules.

## TC-DASH-002: Verify Room Count
**Requirement:** HMS-FR-015  
**Precondition:** Room records exist.  
**Steps:**
1. Open the dashboard.
2. Compare the displayed room count with the stored room records.

**Expected Result:** The dashboard room count matches the stored room records.

## TC-DASH-003: Verify Occupancy and Available Capacity
**Requirements:** HMS-FR-015, HMS-FR-006  
**Precondition:** Rooms and active allocations exist.  
**Steps:**
1. Open the dashboard.
2. Compare displayed occupancy and available capacity with the room records and active allocations.

**Expected Result:** The displayed values match the underlying data and agreed counting rules.

## TC-DASH-004: Verify Dashboard After Data Changes
**Requirement:** HMS-FR-015  
**Precondition:** The dashboard and relevant student or room records are available.  
**Steps:**
1. Record the current dashboard values.
2. Change a student or room record.
3. Refresh or revisit the dashboard.

**Expected Result:** The dashboard reflects the updated data according to the system's refresh behavior.

## Execution Note
These test cases are planned and have not yet been executed. Record actual results only after testing a working application.


