import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import api from "./services";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "10px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginTop: "10%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function MainPage() {
  const classes = useStyles();
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [astroidData, setAstroidData] = useState({});
  const [input, setInput] = useState("");

  const onSubmitBtn = async (event) => {
    api.fetchAllAstroid(null, (res) => {
      if (res.near_earth_objects.length > 0) {
        const index = getRandomInt(res.near_earth_objects.length - 1);
        setAstroidData(res.near_earth_objects[index]);
      }
    });
  };
  

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const onChaneInput = async (event) => {
    let value = event.target.value;
    await setInput(value);
    if (value) {
      setIsInputEmpty(false);
    } else {
      setIsInputEmpty(true);
    }
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    api.fetchAstroidData(input, (res) => {
      setAstroidData(res);
    });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Grid container spacing={2} justify="center" alignItems="center">
              <form onSubmit={onFormSubmit}>
                <Grid item xs={12}>
                  <TextField
                    id="standard-basic"
                    placeholder="Enter Asteroid ID"
                    label="Asteroid ID"
                    onChange={onChaneInput}
                    value={input}
                  />
                </Grid>
                <br />
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    disabled={isInputEmpty}
                    color="primary"
                    onClick={onSubmitBtn}
                  >
                    Random Asteroid
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Paper>
          {Object.keys(astroidData).length > 0 && (
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {astroidData.name}
                </Typography>
                <Typography variant="h5" component="h2"></Typography>
                <Typography className={classes.pos} color="textSecondary">
                  Name : {astroidData.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  nasa_jpl_url : {astroidData.nasa_jpl_url}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  is_potentially_hazardous_asteroid :{" "}
                  {String(astroidData.is_potentially_hazardous_asteroid)}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
