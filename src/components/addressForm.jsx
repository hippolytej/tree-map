import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  button: {
    margin: 5,
  },
});

class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const text = event.target.value;
    this.props.onChange(text);
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="address-basic"
          label="Address"
          onChange={this.handleChange}
          value={this.props.value}
        />
      </form>
    );
  }
}

AddressForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddressForm);
