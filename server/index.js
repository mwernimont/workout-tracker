const express = require("express");
const app = express();
const workoutsRouter = require("./routes/workouts");


app.use(express.json());
app.use("/workouts", workoutsRouter);

app.get("/", (req, res) => {
    res.json({ message: "API is running" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Server Error' });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});