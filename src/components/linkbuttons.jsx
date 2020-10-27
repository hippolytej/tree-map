import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import { Link } from "react-router-dom";

const styles = (theme) => ({
  button: {
    margin: 3,
    justifyContent: "center",
  },
});

function LinkButton(props) {
  const { classes } = props;
  return (
    <div>
      <Button
        size="small"
        color="inherit"
        variant={props.variant}
        className={classes.button}
        component={props.to ? Link : undefined}
        to={props.to}
        href={props.href}
      >
        {props.text}
      </Button>
    </div>
  );
}

function FloatingLinkButton(props) {
  const { classes } = props;
  return (
    <div>
      <Fab
        size="small"
        color="primary"
        variant="extended"
        aria-label="Add"
        className={classes.margin}
        component={props.to ? Link : undefined}
        to={props.to}
        href={props.href}
      >
        {props.text}
      </Fab>
    </div>
  );
}

LinkButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

FloatingLinkButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

const RegularLink = withStyles(styles)(LinkButton);
const FloatingLink = withStyles(styles)(FloatingLinkButton);

export { RegularLink, FloatingLink };
