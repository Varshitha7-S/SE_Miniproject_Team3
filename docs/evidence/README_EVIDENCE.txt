HMS EVIDENCE FOLDER — SCREENSHOT INDEX
Project: Hostel Management System
Existing evidence retained from the latest project ZIP; new reviewer evidence added on 07 Nov 2026.

STUDENT
01-dashboard-initial-empty.png — Initial dashboard with zero counts.
02-student-list-empty.png — Empty student list and search field.
03-student-add-form.png — Add-student form.
04-student-created-success.png — Student created confirmation and new student row.
05-student-details-view.png — Opened student details panel.
06-student-invalid-id-format.png — Invalid student ID format validation.
07-student-duplicate-id-rejected.png — Duplicate student ID rejected.
08-student-required-id-validation.png — Student ID required validation.
09-student-details-and-search-list.png — Student detail panel and search area.
10-student-search-by-id.png — Search using student ID.
11-student-search-by-name.png — Search using student name.
12-student-search-no-match.png — No-match student search.
13-student-update-success.png — Student update confirmation.

ROOM
14-room-availability-filter-options.png — Room filter dropdown options.
15-room-invalid-number-format.png — Invalid room number format validation.
16-room-created-success.png — Room added confirmation and room row.
17-room-duplicate-number-rejected.png — Duplicate room rejected.
18-room-zero-capacity-validation.png — Capacity 0 rejected with positive-whole-number message.
19-room-list-empty-occupancy.png — C301 and C302 show occupancy 0/4 and free 4.
20-room-required-number-validation.png — Clean required-room-number validation screenshot; empty room number and required-field message are visible, with no green prior-success banner.
33-room-negative-capacity-validation.png — Capacity -1 rejected with positive-whole-number validation message; no room was created.
34-room-filter-with-free-space-results.png — With free space selected; actual filtered room list shows rooms with available capacity. The UI applies this filter immediately; there is no Apply button.

ALLOCATION / DASHBOARD
21-allocation-form-no-matching-records.png — Allocation page with no matching allocation records.
22-active-allocation-change-room-control.png — Active AL001 with Change room and Vacate controls.
23-room-occupancy-after-allocation.png — C301 occupancy 1/4 after allocation.
24-dashboard-intermediate-counts.png — Intermediate dashboard snapshot.
25-dashboard-after-allocation-change.png — Dashboard snapshot after allocation change.
26-duplicate-active-allocation-rejected.png — Duplicate active allocation rejected.
27-allocation-success-and-full-room-rejection.png — Successful allocation to RC303 followed by room-full rejection.
28-vacated-allocation-records.png — Vacated allocation records.
29-vacated-filter-room-C301.png — Vacated filter with room C301.
30-vacated-filter-no-match-C303.png — Vacated filter with room C303 and no matching allocation.
31-dashboard-final-counts.png — Earlier final dashboard snapshot.
32-invalid-student-allocation-rejected.png — Authenticated API request with nonexistent student ID; HTTP 404 rejection.
35-dashboard-before-vacating.png — Dashboard immediately before vacating HMS-STU-001 from RC303: occupied 1, free 12, capacity 13.
37-allocation-vacated-confirmation.png — Confirmation that HMS-STU-001 was vacated from RC303.
36-dashboard-after-vacating.png — Dashboard after vacating: occupied 0, free 13, capacity 13.

REVIEWER CORRECTION STATUS
- TC-ROOM-003: Existing capacity-0 evidence retained; new capacity -1 evidence added.
- TC-ROOM-005: Clean required-field screenshot supplied on 07 Nov 2026; the empty room number and validation message are visible without a green prior-success banner.
- TC-ROOM-007: Before/after room occupancy screenshots are 19-room-list-empty-occupancy.png (0/4) and 23-room-occupancy-after-allocation.png (1/4).
- TC-FILT-001: Filter options are in 14-room-availability-filter-options.png; actual filtered result is in 34-room-filter-with-free-space-results.png.
- TC-ALLOC-001: AL001 is shown in 22-active-allocation-change-room-control.png; occupancy before/after is shown in 19 and 23.
- TC-ALLOC-006: Both successful allocation and subsequent full-room rejection are shown in 27-allocation-success-and-full-room-rejection.png.
- TC-DASH-004: Before, operation confirmation, and after are shown in 35, 37, and 36 respectively. Dashboard values changed from occupied 1/free 12 to occupied 0/free 13; total capacity remained 13.

Important: This archive contains the evidence folder only. It does not include the test-case documents or execution log. Update those separately after the clean TC-ROOM-005 screenshot is captured.
