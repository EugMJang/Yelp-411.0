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

const DeleteReview = (props) => {
  const theme = createTheme();
  const [reviewID, setReviewID] = useState(0);
  const [submitted, setSubmitted] = useState("");

  const handleSubmitDeletedReview = () => {
    setSubmitted("Successfully deleted review!");
    Axios.delete("http://localhost:80/delete_review/" + `${reviewID}`, {
      data: { reviewID },
    })
      .then(() => {})
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
            onClick={() => handleSubmitDeletedReview()}
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
export default DeleteReview;
