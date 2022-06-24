import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./Navbar.js";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard.js";

const ReviewPage = (props) => {
  const theme = createTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [business, setBusiness] = useState([{ business_name: "" }]);
  const [reviews, setReviews] = useState([]);

  const handleUpdateReview = () => {
    navigate("/updatereview");
  };

  const handleDeleteReview = () => {
    console.log("delete review");
    navigate("/deletereview");
  };

  const handleInsertReview = () => {
    console.log("insert review");
    navigate("/insertreview");
  };

  useEffect(() => {
    Axios.get("http://localhost:80/find_business_id", {
      params: {
        business_id: location.state.businessId,
      },
    }).then((response) => {
      console.log(response.data);
      setBusiness(response.data);
    });
    Axios.get("http://localhost:80/find_reviews_by_id", {
      params: {
        business_id: location.state.businessId,
      },
    }).then((response) => {
      console.log(response.data);
      setReviews(response.data);
    });
  }, []);

  return (
    <div>
      <NavBar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="lg">
          <Grid container spacing={1}>
            <Grid item xs>
              <Button
                onClick={() => handleInsertReview()}
                style={{
                  backgroundColor: "#AB3428",
                  marginTop: "30px",
                  marginBottom: "30px",
                  fontSize: "20px",
                  padding: 20,
                }}
                variant="contained"
                size="large "
              >
                Insert new review
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                onClick={() => handleUpdateReview()}
                style={{
                  backgroundColor: "#AB3428",
                  marginTop: "30px",
                  marginBottom: "30px",
                  fontSize: "20px",
                  padding: 20,
                }}
                variant="contained"
                size="large "
              >
                Update my reviews
              </Button>
            </Grid>
            <Grid item x>
              <Button
                onClick={() => handleDeleteReview()}
                style={{
                  backgroundColor: "#AB3428",
                  marginTop: "30px",
                  marginBottom: "30px",
                  fontSize: "20px",
                  padding: 20,
                }}
                variant="contained"
                size="large "
              >
                Delete my reviews
              </Button>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>

      <Typography variant="h4" component="div" marginBottom={"20px"}>
        Reviews for {business[0].business_name.replace(/['"]+/g, "")}
      </Typography>

      {reviews.map((review) => (
        <ReviewCard
          key={review.review_id}
          userId={review.user_id}
          reviewText={review.comment}
          reviewRating={review.rating}
          reviewId={review.review_id}
        />
      ))}
    </div>
  );
};

export default ReviewPage;
