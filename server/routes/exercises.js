const express = require("express");
const db = require("../db");
const router = express.Router();

router.post('/:id/sets', async (req, res) => {
    const id = parseInt(req.params.id)
    const reps = req.body.reps;
    const weight = req.body.weight;
    if(!reps){
        return res.status(400).json({ success: false, message: 'Sets requires reps to be set' });
    }
    if(weight == null || weight === ""){
        return res.status(400).json({ success: false, message: 'Sets requires weight to be set' });
    }
    const parseReps = parseInt(reps);
    const parseWeight = parseFloat(weight);
    const exercise = await db.exercise.findUnique({where: { id: id}});
    if(!exercise){
        return res.status(404).json({ success: false, message: 'Exercise does not exist' });
    }
    const set = await db.set.create({
        data: { reps: parseReps, weight: parseWeight, exerciseId: id}
    });
    res.status(201).json(set)
})

module.exports = router;