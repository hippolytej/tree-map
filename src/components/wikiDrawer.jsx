import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
// import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ImageWithStatusText from "./image";
import { isMobile } from "react-device-detect";

const styles = {
  mobileContent: { maxHeight: "80vh" },
  treeImg: {
    height: "20vh",
    display: "inlineBlock",
    float: "left",
  },
  wikiRow: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
  },
  wikiTextContainer: {
    width: "90%",
    bottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    overflow: "scroll",
  },
};

class TemporaryDrawer extends React.Component {
  wikiContent(classes, props) {
    return (
      <div
        style={{
          maxWidth: 450,
        }}
        tabIndex={0}
        role="button"
        onClick={props.toggleDrawer}
        onKeyDown={props.toggleDrawer}
      >
        <div className={classes.wikiRow}>
          {props.treeName}
          <ImageWithStatusText
            imageUrl={props.thumbnailUrl}
            altText={props.treeName}
          />
        </div>
        <div className={classes.wikiTextContainer}>
          <p style={{ alignItems: "center", justifyContent: "center" }}>
            {props.wikiDesc}
          </p>
        </div>
      </div>
    );
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Drawer
          anchor={isMobile ? "bottom" : "left"}
          open={this.props.openDrawer}
          onClose={this.props.toggleDrawer}
        >
          {this.wikiContent(classes, this.props)}
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);
