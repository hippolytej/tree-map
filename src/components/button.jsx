import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    button: {
        margin: 0,
        top: 'auto',
        right: 40,
        bottom: 40,
        left: 'auto',
        position: 'fixed',
    },
});

class MenuButton extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="fab" color="primary" aria-label="add" className={classes.button}>
                    <AddIcon />
                </Button>
            </div>
        );
    }
}

MenuButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuButton);