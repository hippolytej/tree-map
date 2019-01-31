import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: "none"
    }
});

function MoreInfoButton(props) {
    const { classes } = props;
    return (
        <div>
            <Button
                size="small"
                variant="outlined"
                className={classes.button}
                onClick={props.onClick}>
                Default
            </Button>
        </div>
    );
}

MoreInfoButton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MoreInfoButton);