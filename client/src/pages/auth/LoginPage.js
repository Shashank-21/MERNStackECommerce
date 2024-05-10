import { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/auth";
import { useLocation, useNavigate } from "react-router-dom";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        const { user, token } = data;
        setAuth({ ...auth, token, user });
        toast.success("Login successful!");
        navigate(location.state || "/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed, try again");
    }
  };

  return (
    <div>
      <Jumbotron title='Login' subTitle="You'll be logging in here" />
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <form onSubmit={handleSubmit}>
              <input
                type='email'
                className='form-control mb-4 p-2'
                placeholder='Email'
                value={email}
                onChange={handleEmailChange}
              />
              <input
                type='password'
                className='form-control mb-4 p-2'
                placeholder='Password'
                value={password}
                onChange={handlePasswordChange}
              />
              <button className='btn btn-primary' type='submit'>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </div>
  );
}

export default LoginPage;
