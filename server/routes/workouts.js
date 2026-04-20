const express = require('express')
const router = express.Router()
const prisma = require('../db')
const validId = require('../middleware/validateId')

const SetTypeArray =  [
  "REPS",
  "TIME"
]

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

//Import Workout
router.post('/import', async (req, res) => {
    const { title, date, exercises } = req.body || {};
    if(!title){
        return res.status(400).json({ success: false, message: 'Workouts must have a title' });
    }
    const workout = await prisma.workout.create({
        data: { title, date, exercises: { create: exercises || [] } }, include: {exercises: true}
    })
    res.status(201).json(workout)
})

//Add Exercise to Workout
router.post('/:id/exercises', validId, async (req, res) => {
    const workoutId = parseInt(req.params.id);
    const exerciseId = parseInt(req.body.exerciseId)
    const setCount = parseInt(req.body.setCount)
    const {order, setType, repTarget, timeTarget, circuitGroup} = req.body;
    
    const workout = await prisma.workout.findUnique({where: {id: workoutId}});
    if(!workout){
        return res.status(404).json({ success: false, message: 'Workout does not exist' });
    }
    const exercise = await prisma.exercise.findUnique({where: {id: exerciseId}});
    if(!exercise){
        return res.status(404).json({ success: false, message: 'Exercise does not exist' });
    }
    if(!order){
         return res.status(400).json({ success: false, message: 'Order must be included' });
    }
    if(!setCount){
         return res.status(400).json({ success: false, message: 'setCount must be set' });
    }
    if(!SetTypeArray.includes(setType)){
        return res.status(400).json({ success: false, message: 'SetType must be in the approved list' })
    }
    const workoutExercise = await prisma.workoutExercise.create({
        data: { workoutId, exerciseId, order, setCount, setType, repTarget, timeTarget, circuitGroup }
    })
    res.status(201).json(workoutExercise)
})


//Get ALL Workouts
router.get("/", async (req, res) => {
    const workouts = await prisma.workout.findMany();
    res.status(200).json(workouts)
})
//Get Specific Workout
router.get("/:id", validId, async (req, res) => {
    const id = parseInt(req.params.id);
    const workout = await prisma.workout.findUnique({where: {id: id}, include: {exercises: true}});
    if(!workout){
        return res.status(404).json({ success: false, message: 'Workout does not exist' });
    }
    res.status(200).json(workout);
})

//Update Workout Details
router.patch("/:id", validId, async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, date } = req.body || {};
    const existing = await prisma.workout.findUnique({ where: { id } })
    if (!existing) {
        return res.status(404).json({ success: false, message: 'Workout does not exist' })
    }
    const workout = await prisma.workout.update({ where: { id }, data: { title, date } })
    res.status(200).json(workout)
})

//Update Exercise Details in a Workout
router.patch("/:id/exercises/:weId", validId, async (req, res) => {
    const weId = parseInt(req.params.weId);
    const { order, setCount, setType, repTarget, timeTarget, circuitGroup } = req.body || {};
    const existing = await prisma.workoutExercise.findUnique({ where: { id: weId } })
    if (!existing) {
        return res.status(404).json({ success: false, message: 'Exercise does not exist in this workout' })
    }
    const workoutExercise = await prisma.workoutExercise.update({ where: { id: weId }, data: { order, setCount, setType, repTarget, timeTarget, circuitGroup } })
    res.status(200).json(workoutExercise)
})

//Delete Workout
router.delete("/:id", validId, async (req, res) => {
    const id = parseInt(req.params.id);
    const existing = await prisma.workout.findUnique({ where: { id } })
    if (!existing) {
        return res.status(404).json({ success: false, message: 'Wokrout does not exist' })
    }
    const workout = await prisma.workout.delete({ where: { id }})
    res.status(200).json(workout)
})

//Delete Exercise from Workout
router.delete("/:id/exercises/:weId", validId, async (req, res) => {
    const id = parseInt(req.params.id);
    const weId = parseInt(req.params.weId)
    const existing = await prisma.workoutExercise.findUnique({ where: { id: weId } })
    if (!existing) {
        return res.status(404).json({ success: false, message: 'Exercise does not exist in this Workout' })
    }
    const workoutExercise = await prisma.workoutExercise.delete({ where: { id: weId }})
    res.status(200).json(workoutExercise )
})


module.exports = router