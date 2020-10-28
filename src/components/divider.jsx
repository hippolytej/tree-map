import React from "react";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    marginTop: "20px",
    width: "90vw",
    maxWidth: "500px",
  },
});

function MiddleDivider(props) {
  const { classes } = props;
  return <Divider className={classes.root} variant="middle" />;
}

MiddleDivider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MiddleDivider);
