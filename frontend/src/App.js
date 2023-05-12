import "./App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";

function App() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className="App">
      <h1>Time Booking!</h1>
      <br />
      <label>
        Name: <br />
        <input type="text" name="name" />
      </label>
      <br />
      <br />
      <label>
        Email: <br />
        <input type="text" name="email" />
      </label>
      <br />
      <br />
      Date:
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
}

export default App;
