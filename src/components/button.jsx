import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    button: {
        margin: 5
    }
});

function PopUpButton(props) {
    const { classes } = props;
    return (
        <div>
            <Button
                size="small"
                variant="outlined"
                className={classes.button}
                onClick={props.onClick}>
                {props.text}
            </Button>
        </div>
    );
}

PopUpButton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PopUpButton);