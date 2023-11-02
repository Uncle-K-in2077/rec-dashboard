import { useState } from "react";
import { Button, Divider, Paper, TextField } from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/auth.slice";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // dispatch(login({ email, password, navigate }));

    navigate("/dashboard/index")
  };

  // Create onChange handlers for email and password inputs
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container">
      <div className="form-login mt-5">
        <Paper elevation={24} className="login-form_paper">
          <h2>Hi! welcome back</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group my-4">
              <TextField
                label="Username"
                variant="outlined"
                className="login-form_input"
                // value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group my-4">
              <TextField
                label="Password"
                variant="outlined"
                className="login-form_input"
                type="password"
                // value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="form-group my-4">
              <Button type="submit" variant="outlined">
                Go to dashboard
              </Button>
            </div>
          </form>
          <Divider />
          <div className="login-text">
            <p>some text here...</p>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default LoginPage;
