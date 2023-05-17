import { Link } from "react-router-dom";

const AdminPage = () => {
    return(
    <div>
        <Link to="/" className="adminButton">
          Log out
        </Link>
        <h1>Adminpage</h1>
    </div>
    );
};

export default AdminPage;