import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const AdminPage = () => {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    fetchTimes();
  }, []);

  const fetchTimes = async () => {
    try {
      const response = await fetch("http://localhost:4040/times");
      const data = await response.json();
      setTimes(data);
    } catch (error) {
      console.log("Error fetching times:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleDeleteTime = async (index) => {
    try {
      const timeId = times[index].id;
      const response = await fetch(`http://localhost:4040/times/${timeId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTimes(prevTimes => {
          const updatedTimes = [...prevTimes];
          updatedTimes.splice(index, 1);
          return updatedTimes;
        });
      } else {
        console.log("Failed to delete time");
      }
    } catch (error) {
      console.log("Error deleting time:", error);
    }
  };

  return (
    <div>
      <Link to="/" className="adminButton">
        Log out
      </Link>
      <h1>Adminpage</h1>
      <div className="fetchedTimes">
        {times.map((time, index) => (
          <div className="times" key={index}>
            <div className="timeData">
              <p>Name: {time.name}</p>
              <p>Email: {time.email}</p>
              <p>Date: {formatDate(time.date)}</p>
            </div>
            <button className="deleteTime" onClick={() => handleDeleteTime(index)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
