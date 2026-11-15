
# HMS Final Demonstration Script

## 1. Introduction

* Introduce Team 3 and the Hostel Management System (HMS).
* State the MVP objective: Centralized student, room, and allocation management.

## 2. Core Workflows (Live Demo)

* **Auth:** Log in as Administrator using JWT.
* **Student Management:** Create a new student (show validation). Edit their details.
* **Room Management:** Show the room list. Demonstrate that creating a room with negative capacity fails.
* **Allocation:** Allocate the new student to an available room. Attempt to allocate them *again* to show the duplicate active allocation rejection.
* **Vacating & History:** Vacate the student, showing the room capacity incrementing. Show the student's allocation history and fee status.
* **Dashboard:** Show the final dashboard counts reflecting the live data.

## 3. Deviations & Unimplemented Requirements

* **Dropped Feature:** Student-facing login and self-service features were explicitly dropped from the MVP scope to focus on administrative data integrity.
* **Limitation:** The current system uses mock/demo data and does not feature live payment gateway integration or university ERP syncing, as per the academic constraints of the project.
