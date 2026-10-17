# Filter and Dashboard Test Cases

**Project:** Hostel Management System  
**Tester:** Shailaja  
**Backlog Item:** HMS-031  
**Sprint:** Sprint 2  
**Status:** Planned — not yet executed

## TC-FILT-001: Filter Rooms by Availability
**Steps:** Open room management, select an availability filter, and apply it.  
**Expected Result:** Only rooms matching the selected availability are displayed.

## TC-FILT-002: Filter Allocations by Status
**Steps:** Select an allocation status and apply the filter.  
**Expected Result:** Only allocations matching the selected status are displayed.

## TC-FILT-003: Filter with No Matching Results
**Steps:** Apply a filter for which no records match.  
**Expected Result:** A clear empty-results message appears, without unrelated records.

## TC-DASH-001: Verify Student Count
**Steps:** Compare the dashboard's student count with the student records stored in the system.  
**Expected Result:** The count matches the records according to the agreed counting rules.

## TC-DASH-002: Verify Room Count
**Steps:** Compare the dashboard's room count with the rooms stored in the system.  
**Expected Result:** The count matches the stored room records.

## TC-DASH-003: Verify Occupancy and Available Capacity
**Steps:** Compare dashboard occupancy and availability figures with the active room allocations and room capacities.  
**Expected Result:** The figures match the underlying data and agreed counting rules.

## TC-DASH-004: Verify Dashboard After Data Changes
**Steps:** Change a student or room record, then refresh the dashboard.  
**Expected Result:** The dashboard reflects the updated data according to the system's refresh behavior.

## Execution Note
These test cases are planned and have not yet been executed. Confirm filter options and dashboard counting rules with the team before execution.
