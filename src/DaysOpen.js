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

const DaysOpen = (props) => {
  const location = useLocation();
  const [foundBusinesses, setFoundBusinesses] = useState([]);
  const theme = createTheme();

  /*const displayCards = () => {
    Axios.get("http://localhost:80/filter_day", {
      params: {
        day: day,
      },
    }).then((response) => {
      console.log(response.data);
      setBusinessesOpen(response.data);
    });
  };*/

  useEffect(() => {
    Axios.get("http://localhost:80/filter_day", {
      params: {
        day: location.state.day,
      },
    })
      .then((response) => {
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
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
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

export default DaysOpen;
