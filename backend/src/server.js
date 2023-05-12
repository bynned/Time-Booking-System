const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 4040;

const bookings = [];

app.post("/times", (req, res) => {
  const { name, email, date } = req.body;
  bookings.push({ name, email, date });
  res.send("Booking added successfully");
});

app.get("/times", (req, res) => {
  res.send(bookings);
});

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
