import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingGif from "../../images/loading.gif";

export default function Loading() {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((current) => {
        return --current;
      });
    }, 1000);
    //redirect once count is 0
    count === 0 &&
      navigate("/login", {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location.pathname]);

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <img src={LoadingGif} alt='loading' style={{ width: "400px" }} />
    </div>
  );
}
