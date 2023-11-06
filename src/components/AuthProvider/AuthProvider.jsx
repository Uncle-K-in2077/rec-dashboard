import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/auth/login");
    }
  }, [navigate]);
  return <>{children}</>;
}

export default AuthProvider;
