# Hostel Management System — Test Dataset

## Purpose

This directory contains fictional sample data for testing the Hostel Management System (HMS).
The dataset supports repeatable functional, negative, and boundary testing.

## Files

| File | Description |
|---|---|
| students.csv | 10 fictional student records |
| rooms.csv | 5 rooms with different capacities and occupancy levels |
| allocations.csv | 6 active and 2 historical vacated allocations |

## Room Scenarios

| Room ID | Capacity | Active Occupancy | Available Spaces | Scenario |
|---|---:|---:|---:|---|
| R101 | 2 | 2 | 0 | Full room |
| R102 | 3 | 2 | 1 | Capacity-boundary case |
| R103 | 2 | 0 | 2 | Empty room |
| R104 | 4 | 1 | 3 | Partially occupied room |
| R105 | 1 | 1 | 0 | Full room with capacity one |

The active allocation records in allocations.csv match the occupancy values in rooms.csv.

## Suggested Test Scenarios

1. Allocate an unallocated student to R102. The allocation should succeed and fill its final available space.
2. Attempt another allocation to R102 after it is full. The allocation should be rejected.
3. Attempt to allocate a student who already has an active allocation. The duplicate active allocation should be rejected.
4. Attempt to allocate an unallocated student to R103. The allocation should succeed if the student and room are valid.
5. Attempt to allocate a nonexistent student or room. The request should be rejected.
6. Vacate an active allocation. The room's available capacity should increase.
7. Change a student's room. The old allocation should end and the new allocation should be recorded correctly.

## Data Integrity Rules

- Student IDs and room IDs must reference records in the corresponding CSV files.
- Each student must have at most one active allocation.
- Active occupancy must never exceed room capacity.
- Vacated allocations are historical records and must not count toward current occupancy.
- The occupancy value in rooms.csv must match the number of active allocation records for each room.

## Reusing the Dataset

Use these CSV files as the baseline test data for each test run. If test execution changes the data, restore the original committed CSV files before repeating the tests.

The application-specific data import or database seeding procedure must be documented once the implementation is available.

## Privacy

All records are fictional and intended only for academic testing. Do not replace them with real student personal information.
