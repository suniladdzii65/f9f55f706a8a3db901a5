import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
}));

export default function About() {
  const classes = useStyles();
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [input, setInput] = useState("");
  const onChaneInput = async event => {
      await setInput(event.target.value)
      console.log(input)
    if (input) {
      setIsInputEmpty(false);
    } else {
      setIsInputEmpty(true);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Grid container spacing={2} justify="center" alignItems="center">
              <Grid item xs={12}>
                <TextField
                  id="standard-basic"
                  placeholder="Enter Asteroid ID"
                  label="Asteroid ID"
                  onChange={onChaneInput}
                  value={input}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  disabled={isInputEmpty}
                  color="primary"
                >
                  Random Asteroid
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
