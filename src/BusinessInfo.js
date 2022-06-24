import "./App.css";
import { useState } from "react";
import Axios from "axios";

function BusinessInfo() {
  const [business_id, setBusinessID] = useState("");
  const [user_id, setUserID] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const [business_name, setBusinessName] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [businessFilteredBy, setBusinessesFilteredBy] = useState([]);
  const [businessOpen, setBusinessesOpen] = useState([]);

  const [review_id, setReviewID] = useState(0);
  const [avg_rating, setAverageRating] = useState(0);
  const [day, setDay] = useState("");
  const [dayHours, setDayHours] = useState("");

  const submitComment = () => {
    Axios.post("http://localhost:80/insert_reviews", {
      comment: comment,
      business_id: business_id,
      user_id: user_id,
      rating: rating,
    }).then(() => {
      alert("success insert");
    });
  };

  /*const deleteReview = (e) => {
    e.preventDefault();
    Axios.delete("http://localhost:80/delete_review", {
      review_id: review_id,
    }).then(() => {
      console.log("review to delete is: " + review_id);
      alert("success delete");
    });
  };*/

  const deleteReview = async (e) => {
    e.preventDefault();
    Axios.delete("http://localhost:80/delete_review/" + `${review_id}`, {
      data: { review_id },
    })
      .then(() => {
        console.log("testing!");
        console.log("review to delete is: " + review_id);
        alert("success delete");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateReview = async (e) => {
    e.preventDefault();
    Axios.put("http://localhost:80/update_review/" + `${review_id}`, {
      review_id: review_id,
      comment: comment,
    })
      .then(() => {
        console.log("testing!");
        console.log("review id to update is: " + review_id);
        alert("success update");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const findBusiness = (e) => {
    e.preventDefault();
    Axios.get("http://localhost:80/find_business", {
      params: {
        business_name: business_name,
      },
    }).then((response) => {
      console.log(response.data);
      setBusinesses(response.data);
      alert("success find");
    });
  };

  const filterRating = (e) => {
    e.preventDefault();
    Axios.get("http://localhost:80/filter_rating", {
      params: {
        avg_rating: avg_rating,
      },
    }).then((response) => {
      console.log(response.data);
      setBusinessesFilteredBy(response.data);
      alert("success find");
    });
  };

  const filterByDay = (e) => {
    e.preventDefault();
    Axios.get("http://localhost:80/filter_day", {
      params: {
        day: day,
      },
    }).then((response) => {
      console.log(response.data);
      setBusinessesOpen(response.data);
      alert("success find");
    });
  };

  return (
    <>
      <div>
        <form>
          <div class="form-group">
            <label for="Rating">Rating</label>
            <input
              type="text"
              class="form-control col-lg-9"
              id="rating"
              placeholder="Enter your rating"
              name="rating"
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label for="comment">Comment</label>
            <input
              type="text"
              class="form-control col-lg-9"
              id="comment"
              placeholder="Enter your comment"
              name="comment"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label for="business_id">Business ID</label>
            <input
              type="text"
              class="form-control col-lg-9"
              id="business_id"
              name="business_id"
              placeholder="Enter the Business ID"
              onChange={(e) => {
                setBusinessID(e.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label for="user_id">User ID</label>
            <input
              type="text"
              class="form-control col-lg-9"
              id="user_id"
              name="user_id"
              placeholder="Enter the User ID"
              onChange={(e) => {
                setUserID(e.target.value);
              }}
            />
          </div>
          <button type="submit" class="btn btn-primary" onClick={submitComment}>
            Submit
          </button>
        </form>
      </div>
      <div>
        <form>
          <div class="form-group">
            <label for="Business">Business Name</label>
            <input
              type="text"
              class="form-control col-lg-9"
              id="business_name"
              placeholder="Search for a business!"
              name="business_name"
              onChange={(e) => {
                setBusinessName(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            onClick={(e) => findBusiness(e)}
          >
            Submit
          </button>
        </form>
      </div>
      {businesses.map(({ business_name }) => (
        <p key={business_name}> {business_name}</p>
      ))}

      <div>
        <form>
          <div class="form-group">
            <label for="Delete a Review">Delete a Review</label>
            <input
              type="text"
              class="form-control col-lg-9"
              id="delete_review"
              placeholder="Enter the Review ID to delete!"
              name="review"
              onChange={(e) => {
                setReviewID(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            onClick={(e) => deleteReview(e)}
          >
            Submit
          </button>
        </form>
      </div>
      <div>
        <form>
          <div class="form-group">
            <label for="Update a Review">Update a Review</label>
            <input
              type="text"
              class="form-control col-lg-9"
              id="update_review"
              placeholder="Enter the Review ID to update!"
              name="review"
              onChange={(e) => {
                setReviewID(e.target.value);
              }}
            />
            <input
              type="text"
              class="form-control col-lg-9"
              id="update_comment"
              placeholder="Enter your new comment"
              name="comment"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            onClick={(e) => updateReview(e)}
          >
            Submit
          </button>
        </form>
      </div>
      <div>
        <form>
          <div class="form-group">
            <label for="Filter restaurants by rating">
              Filter restaurants by average rating!
            </label>
            <input
              type="text"
              class="form-control col-lg-9"
              id="filter_rating"
              placeholder="Enter the average rating to filter by!"
              name="average_rating"
              onChange={(e) => {
                setAverageRating(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            onClick={(e) => filterRating(e)}
          >
            Submit
          </button>
        </form>

        {businessFilteredBy.map(({ business_name, rating }) => (
          <p key={business_name}>
            {business_name} with a rating of {rating}
          </p>
        ))}
      </div>
      <div>
        <form>
          <div class="form-group">
            <label for="Filter restaurants by hours">
              Find restaurants open at a day of the week
            </label>
            <input
              type="text"
              class="form-control col-lg-9"
              id="filter_day"
              placeholder="Enter day to filter by!"
              name="day"
              onChange={(e) => {
                setDay(e.target.value);
                setDayHours(e.target.value + "_hours");
              }}
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            onClick={(e) => filterByDay(e)}
          >
            Submit
          </button>
        </form>

        {businessOpen.map(({ business_id, business_name, monday_hours }) => (
          <p key={business_id}>
            {business_name} with hours of {monday_hours}
          </p>
        ))}
      </div>
    </>
  );
}

export default BusinessInfo;
