import "./App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { name, email, date: startDate };
    fetch("http://localhost:4040/times", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="App">
      <h1>Time Booking!</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          Name: <br />
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <br />
        <label>
          Email: <br />
          <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <br />
        Date & Time:
        <DatePicker selected={startDate} showTimeSelect onChange={(date) => setStartDate(date)} />
        <br />
        <br />
        <button type="submit">Send!</button>
      </form>
    </div>
  );
}

export default App;
