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
    treeImg: {
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        width: 100,
        display: 'inlineBlock',
        float: 'left'
    },
    wikiRow: {
        marginLeft: 10,
        marginRight: 10,
    },
    wikiTextContainer: {
        marginLeft: 10,
        marginRight: 10,
    }
};

class TemporaryDrawer extends React.Component {

    render() {
        const { classes } = this.props;

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
                        <div className={classes.wikiRow}>
                            <img className={classes.treeImg} src={this.props.thumbnailUrl} alt="Wiki Thumbnail" />
                        </div>
                        <div className={classes.wikiTextContainer}>
                            <p>{this.props.wikiDesc}</p>
                        </div>
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