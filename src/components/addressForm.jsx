import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";

const styles = (theme) => ({
  input: {
    paddingTop: 20,
    margin: "auto",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "230px",
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
        <Input
          placeholder="Ou à cette adresse"
          className={classes.input}
          inputProps={{ style: { textAlign: "center" } }}
          value={this.props.value}
          onChange={this.handleChange}
          onKeyDown={this.onEnterDown}
          fullWidth={true}
        />
      </form>
    );
  }
}

AddressForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddressForm);
