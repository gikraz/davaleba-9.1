const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const movieRoutes = require("./routes/movies");
const directorRoutes = require("./routes/directors");
const verifyDirector = require("./middlewares/verifyDirector");

dotenv.config();
const app = express();

app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("📡 MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error: ", err));


app.use("/movies", movieRoutes);
app.use("/directors", directorRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
