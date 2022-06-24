import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./signup.js";
import Welcome from "./welcome.js";
import FindBusinesses from "./FindBusinesses.js";
import ReviewPage from "./ReviewPage.js";
import FindRatings from "./FindRatings.js";
import DaysOpen from "./DaysOpen.js";
import UpdateReview from "./UpdateReview.js";
import DeleteReview from "./DeleteReview.js";
import InsertReview from "./InsertReview.js";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} exact />
        <Route path="/welcome" element={<Welcome />} exact />
        <Route path="/findbusinesses" element={<FindBusinesses />} exact />
        <Route path="/businessinfo" element={<ReviewPage />} exact />
        <Route path="/findratings" element={<FindRatings />} exact />
        <Route path="/daysopen" element={<DaysOpen />} exact />
        <Route path="/updatereview" element={<UpdateReview />} exact />
        <Route path="/deletereview" element={<DeleteReview />} exact />
        <Route path="/insertreview" element={<InsertReview />} exact />
      </Routes>
    </Router>
  );
}
