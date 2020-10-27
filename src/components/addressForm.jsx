import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  root: {
    margin: 5,
    textAlign: "center",
    justifyContent: "center",
  },
});

class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onEnterDown = this.onEnterDown.bind(this);
  }

  handleChange(event) {
    const text = event.target.value;
    this.props.onChange(text);
  }

  onEnterDown(e) {
    if (e.keyCode === 13) {
      this.props.onEnterDown();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="address-basic"
          label="Ou à cette adresse"
          type="search"
          onChange={this.handleChange}
          onKeyDown={this.onEnterDown}
          value={this.props.value}
          margin="normal"
          fullWidth
          variant="outlined"
        />
      </form>
    );
  }
}

AddressForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddressForm);
