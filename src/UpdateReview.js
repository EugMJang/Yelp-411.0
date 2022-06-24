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

const UpdateReview = (props) => {
  const theme = createTheme();
  const [reviewID, setReviewID] = useState(0);
  const [updatedReview, setUpdatedReview] = useState("");
  const [submitted, setSubmitted] = useState("");

  const handleSubmitUpdatedReview = () => {
    setSubmitted("Successfully updated review!");
    Axios.put("http://localhost:80/update_review/" + `${reviewID}`, {
      review_id: reviewID,
      comment: updatedReview,
    })
      .then(() => {
        console.log(reviewID);
        console.log(updatedReview);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <TextField
            required
            fullWidth
            label="Enter the review ID..."
            onChange={(event) => setReviewID(event.target.value)}
            style={{
              marginTop: "100px",
            }}
          />
        </Container>
        <Container component="main" maxWidth="xs">
          <TextField
            required
            multiline={true}
            rows={3}
            fullWidth
            label="Enter the new review..."
            onChange={(event) => setUpdatedReview(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            style={{
              marginTop: "20px",
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
            onClick={() => handleSubmitUpdatedReview()}
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
export default UpdateReview;
