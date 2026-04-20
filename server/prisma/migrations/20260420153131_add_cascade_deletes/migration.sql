-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExerciseBodyPart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "exerciseId" INTEGER NOT NULL,
    "bodyPart" TEXT NOT NULL,
    CONSTRAINT "ExerciseBodyPart_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ExerciseBodyPart" ("bodyPart", "exerciseId", "id") SELECT "bodyPart", "exerciseId", "id" FROM "ExerciseBodyPart";
DROP TABLE "ExerciseBodyPart";
ALTER TABLE "new_ExerciseBodyPart" RENAME TO "ExerciseBodyPart";
CREATE TABLE "new_ProgramWorkout" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "programId" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    CONSTRAINT "ProgramWorkout_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProgramWorkout_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProgramWorkout" ("id", "order", "programId", "workoutId") SELECT "id", "order", "programId", "workoutId" FROM "ProgramWorkout";
DROP TABLE "ProgramWorkout";
ALTER TABLE "new_ProgramWorkout" RENAME TO "ProgramWorkout";
CREATE TABLE "new_SetLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "workoutExerciseId" INTEGER NOT NULL,
    "setNumber" INTEGER NOT NULL,
    "actualReps" INTEGER,
    "actualTime" INTEGER,
    "weight" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SetLog_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "WorkoutExercise" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SetLog" ("actualReps", "actualTime", "createdAt", "id", "setNumber", "weight", "workoutExerciseId") SELECT "actualReps", "actualTime", "createdAt", "id", "setNumber", "weight", "workoutExerciseId" FROM "SetLog";
DROP TABLE "SetLog";
ALTER TABLE "new_SetLog" RENAME TO "SetLog";
CREATE TABLE "new_WorkoutExercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "workoutId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "setCount" INTEGER NOT NULL,
    "setType" TEXT NOT NULL,
    "repTarget" INTEGER,
    "timeTarget" INTEGER,
    "circuitGroup" INTEGER,
    CONSTRAINT "WorkoutExercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WorkoutExercise" ("circuitGroup", "exerciseId", "id", "order", "repTarget", "setCount", "setType", "timeTarget", "workoutId") SELECT "circuitGroup", "exerciseId", "id", "order", "repTarget", "setCount", "setType", "timeTarget", "workoutId" FROM "WorkoutExercise";
DROP TABLE "WorkoutExercise";
ALTER TABLE "new_WorkoutExercise" RENAME TO "WorkoutExercise";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
