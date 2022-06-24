import Navbar from "./Navbar";
import "./App.css";
import BusinessCard from "./BusinessCard";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { TextField } from "@material-ui/core";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import StarIcon from "@material-ui/icons/Star";

const FindRatings = (props) => {
  const location = useLocation();
  const [foundBusinesses, setFoundBusinesses] = useState([
    {
      business_name: "",
      business_id: "",
      rating: 4,
      categories: "",
      address: "",
      city: "",
      state: "",
    },
  ]);
  const [inputRating, setInputRating] = useState(0);
  const theme = createTheme();

  const displayCards = () => {
    setFoundBusinesses([]);
    console.log("testing");
    Axios.get("http://localhost:80/filter_rating", {
      params: {
        avg_rating: inputRating,
      },
    })
      .then((response) => {
        console.log(response.data);
        const promises = response.data.map((business_data) => {
          return Axios.get("http://localhost:80/find_business_id", {
            params: {
              business_id: business_data.business_id,
            },
          });
        });
        return promises;
      })
      .then((response) => {
        Promise.all(response).then((response) => {
          const arr = response.map((result) => {
            return result.data[0];
          });
          setFoundBusinesses(arr);
          console.log(foundBusinesses);
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    const rating = parseFloat(location.state.rating);
    Axios.get("http://localhost:80/filter_rating", {
      params: {
        avg_rating: rating,
      },
    })
      .then((response) => {
        console.log(response.data);
        const promises = response.data.map((business_data) => {
          return Axios.get("http://localhost:80/find_business_id", {
            params: {
              business_id: business_data.business_id,
            },
          });
        });
        return promises;
      })
      .then((response) => {
        Promise.all(response).then((response) => {
          const arr = response.map((result) => {
            return result.data[0];
          });
          setFoundBusinesses(arr);
          console.log(foundBusinesses);
        });
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
            label="Hungry? Find restaurants by ratings..."
            onChange={(event) => {
              setInputRating(event.target.value);
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
          averageRating={parseFloat(business.avg_rating).toFixed(1)}
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

export default FindRatings;
