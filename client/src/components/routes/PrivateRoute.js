import { useState, useEffect } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import Loading from "./Loading";

export default function PrivateRoute() {
  const [auth] = useAuth();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get("/auth-check");
      if (data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Loading />;
}
