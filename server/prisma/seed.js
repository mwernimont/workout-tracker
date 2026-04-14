const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

const exercises = [
  // CHEST
  { name: 'Bench Press', bodyParts: ['CHEST'] },
  { name: 'Incline Bench Press', bodyParts: ['CHEST'] },
  { name: 'Decline Bench Press', bodyParts: ['CHEST'] },
  { name: 'Dumbbell Fly', bodyParts: ['CHEST'] },
  { name: 'Cable Fly', bodyParts: ['CHEST'] },
  { name: 'Push Up', bodyParts: ['CHEST'] },
  { name: 'Dips', bodyParts: ['CHEST', 'TRICEPS'] },

  // BACK
  { name: 'Pull Up', bodyParts: ['BACK'] },
  { name: 'Barbell Row', bodyParts: ['BACK'] },
  { name: 'Dumbbell Row', bodyParts: ['BACK'] },
  { name: 'Lat Pulldown', bodyParts: ['BACK'] },
  { name: 'Seated Cable Row', bodyParts: ['BACK'] },
  { name: 'Deadlift', bodyParts: ['BACK', 'LEGS'] },
  { name: 'Face Pull', bodyParts: ['BACK', 'SHOULDERS'] },

  // LEGS
  { name: 'Squat', bodyParts: ['LEGS'] },
  { name: 'Front Squat', bodyParts: ['LEGS'] },
  { name: 'Leg Press', bodyParts: ['LEGS'] },
  { name: 'Romanian Deadlift', bodyParts: ['LEGS'] },
  { name: 'Leg Curl', bodyParts: ['LEGS'] },
  { name: 'Leg Extension', bodyParts: ['LEGS'] },
  { name: 'Lunges', bodyParts: ['LEGS'] },
  { name: 'Calf Raise', bodyParts: ['LEGS'] },
  { name: 'Hip Thrust', bodyParts: ['LEGS'] },

  // SHOULDERS
  { name: 'Overhead Press', bodyParts: ['SHOULDERS'] },
  { name: 'Dumbbell Shoulder Press', bodyParts: ['SHOULDERS'] },
  { name: 'Lateral Raise', bodyParts: ['SHOULDERS'] },
  { name: 'Front Raise', bodyParts: ['SHOULDERS'] },
  { name: 'Reverse Fly', bodyParts: ['SHOULDERS', 'BACK'] },
  { name: 'Arnold Press', bodyParts: ['SHOULDERS'] },

  // BICEPS
  { name: 'Barbell Curl', bodyParts: ['BICEPS'] },
  { name: 'Dumbbell Curl', bodyParts: ['BICEPS'] },
  { name: 'Hammer Curl', bodyParts: ['BICEPS'] },
  { name: 'Incline Dumbbell Curl', bodyParts: ['BICEPS'] },
  { name: 'Cable Curl', bodyParts: ['BICEPS'] },
  { name: 'Preacher Curl', bodyParts: ['BICEPS'] },

  // TRICEPS
  { name: 'Tricep Pushdown', bodyParts: ['TRICEPS'] },
  { name: 'Skull Crushers', bodyParts: ['TRICEPS'] },
  { name: 'Overhead Tricep Extension', bodyParts: ['TRICEPS'] },
  { name: 'Close Grip Bench Press', bodyParts: ['TRICEPS', 'CHEST'] },
  { name: 'Diamond Push Up', bodyParts: ['TRICEPS'] },

  // FOREARMS
  { name: 'Wrist Curl', bodyParts: ['FOREARMS'] },
  { name: 'Reverse Wrist Curl', bodyParts: ['FOREARMS'] },
  { name: 'Farmers Carry', bodyParts: ['FOREARMS'] },

  // CORE
  { name: 'Plank', bodyParts: ['CORE'] },
  { name: 'Crunch', bodyParts: ['CORE'] },
  { name: 'Leg Raise', bodyParts: ['CORE'] },
  { name: 'Russian Twist', bodyParts: ['CORE'] },
  { name: 'Ab Wheel Rollout', bodyParts: ['CORE'] },
  { name: 'Cable Crunch', bodyParts: ['CORE'] },
  { name: 'Hanging Knee Raise', bodyParts: ['CORE'] },
];

async function main() {
  console.log('Seeding exercise library...');

  for (const ex of exercises) {
    await db.exercise.create({
      data: {
        name: ex.name,
        bodyParts: {
          create: ex.bodyParts.map(bp => ({ bodyPart: bp }))
        }
      }
    });
  }

  console.log(`Seeded ${exercises.length} exercises.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });