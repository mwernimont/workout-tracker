# Programs
## Create Program
curl -X POST http://localhost:3000/programs \
  -H "Content-Type: application/json" \
  -d '{"title": "Strength Block"}'
## Add Workout to Program
curl -X POST http://localhost:3000/programs/1/workouts \
  -H "Content-Type: application/json" \
  -d '{"workoutId": 1, "order": 1}'
## Get All Programs
curl http://localhost:3000/programs
## Get Specific Program
curl http://localhost:3000/programs/1
## Update Program Details
curl -X PATCH http://localhost:3000/programs/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Hypertrophy Block"}'
## Set Program as Default
curl -X PATCH http://localhost:3000/programs/1/default
## Delete Program
curl -X DELETE http://localhost:3000/programs/1
# Workouts
## Create Workout
curl -X POST http://localhost:3000/workouts \
  -H "Content-Type: application/json" \
  -d '{"title": "Push Day", "date": "2026-04-15"}'
## Import Workout
curl -X POST http://localhost:3000/workouts/import \
  -H "Content-Type: application/json" \
  -d '{
  "title": "Push Day",
  "date": "2026-04-15T14:49:42.545Z",
  "exercises": [
    {
      "exerciseId": 1,
      "order": 1,
      "setCount": 3,
      "setType": "REPS",
      "repTarget": 10
    }
  ]
}'
## Add Exercise to Workout
### Happy Path
curl -X POST http://localhost:3000/workouts/1/exercises \
  -H "Content-Type: application/json" \
  -d '{"exerciseId": 1, "order": 1, "setCount": "3", "setType": "REPS"}'
### Sad Paths
<!-- exercise does not exist -->
curl -X POST http://localhost:3000/workouts/1/exercises \
  -H "Content-Type: application/json" \
  -d '{"exerciseId": 999, "order": 1, "setCount": "3", "setType": "REPS"}'

  ---
  <!-- workout does not exist -->
  curl -X POST http://localhost:3000/workouts/999/exercises \
  -H "Content-Type: application/json" \
  -d '{"exerciseId": 1, "order": 1, "setCount": "3", "setType": "REPS"}'

  ---
  <!-- setCount is not set -->
  curl -X POST http://localhost:3000/workouts/1/exercises \
  -H "Content-Type: application/json" \
  -d '{"exerciseId": 1, "order": 1, "setType": "REPS"}'

  ---

  <!-- setType is not wrong -->
  curl -X POST http://localhost:3000/workouts/1/exercises \
  -H "Content-Type: application/json" \
  -d '{"exerciseId": 1, "order": 1, "setCount": "3", "setType": "JUMPS"}'

  <!-- setType is missing -->
  curl -X POST http://localhost:3000/workouts/1/exercises \
  -H "Content-Type: application/json" \
  -d '{"exerciseId": 1, "order": 1, "setCount": "3"}'
## Find All Workouts
curl http://localhost:3000/workouts

## Find specific Workout
curl http://localhost:3000/workouts/1
## Patch Workout
curl -X PATCH http://localhost:3000/workouts/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Push Day"}'
## Patch Exercise in Workout
curl -X PATCH http://localhost:3000/workouts/1/exercises/1 \
  -H "Content-Type: application/json" \
  -d '{"order": 3, "setCount": 4 }'
## Delete Workout
curl -X DELETE http://localhost:3000/workouts/9999
## Delete Exercise from Workout
curl -X DELETE http://localhost:3000/workouts/7/exercises/1
# Exercises
## Find All Exercises
curl http://localhost:3000/exercises
## Find specific Exercise
curl http://localhost:3000/exercises/1
## Create Exercise
### Happy Paths
curl -X POST http://localhost:3000/exercises \
  -H "Content-Type: application/json" \
  -d '{"name": "Mcdaddy"}'

  ---

curl -X POST http://localhost:3000/exercises \
  -H "Content-Type: application/json" \
  -d '{"name": "Test2", "bodyParts": [{"bodyPart": "CHEST"}, {"bodyPart": "TRICEPS"}]}'
  ### Sad Path
curl -X POST http://localhost:3000/exercises \
  -H "Content-Type: application/json" \
  -d '{"name": "Test3", "bodyParts": [{"bodyPart": "CHEEST"}, {"bodyPart": "TRICEPS"}]}'
