import "./App.css";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import StarIcon from "@material-ui/icons/Star";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
const Welcome = () => {
  const navigate = useNavigate();
  const theme = createTheme();
  const [businessName, setBusinessName] = useState("");
  const [rating, setRating] = useState(0);
  const [day, setDay] = useState("");

  const handleFindBusinesses = (e) => {
    navigate("/findbusinesses", {
      state: { businessName: businessName },
    });
  };

  const handleFilterByRating = (e) => {
    navigate("/findratings", {
      state: { rating: rating },
    });
  };

  const handleFilterByDay = (selectedDay) => {
    console.log(selectedDay);
    navigate("/daysopen", {
      state: { day: selectedDay },
    });
  };

  return (
    <div>
      <h1 align="center">
        <div className="Title">Yelp 411.0</div>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <TextField
              fullWidth
              label="Search for a business..."
              onChange={(event) => {
                setBusinessName(event.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={{
                marginTop: "100px",
                marginBottom: "10px",
              }}
            />
            <Button
              style={{
                backgroundColor: "#AB3428",
                marginBottom: "50px",
              }}
              variant="contained"
              size="large"
              onClick={() => handleFindBusinesses()}
            >
              Submit
            </Button>
          </Container>
          <Container component="main" maxWidth="xs">
            <TextField
              fullWidth
              label="Hungry? Find restaurants by ratings..."
              onChange={(event) => {
                setRating(event.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <StarIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={{
                marginBottom: "10px",
              }}
            />
            <Button
              style={{
                backgroundColor: "#AB3428",
                marginBottom: "30px",
              }}
              onClick={() => handleFilterByRating()}
              variant="contained"
              size="large "
            >
              Submit
            </Button>
          </Container>
        </ThemeProvider>

        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="sm">
            <Grid container spacing={1}>
              <Grid item xs>
                <Button
                  onClick={() => handleFilterByDay("monday")}
                  style={{
                    backgroundColor: "#AB3428",
                    marginTop: "80px",
                  }}
                  variant="contained"
                >
                  Mon
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  onClick={() => handleFilterByDay("tuesday")}
                  style={{
                    backgroundColor: "#AB3428",
                    marginTop: "80px",
                  }}
                  variant="contained"
                >
                  Tue
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  onClick={() => handleFilterByDay("wednesday")}
                  style={{
                    backgroundColor: "#AB3428",
                    marginTop: "80px",
                  }}
                  variant="contained"
                >
                  Wed
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  onClick={() => handleFilterByDay("thursday")}
                  style={{
                    backgroundColor: "#AB3428",
                    marginTop: "80px",
                  }}
                  variant="contained"
                >
                  Thur
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  onClick={() => handleFilterByDay("friday")}
                  style={{
                    backgroundColor: "#AB3428",
                    marginTop: "80px",
                  }}
                  variant="contained"
                >
                  Fri
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  onClick={() => handleFilterByDay("saturday")}
                  style={{
                    backgroundColor: "#AB3428",
                    marginTop: "80px",
                  }}
                  variant="contained"
                >
                  Sat
                </Button>
              </Grid>
              <Grid item x>
                  <Button
                  onClick={() => handleFilterByDay("sunday")}
                  style={{
                      backgroundColor: "#AB3428",
                      marginTop: "80px",
                  }}
                  variant="contained"
                  >
                  Sun
                  </Button>
              </Grid>
            </Grid>
          </Container>
        </ThemeProvider>
      </h1>
    </div>
  );
};
export default Welcome;
