import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    custom: {
        fontWeight: "bold",
    },
});

const BusinessCard = (props) => {
    const classes = useStyles();
    const navigate = useNavigate();

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
                    <Grid item xs>
                        <Typography
                            variant="h5"
                            component="div"
                            className={classes.custom}
                            marginBottom={"20px"}
                        >
                            UserId: {props.userId}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography
                            variant="h5"
                            component="div"
                            className={classes.custom}
                            marginBottom={"20px"}
                        >
                            Rating: {props.reviewRating} / 5
                        </Typography>
                    </Grid>
                    <Grid item x>
                        <Typography
                            variant="h5"
                            component="div"
                            className={classes.custom}
                            marginBottom={"20px"}
                        >
                            ReviewId: {props.reviewId}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography
                    variant="h6"
                    component="div"
                    className={classes.custom}
                    marginBottom={"20px"}
                >
                    {props.reviewText}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default BusinessCard;