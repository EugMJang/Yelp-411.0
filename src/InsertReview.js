import "./App.css";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@mui/material/Button";
import { useState } from "react";
import Navbar from "./Navbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Axios from "axios";

const InsertReview = (props) => {
  const theme = createTheme();
  //const [reviewID, setReviewID] = useState(0);
  const [submitted, setSubmitted] = useState("");
  const [comment, setComment] = useState("");
  const [businessID, setBusinessID] = useState("");
  const [userID, setUserID] = useState(0);
  const [rating, setRating] = useState(0);

  const handleInsertedReview = () => {
    setSubmitted("Successfully inserted review!");
    Axios.post("http://localhost:80/insert_reviews", {
      comment: comment,
      business_id: businessID,
      user_id: userID,
      rating: rating,
    }).then(() => {});
  };

  return (
    <div>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <TextField
            required
            fullWidth
            label="Enter the comment..."
            onChange={(event) => setComment(event.target.value)}
            style={{
              marginTop: "100px",
              marginBottom: "20px",
            }}
          />
          <TextField
            required
            fullWidth
            label="Enter the business ID..."
            onChange={(event) => setBusinessID(event.target.value)}
            style={{
              marginBottom: "20px",
            }}
          />
          <TextField
            required
            fullWidth
            label="Enter the user ID..."
            onChange={(event) => setUserID(event.target.value)}
            style={{
              marginBottom: "20px",
            }}
          />
          <TextField
            required
            fullWidth
            label="Enter the rating..."
            onChange={(event) => setRating(event.target.value)}
            style={{
              marginBottom: "20px",
            }}
          />
        </Container>
        <Container component="main" maxWidth="xs">
          <Button
            style={{
              backgroundColor: "#AB3428",
              marginBottom: "50px",
            }}
            variant="contained"
            size="large"
            onClick={() => handleInsertedReview()}
          >
            Submit
          </Button>
          {console.log(submitted)}
          {submitted ? <Alert severity="success">{submitted}</Alert> : []}
        </Container>
      </ThemeProvider>
    </div>
  );
};
export default InsertReview;
