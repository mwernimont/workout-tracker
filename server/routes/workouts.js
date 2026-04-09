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

router.get("/", async (req, res) => {
    const workouts = await db.workout.findMany();
    res.json(workouts);
});

module.exports = router;