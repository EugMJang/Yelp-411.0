import Navbar from "./Navbar";
import "./App.css";
import BusinessCard from "./BusinessCard";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { TextField } from "@material-ui/core";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

const FindBusinesses = (props) => {
  const location = useLocation();
  const [foundBusinesses, setFoundBusinesses] = useState([]);
  const [businessName, setBusinessName] = useState("");
  const theme = createTheme();

  const displayCards = () => {
    Axios.get("http://localhost:80/find_business", {
      params: {
        business_name: businessName,
      },
    }).then((response) => {
      console.log(response.data);
      setFoundBusinesses(response.data);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:80/find_business", {
      params: {
        business_name: location.state.businessName,
      },
    }).then((response) => {
      console.log(response.data);
      setFoundBusinesses(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
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
              marginTop: "20px",
              marginBottom: "20px",
            }}
          />
          <Button
            onClick={() => displayCards()}
            style={{
              backgroundColor: "#AB3428",
              marginBottom: "30px",
            }}
            variant="contained"
            size="large "
          >
            Submit
          </Button>
        </Container>
      </ThemeProvider>

      {foundBusinesses.map((business) => (
        <BusinessCard
          key={business.business_id}
          businessName={business.business_name.replace(/['"]+/g, "")}
          averageRating={business.avg_rating}
          businessId={business.business_id}
          categories={business.categories}
          address={business.address.replace(/['"]+/g, "")}
          city={business.city}
          state={business.state}
          business_id={business.business_id}
        />
      ))}
    </div>
  );
};

export default FindBusinesses;
