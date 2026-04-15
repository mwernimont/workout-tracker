const express = require('express')
const router = express.Router()
const prisma = require('../db')

//Create Workout
router.post('/', async (req, res) => {
    const title = req.body.title;
    const date = req.body.date
    if(!title){
        return res.status(400).json({ success: false, message: 'Workouts must have a title' });
    }
    const workout = await prisma.workout.create({
        data: { title, date }
    })
    res.status(201).json(workout)
})



module.exports = router