import { Link } from "react-router-dom";
import "../App.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
export default function Navbar() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handelLogout = () => {
    localStorage.removeItem("loggedin");
    localStorage.removeItem("currentUser");
    authContext.setAuth({ password: null, email: null, id: null });
    navigate("/");
  };
  return (
    <nav className="navb">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/About">About</Link>
        </li>
        <li>
          <div>
            {authContext.auth.email ? (
              <div>
                {authContext.auth.email}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handelLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              "you need to login"
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}
