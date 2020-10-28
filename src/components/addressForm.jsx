import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import EcoIcon from "@material-ui/icons/Eco";

const styles = (theme) => ({
  input: {
    width: "60vw",
    maxWidth: "300px",
    paddingTop: 5,
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
      <div style={{ display: "flex", flexDirection: "row", paddingTop: 30 }}>
        <form className={classes.root} noValidate autoComplete="off">
          <Input
            placeholder={this.props.placeholder}
            className={classes.input}
            value={this.props.value}
            onChange={this.handleChange}
            onKeyDown={this.onEnterDown}
            fullWidth={true}
          />
        </form>
        <IconButton
          disabled={this.props.value === ""}
          color="primary"
          size="small"
          aria-label="Go"
          onClick={this.props.onEnterDown}
        >
          <EcoIcon />
        </IconButton>
      </div>
    );
  }
}

AddressForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddressForm);
