# Filter and Dashboard Test Cases

**Project:** Hostel Management System  
**Tester:** Shailaja  
**Backlog Item:** HMS-031  
**Sprint:** Sprint 2  
**Status:** Execution recorded — see individual test results below.

## TC-FILT-001: Filter Rooms by Availability

**Requirement:** HMS-FR-013  
**Precondition:** Rooms with different availability statuses exist.

**Steps:**
1. Open the room management page.
2. Select the available-room filter.
3. Apply the filter.

**Expected Result:** Only rooms matching the selected availability are displayed.

**Actual Result:** The "With free space" filter displayed rooms with available capacity.

**Execution Status:** PASS

## TC-FILT-002: Filter Allocations by Status

**Requirement:** HMS-FR-013  
**Precondition:** Allocations with different statuses exist.

**Steps:**
1. Open the allocation list.
2. Select an allocation status filter.
3. Apply the filter.

**Expected Result:** Only allocations matching the selected status are displayed.

**Actual Result:** The Vacated filter displayed only vacated allocations.

**Execution Status:** PASS

## TC-FILT-003: Filter with No Matching Results

**Requirement:** HMS-FR-013

**Steps:**
1. Apply a filter for which no records match.

**Expected Result:** No unrelated records are displayed, and a clear empty-results message appears.

**Actual Result:** Applying the RC303 room filter with Vacated status displayed a no-match message.

**Execution Status:** PASS

## TC-DASH-001: Verify Student Count

**Requirement:** HMS-FR-015  
**Precondition:** Student records exist.

**Steps:**
1. Open the dashboard.
2. Compare the displayed student count with the stored student records.

**Expected Result:** The dashboard student count matches the stored records according to the agreed counting rules.

**Actual Result:** The dashboard displayed 3 students, matching the recorded student count.

**Execution Status:** PASS

## TC-DASH-002: Verify Room Count

**Requirement:** HMS-FR-015  
**Precondition:** Room records exist.

**Steps:**
1. Open the dashboard.
2. Compare the displayed room count with the stored room records.

**Expected Result:** The dashboard room count matches the stored room records.

**Actual Result:** The dashboard displayed 3 rooms.

**Execution Status:** PASS

## TC-DASH-003: Verify Occupancy and Available Capacity

**Requirements:** HMS-FR-015, HMS-FR-006  
**Precondition:** Rooms and active allocations exist.

**Steps:**
1. Open the dashboard.
2. Compare displayed occupancy and available capacity with the room records and active allocations.

**Expected Result:** The displayed values match the underlying data and agreed counting rules.

**Actual Result:** The dashboard showed capacity 9, occupied spaces 2, and free spaces 7. The figures were internally consistent.

**Execution Status:** PASS

## TC-DASH-004: Verify Dashboard After Data Changes

**Requirement:** HMS-FR-015  
**Precondition:** The dashboard and relevant student or room records are available.

**Steps:**
1. Record the current dashboard values.
2. Change a student or room record.
3. Refresh or revisit the dashboard.

**Expected Result:** The dashboard reflects the updated data according to the system's refresh behavior.

**Actual Result:** The dashboard updated after the allocation was vacated.

**Execution Status:** PASS

## Execution Note

Manual filter and dashboard execution results have been recorded under HMS-032. Automated API test results are recorded separately in `backend/tests/api.test.js` and the Test Execution Report.
