import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  button: {
    margin: 5,
  },
});

function AdressForm(props) {
  const { classes } = props;
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="adress-basic" label="Adress" />
    </form>
  );
}

AdressForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdressForm);
