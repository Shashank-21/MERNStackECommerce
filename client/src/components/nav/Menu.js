import { useOutlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

export default function Menu() {
  const currentOutlet = useOutlet();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };
  //23123k1j23b1kj23b
  return (
    <>
      <ul className='nav d-flex justify-content-around shadow-sm mb-2 p-2'>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/'>
            Home
          </NavLink>
        </li>
        <li className='nav-item'>
          {!auth?.user ? (
            <NavLink className='nav-link' to='/login'>
              Login
            </NavLink>
          ) : (
            <p className='nav-link pointer' onClick={logout}>
              Logout
            </p>
          )}
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to='/register'>
            Register
          </NavLink>
        </li>
      </ul>

      {currentOutlet}
    </>
  );
}
