import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class TemporaryDrawer extends React.Component {

    render() {
        return (
            <div>
                <Drawer open={this.props.leftDrawer} onClose={this.props.toggleDrawer}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.props.toggleDrawer}
                        onKeyDown={this.props.toggleDrawer}
                    >
                        {/* {this.sideList.bind(null, this.state.wikiData)} */}
                    </div>
                </Drawer>
                <Drawer
                    anchor="bottom"
                    open={this.props.bottomDrawer}
                    onClose={this.props.toggleDrawer}
                >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.props.toggleDrawer}
                        onKeyDown={this.props.toggleDrawer}
                    >
                        <img src={this.props.thumbnailUrl} alt="Thubnail" />
                        <p>{this.props.wikiDesc}</p>
                    </div>
                </Drawer>
            </div>
        );
    }
}

TemporaryDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);