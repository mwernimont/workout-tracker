const express = require('express')
const router = express.Router()
const prisma = require('../db')
const validId = require('../middleware/validateId')

//Delete set
router.delete("/:id", validId, async (req, res) => {
    const id = parseInt(req.params.id);
    const existing = await prisma.setLog.findUnique({ where: { id } })
    if (!existing) {
        return res.status(404).json({ success: false, message: 'SetLog does not exist' })
    }
    const set = await prisma.setLog.delete({ where: { id }})
    res.status(200).json(set)
})

module.exports = router