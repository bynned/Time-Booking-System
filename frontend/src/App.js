import "./App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [dateErrorMessage, setDateErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const currentDate = new Date();
    if (startDate < currentDate) {
      setDateErrorMessage("Invalid date");
      return;
    }
    setDateErrorMessage("");

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      setEmailErrorMessage("Invalid email format");
      return;
    }
    setEmailErrorMessage("");
    const data = { name, email, date: startDate };
    fetch("http://localhost:4040/times", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        setModalIsOpen(true);
        return response.json();
      })
      .then((data) => {
        console.log("Success: ", data);
        setModalMessage("Booking added successfully!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <h1>Time Booking!</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          Name: <br />
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Email: <br />
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {emailErrorMessage && <p>{emailErrorMessage}</p>}
        <br />
        <br />
        Date & Time:
        <DatePicker
          selected={startDate}
          showTimeSelect
          onChange={(date) => setStartDate(date)}
        />
        {dateErrorMessage && <p>{dateErrorMessage}</p>}
        <br />
        <br />
        <button type="submit">Send!</button>
      </form>
      <Modal isOpen={modalIsOpen} className="submitModal">
        <h2>{modalMessage}</h2>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

export default App;
