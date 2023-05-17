import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToAdmin, setRedirectToAdmin] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4040/admin/user");
    const adminUser = await response.json();

    if (username === adminUser.username && password === adminUser.password) {
      console.log("Login successful");
      setRedirectToAdmin(true);
    } else {
      console.log("Invalid credentials");
      setInvalidCredentials("Invalid Credentials!");
    }
  };

  if (redirectToAdmin) {
    return <Navigate to="/admin" />;
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {invalidCredentials && (
            <p className="errorMessage">{invalidCredentials}</p>
          )}
        </div>
        <button type="submit" className="adminButton">
          Login
        </button>
        <br />
        <br />
        <br />
        <Link to="/" className="adminButton">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
