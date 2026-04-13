const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/", async (req, res) => {
    const title = req.body.title;
    const workout = await db.workout.create({
        data: { title }
    });
    res.status(201).json(workout);
});

router.post('/:id/exercises', async (req, res) => {
    const name = req.body.name;
    const id = parseInt(req.params.id);
    if(!name){
        return res.status(400).json({ success: false, message: 'Exercises must have a valid name' });
    }
    const workout = await db.workout.findUnique({where: { id: id }});
    if(!workout){
        return res.status(404).json({ success: false, message: 'Workout does not exist' });
    }
    const exercise = await db.exercise.create({
        data: { name, workoutId: id }
    });
    res.status(201).json(exercise)
})

router.get("/", async (req, res) => {
    const workouts = await db.workout.findMany();
    res.json(workouts);
});

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const workout = await db.workout.findUnique({where: { id: id },
  include: { exercises:{include: {sets: true}} }});
    if(!workout){
        return res.status(404).json({ success: false, message: 'Workout does not exist' });
    }
    res.json(workout);
});

module.exports = router;