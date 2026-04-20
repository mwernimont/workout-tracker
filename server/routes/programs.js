const express = require('express')
const router = express.Router()
const prisma = require('../db');
const validId = require('../middleware/validateId')

//Create Program
router.post('/', async (req, res) => {
    const title = req.body.title;
    if(!title){
        return res.status(400).json({ success: false, message: 'Programs must have a title' });
    }
    const program = await prisma.program.create({
        data: { title }
    })
    res.status(201).json(program)
})

//Add Workout to Program
router.post('/:id/workouts', validId, async (req, res) => {
    const programId = parseInt(req.params.id);
    const workoutId = parseInt(req.body.workoutId);
    const order = parseInt(req.body.order);
    const program = await prisma.program.findUnique({where: {id: programId}});
    if(!program){
        return res.status(404).json({ success: false, message: 'Program does not exist' });
    }
    const workout = await prisma.workout.findUnique({where: {id: workoutId}});
    if(!workout){
        return res.status(404).json({ success: false, message: 'Wokrout does not exist' });
    }
    if(!order){
         return res.status(400).json({ success: false, message: 'Order must be included' });
    }
    const programWorkout = await prisma.programWorkout.create({
        data: { programId, workoutId, order }
    })
    res.status(201).json(programWorkout)
})

//Get ALL Programs
router.get("/", async (req, res) => {
    const programs = await prisma.program.findMany();
    res.status(200).json(programs)
})

//Get Specific Program
router.get("/:id", validId, async (req, res) => {
    const id = parseInt(req.params.id);
    const program = await prisma.program.findUnique({where: {id: id}, include: {workouts: true}});
    if(!program){
        return res.status(404).json({ success: false, message: 'Program does not exist' });
    }
    res.status(200).json(program);
})

//Update Program Details
router.patch("/:id", validId, async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, default: isDefault } = req.body || {};
    const existing = await prisma.program.findUnique({ where: { id } })
    if (!existing) {
        return res.status(404).json({ success: false, message: 'Program does not exist' })
    }
    const program = await prisma.program.update({ where: { id }, data: { title, default: isDefault } })
    res.json(program)
})

//Delete Program
router.delete("/:id", validId, async (req, res) => {
    const id = parseInt(req.params.id);
    const existing = await prisma.program.findUnique({ where: { id } })
    if (!existing) {
        return res.status(404).json({ success: false, message: 'Program does not exist' })
    }
    const program = await prisma.program.delete({ where: { id }})
    res.status(200).json(program)
})

//Set Program to default
router.patch("/:id/default", validId, async (req, res) => {
    const id = parseInt(req.params.id);
    const existing = await prisma.program.findUnique({ where: { id } })
    if (!existing) {
        return res.status(404).json({ success: false, message: 'Program does not exist' })
    }
    await prisma.program.updateMany({
        where: {default: true},
        data: { default: false}
    })
    const program = await prisma.program.update({ where: { id }, data: {default: true}})
    res.json(program)
})

module.exports = router