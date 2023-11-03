import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const isAuthentication = useSelector(
    (state) => state.authentication.isAuthentication
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthentication) {
      localStorage.removeItem("access_token");
      navigate("/auth/login");
    }
  }, [isAuthentication, navigate]);
  return <>{children}</>;
}

export default AuthProvider;
