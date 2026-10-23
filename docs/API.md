# HMS REST API (as implemented)

Base URL `http://localhost:5001/api`. All bodies are JSON. Dates are `YYYY-MM-DD`.

**Errors** always have the same shape and never include stack traces: `{ "error": "message" }`, and for validation failures `{ "error": "Validation failed", "fields": { "email": "Email must be a valid address" } }`.

**Auth** (when `AUTH_ENABLED=true`, the default): send `Authorization: Bearer <token>` on every endpoint except `GET /api/health`, `GET /api/auth/status` and `POST /api/auth/login`. Missing or invalid token gives `401`.

| Method and path | Purpose | Request fields | Responses |
|---|---|---|---|
| GET `/health` | Liveness | none | 200 |
| GET `/auth/status` | Is login required? | none | 200 `{authEnabled}` |
| POST `/auth/login` | Get a token | username, password | 200 `{token}`; 400; 401 |
| GET `/students` | List / search | optional `?search=` (ID or name, case-insensitive) | 200 list (empty list when no match) |
| POST `/students` | Create | studentId, fullName, email, phone, course, year (1-6); optional status, feeAmount, feeStatus | 201; 400 field errors; 409 duplicate ID |
| GET `/students/:studentId` | Details plus `activeAllocation` | none | 200; 404 |
| PUT `/students/:studentId` | Update (studentId is immutable) | any of fullName, email, phone, course, year, status, feeAmount, feeStatus | 200; 400; 404 |
| PATCH `/students/:studentId/fee` | Fee tracking (optional) | feeStatus (`Paid`/`Pending`), optional feeAmount (>= 0) | 200; 400; 404 |
| GET `/students/:studentId/allocations` | Allocation history, newest first (optional) | none | 200; 404 |
| GET `/rooms` | List with capacity, occupancy, remainingCapacity, status | optional `?availability=available\|full` | 200; 400 |
| POST `/rooms` | Create (roomId is generated as `R<roomNumber>`) | roomNumber, block, floor (>= 0), capacity (whole number >= 1) | 201; 400 invalid capacity; 409 duplicate room |
| GET `/rooms/:roomId` | One room | none | 200; 404 |
| GET `/allocations` | List / filter | optional `?status=Active\|Vacated&roomId=&studentId=` | 200; 400 |
| POST `/allocations` | Allocate | studentId, roomId, optional startDate (default today) | 201; 400; 404 unknown student/room; 409 full room, inactive student or student already allocated |
| PATCH `/allocations/:id/vacate` | End allocation | optional endDate (not before startDate) | 200; 400; 404; 409 already vacated |
| PATCH `/allocations/:id/change-room` | Move student | roomId, optional startDate | 200 returns the new allocation; 400; 404; 409 full room, same room or already vacated |
| GET `/dashboard` | Summary | none | 200 `{totalStudents, activeStudents, totalRooms, fullRooms, availableRooms, totalCapacity, totalOccupied, freeCapacity, activeAllocations}` |

## Integrity guarantees (HMS-018)

- A seat is taken with one atomic update that checks `occupancy < capacity` and increments in the same step, so concurrent requests cannot overbook a room.
- A partial unique index (`studentId` where `status = Active`) lets the database itself reject a second active allocation.
- Room occupancy is a counter maintained with each allocate, vacate and change-room, and the tests assert that it always equals the number of Active allocation records.
