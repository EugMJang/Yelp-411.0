import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useEffect, useState } from "react";
import Axios from "axios";

const useStyles = makeStyles({
  custom: {
    fontWeight: "bold",
  },
});

const BusinessCard = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:80/find_reviews_by_id", {
      params: {
        business_id: props.businessId,
      },
    }).then((response) => {
      if (response.data.length == 0) {
        setReviews(["No reviews yet - be the first to add one!"])
      } else if (response.data.length == 1) {
        setReviews([response.data[0].comment, " "])
      } else {
        setReviews([response.data[0].comment, response.data[1].comment]);
      }
    });
  }, []);

  return (
    <Card
      sx={{ minWidth: 275 }}
      style={{
        backgroundColor: "#F7F0FF",
        marginLeft: "25px",
        marginRight: "25px",
        marginTop: "25px",
        marginBottom: "25px",
      }}
    >
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography
              variant="h4"
              component="div"
              className={classes.custom}
              marginBottom={"20px"}
            >
              {props.businessName}
            </Typography>
            <Typography variant="h6" component="div" marginBottom={"20px"}>
              Average Rating: {props.averageRating} / 5
            </Typography>
            <Typography variant="h6" component="div" marginBottom={"20px"}>
              Tags: {props.categories.replaceAll(";", ", ")}
            </Typography>
            <Typography variant="h6" component="div" marginBottom={"20px"}>
              Address: {props.address}, {props.city} {props.state}
            </Typography>
            <Typography variant="h6" component="div">
              Business ID: {props.business_id}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="h5"
              component="div"
              className={classes.custom}
              marginBottom={"20px"}
            >
              Reviews
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              marginBottom={"20px"}
            >
              {reviews[0]}
            </Typography>
            <Typography variant="subtitle1" component="div">
              {reviews[1]}
            </Typography>
            <Button
              style={{
                backgroundColor: "#AB3428",
                marginTop: "30px",
              }}
              variant="contained"
              size="large "
              onClick={() => {
                navigate("/businessinfo", {
                  state: { businessId: props.businessId },
                });
              }}
            >
              See more reviews here
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;
