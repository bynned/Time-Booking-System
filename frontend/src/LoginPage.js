import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
          />
        </div>
        <button type="submit">Login</button>
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
