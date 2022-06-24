import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Navbar = (props) => {
  const theme = createTheme();
  const navigate = useNavigate();
  const [business, setBusiness] = useState("");

  const goToHome = () => {
    navigate("/welcome");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#ECDCC2" }}>
        <Toolbar>
          <div className="buttons">
            <Button onClick={() => goToHome()}>Yelp 411.0</Button>
          </div>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs"></Container>
          </ThemeProvider>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
