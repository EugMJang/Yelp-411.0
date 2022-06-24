import * as React from "react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import "./App.css";
import { auth } from "./firebase-config";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";

const SignUp = () => {
  const navigate = useNavigate();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const [name, setName] = useState("");

  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    //console.log(currentUser);
    setUser(currentUser);
  });

  const handleRegister = async (e) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log("name is: " + user);
      navigate("/welcome", {
        state: { userName: name, userEmail: registerEmail },
      });
    } catch (error) {
      registerPassword.length < 6
        ? setRegisterErrorMessage("Password should be at least 6 characters!")
        : setRegisterErrorMessage("User already exists, please log in instead");
    }
  };

  const handleLogin = async (e) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(name);
      console.log(user);
      navigate("/welcome", {
        state: { userName: name, userEmail: loginEmail },
      });
    } catch (error) {
      setLoginErrorMessage("Incorrect password, please try again!");
    }
  };

  const logout = async () => {
    await signOut(auth);
  };
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <div className="App">
          <div>
            <h2>
              {" "}
              Welcome to <span>Yelp 411.0</span>{" "}
            </h2>
            <h3> Sign up </h3>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  autoComplete="name"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  style={{
                    marginTop: "25px",
                    marginBottom: "25px",
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => {
                    setRegisterEmail(event.target.value);
                  }}
                  style={{
                    marginBottom: "25px",
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  autoComplete="password"
                  type="password"
                  onChange={(event) => {
                    setRegisterPassword(event.target.value);
                  }}
                  style={{
                    marginBottom: "25px",
                  }}
                />
              </Grid>

              <Button
                onClick={() => handleRegister()}
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  backgroundColor: "#AB3428",
                }}
                sx={{ mt: 3, mb: 2 }}
              >
                {" "}
                Create User
              </Button>
            </Grid>

            {registerErrorMessage ? (
              <Alert severity="error">{registerErrorMessage}</Alert>
            ) : (
              []
            )}
          </div>

          <div>
            <h4> Or </h4>
            <h3> Login </h3>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  style={{
                    marginTop: "25px",
                    marginBottom: "25px",
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }}
                  style={{
                    marginBottom: "25px",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }}
                />
              </Grid>
              <Button
                onClick={() => handleLogin()}
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  backgroundColor: "#AB3428",
                }}
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Grid>
          </div>

          {loginErrorMessage ? (
            <Alert severity="error">{loginErrorMessage}</Alert>
          ) : (
            []
          )}

          <h4> User Logged In: </h4>
          {user?.email}

          <Button
            style={{
              color: "#AB3428",
            }}
            onClick={logout}
          >
            Sign Out
          </Button>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
