const express = require('express')
const app = express()

const programsRouter = require('./routes/programs')
const workoutsRouter = require('./routes/workouts')
const exercisesRouter = require('./routes/exercises')
const setsRouter = require('./routes/sets')
const goalsRouter = require('./routes/goals')
const bodyweightRouter = require('./routes/bodyweight')

app.use(express.json())

app.use('/programs', programsRouter)
app.use('/workouts', workoutsRouter)
app.use('/exercises', exercisesRouter)
app.use('/sets', setsRouter)
app.use('/goals', goalsRouter)
app.use('/bodyweight', bodyweightRouter)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: err.message })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))