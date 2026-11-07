# Filter and Dashboard Test Cases

**Project:** Hostel Management System  
**Tester:** Shailaja P.C.  
**Backlog Item:** HMS-031  
**Sprint:** Sprint 2  
**Status:** Executed

## TC-FILT-001: Filter Rooms by Availability

**Requirement:** HMS-FR-013

**Steps:**
1. Open room management.
2. Select the availability filter.
3. Observe the displayed room list.

**Expected Result:** Only rooms matching the selected availability are displayed. The filter updates automatically when selected; no Apply button is required.

**Actual Result:** Selecting the free-space filter displayed rooms with available capacity.

**Status:** PASS

**Evidence:** [Free-Space Filter Results](../docs/evidence/34-room-filter-with-free-space-results.png)

## TC-FILT-002: Filter Allocations by Status

**Requirement:** HMS-FR-013

**Steps:**
1. Open the allocation list.
2. Select an allocation status.
3. Observe the displayed allocation records.

**Expected Result:** Only allocations matching the selected status are displayed.

**Evidence:**
- [Vacated Allocation Records](../docs/evidence/28-vacated-allocation-records.png)
- [Vacated Filter – Room C301](../docs/evidence/29-vacated-filter-room-C301.png)

## TC-FILT-003: Filter with No Matching Results

**Requirement:** HMS-FR-013

**Steps:**
1. Select the Vacated allocation status.
2. Select room C303.
3. Observe the results.

**Expected Result:** A clear empty-results message appears, without unrelated records.

**Evidence:** [No Matching Results – C303](../docs/evidence/30-vacated-filter-no-match-C303.png)

## TC-DASH-001: Verify Student Count

**Requirement:** HMS-FR-015

**Steps:**
1. Open the dashboard.
2. Compare the displayed student count with the student records.

**Expected Result:** The dashboard count matches the stored student records according to the application's counting rules.

**Actual Result:** The dashboard displayed 3 students.

**Status:** PASS

**Evidence:**
- [Intermediate Dashboard Counts](../docs/evidence/24-dashboard-intermediate-counts.png)
- [Final Dashboard Counts](../docs/evidence/31-dashboard-final-counts.png)

## TC-DASH-002: Verify Room Count

**Requirement:** HMS-FR-015

**Steps:**
1. Open the dashboard.
2. Compare the displayed room count with the stored room records.

**Expected Result:** The dashboard count matches the stored room records.

**Actual Result:** The dashboard displayed 3 rooms.

**Status:** PASS

**Evidence:**
- [Intermediate Dashboard Counts](../docs/evidence/24-dashboard-intermediate-counts.png)
- [Final Dashboard Counts](../docs/evidence/31-dashboard-final-counts.png)

## TC-DASH-003: Verify Occupancy and Available Capacity

**Requirements:** HMS-FR-015, HMS-FR-006

**Steps:**
1. Check the dashboard's total capacity, occupied spaces, and available spaces.
2. Compare the figures with the room capacities and active allocations.

**Expected Result:** The displayed figures match the underlying room and allocation data.

**Actual Result:** The dashboard displayed total capacity of 9, occupied spaces of 2, and available spaces of 7 for the recorded verification.

**Status:** PASS

**Evidence:**
- [Intermediate Dashboard Counts](../docs/evidence/24-dashboard-intermediate-counts.png)
- [Final Dashboard Counts](../docs/evidence/31-dashboard-final-counts.png)

## TC-DASH-004: Verify Dashboard After Vacating an Allocation

**Requirement:** HMS-FR-015

**Preconditions:** An active student allocation exists and the dashboard displays current occupancy information.

**Steps:**
1. Open the dashboard and record occupied spaces, free spaces, and total capacity.
2. Navigate to the allocation management page.
3. Select an active allocation.
4. Choose the vacate-room action.
5. Confirm the action.
6. Return to the dashboard.
7. Verify the updated occupied spaces, free spaces, and total capacity.

**Expected Result:** After an allocation is vacated, occupied spaces decrease by one and free spaces increase by one. Total capacity remains unchanged.

**Actual Result:**

**Before vacating:**
- Occupied spaces: 1
- Free spaces: 12
- Total capacity: 13

**After vacating:**
- Occupied spaces: 0
- Free spaces: 13
- Total capacity: 13

The dashboard correctly reflected the updated occupancy after the allocation was vacated.

**Status:** PASS

**Evidence:**
- [Allocation Vacated Confirmation](../docs/evidence/37-allocation-vacated-confirmation.png)
- [Dashboard Before Vacating](../docs/evidence/35-dashboard-before-vacating.png)
- [Dashboard After Vacating](../docs/evidence/36-dashboard-after-vacating.png)
