const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 4040;

const bookings = [];

app.post("/times",
  [
    body("name").notEmpty().trim().escape(),
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail()
      .custom((value) => {
        if (!value.includes("@")) {
          throw new Error();
        }
        return true;
      }),
    body("date")
      .isISO8601()
      .custom((value) => {
        if (new Date(value) < new Date()) {
          throw new Error("Date must be in the future");
        }
        return true;
      }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }

    const { name, email, date } = req.body;
    bookings.push({ name, email, date });
    res.status(200).json({ message: "Booking added successfully" });
  }
);

app.get("/times", (req, res) => {
  res.send(bookings);
});

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
