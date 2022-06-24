var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql2");
const cors = require("cors");

var conn = mysql.createConnection({
  host: "34.121.123.11",
  user: "root",
  password: "test1234",
  database: "Yelp411",
});

conn.connect;
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

/*
app.get("/find_business", (req, res) => {
  var sqlQry = "SELECT * FROM Business limit 1000";
  conn.query(sqlQry, function (error, results) {
    if (error) {
      res.send("error from the database side");
    } else {
      res.json(results);
    }
  });
});*/

// Display all reviews
app.get("/find_reviews", (req, res) => {
  var sqlQry = "SELECT * FROM Review";
  conn.query(sqlQry, function (error, results) {
    if (error) {
      res.send("error from the database side");
    } else {
      res.json(results);
    }
  });
});

// Find business by name
app.get("/find_business", (req, res) => {
  //console.log(req.query);
  var business_name = req.query.business_name;
  var sqlQry = `SELECT * FROM Business WHERE business_name LIKE "%${business_name}%" limit 1000`;
  conn.query(sqlQry, function (error, results) {
    if (error) {
      res.send("error from the database side");
    } else {
      res.json(results);
    }
  });
});

// Find business by id
app.get("/find_business_id", (req, res) => {
  var business_id = req.query.business_id;
  var sqlQry = `SELECT * FROM Business WHERE business_id = "${business_id}"`;
  conn.query(sqlQry, function (error, results) {
    if (error) {
      res.send("error from the database side");
    } else {
      res.json(results);
    }
  });
});

// Find reviews by id
app.get("/find_reviews_by_id", (req, res) => {
  var business_id = req.query.business_id;
  var sqlQry = `SELECT * FROM Review WHERE business_id = "${business_id}"`;
  conn.query(sqlQry, function (error, results) {
    if (error) {
      res.send("error from the database side");
    } else {
      res.json(results);
    }
  });
});

// Find businesses with an avg rating higher than avg_rating
app.get("/filter_rating", (req, res) => {
  var avg_rating = req.query.avg_rating;
  var sqlQry = `Select business_id, business_name, avg(rating) as rating
    From Review NATURAL JOIN Business
    Where categories LIKE "%Restaurants%" OR categories LIKE "%Food%"
    Group By business_id, business_name
    Having avg(rating) >= ${avg_rating}
    Order By rating DESC`;

  console.log(sqlQry);
  conn.query(sqlQry, function (error, results) {
    if (error) {
      res.send("error from the database side");
    } else {
      res.json(results);
    }
  });
});

// Find restaurants open on a given day
app.get("/filter_day", (req, res) => {
  var day = req.query.day;

  var sqlQry = `Select DISTINCT business_id, business_name, ${day}_hours
  From Business Natural Join BusinessHours Natural Join(
    Select business_id
    From Business Natural Join (
      Select business_id
      From BusinessHours
      Where ${day}_hours NOT LIKE "None") as temp2
    Where categories LIKE "%Restaurants%" OR categories LIKE "%Food%"
  ) as temp1
  Order By business_id DESC LIMIT 20`;

  console.log(sqlQry);

  conn.query(sqlQry, function (error, results) {
    if (error) {
      res.send("error from the database side");
    } else {
      res.json(results);
    }
  });
});

// Delete a review
app.delete("/delete_review/:id", function (req, res, next) {
  //console.log(req.params.id);
  var review_id = req.params.id;
  var sql = `DELETE FROM Review WHERE review_id = '${review_id}'`;
  console.log(sql);

  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record deleted");
    res.redirect("/");
  });
});

// Update a review
app.put("/update_review/:id", function (req, res, next) {
  var review_id = req.body.review_id;
  var comment = req.body.comment;
  var sql = `UPDATE Review SET comment = '${comment}' WHERE review_id = '${review_id}'`;
  console.log(sql);

  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record updated");
    res.redirect("/");
  });
});

// Insert a review
app.post("/insert_reviews", function (req, res, next) {
  //var review_id = `SELECT max(review_id) + 1 FROM Review`;
  var rating = req.body.rating;
  var comment = req.body.comment;
  var business_id = req.body.business_id;
  var user_id = req.body.user_id;

  /*conn.query(review_id, function (err, result) {
    if (err) throw err;
    console.log("created review id");
    review_id = result[0];
    console.log("review id is: " + review_id);
  });*/

  var sql = `INSERT INTO Review(rating, comment, business_id, user_id) VALUES ('${rating}','${comment}','${business_id}','${user_id}')`;
  console.log(sql);

  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record inserted");
    //req.flash("success", "Data added successfully!");
    res.redirect("/");
  });
});

var http = require("http").Server(app);
var port = 80;

http.listen(port, function () {
  console.log("Listening to port 80");
});
