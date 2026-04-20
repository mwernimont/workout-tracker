const express = require('express')
const router = express.Router()
const prisma = require('../db')
const validId = require('../middleware/validateId')

const BodyPartsArray = [
  "CHEST",
  "BACK",
  "LEGS",
  "SHOULDERS",
  "BICEPS",
  "TRICEPS",
  "FOREARMS",
 "CORE",
]

//Get ALL Exercises
router.get("/", async (req, res) => {
    const exercises = await prisma.exercise.findMany();
    res.status(200).json(exercises)
})

//Get Specific Exercise
router.get("/:id", validId, async (req, res) => {
    const id = parseInt(req.params.id);
    const exercise = await prisma.exercise.findUnique({where: {id: id}});
    if(!exercise){
        return res.status(404).json({ success: false, message: 'Exercise does not exist' });
    }
    res.status(200).json(exercise);
})

//Create Exercise
router.post('/', async (req, res) => {
    const {name, bodyParts} = req.body;
    
    if(!name){
        return res.status(400).json({ success: false, message: 'Exercises must have a name' });
    }
    if(bodyParts?.some(bp => !BodyPartsArray.includes(bp.bodyPart))){
        return res.status(400).json({ success: false, message: 'Body Part must be in the approved list' })
    }
    const exercise = await prisma.exercise.create({
        data: { name, bodyParts: { create: bodyParts || [] } }, include: {bodyParts: true}
    })
    res.status(201).json(exercise)
})

module.exports = router