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
  desktopDrawer(classes, treeName) {
    return (
      <Drawer
        anchor="left"
        open={this.props.openDrawer}
        onClose={this.props.toggleDrawer}
      >
        <div
          style={{ width: 350, alignItems: "center", justifyContent: "center" }}
          tabIndex={0}
          role="button"
          onClick={this.props.toggleDrawer}
          onKeyDown={this.props.toggleDrawer}
        >
          <div className={classes.wikiRow}>
            {treeName}
            <ImageWithStatusText
              imageUrl={this.props.thumbnailUrl}
              altText={treeName}
            />
          </div>
          <div className={classes.wikiTextContainer}>
            <p style={{ alignItems: "center", justifyContent: "center" }}>
              {this.props.wikiDesc}
            </p>
          </div>
        </div>
      </Drawer>
    );
  }

  mobileDrawer(classes, treeName) {
    return (
      <Drawer
        anchor="bottom"
        open={this.props.openDrawer}
        onClose={this.props.toggleDrawer}
      >
        <div
          className={classes.mobileContent}
          tabIndex={0}
          role="button"
          onClick={this.props.toggleDrawer}
          onKeyDown={this.props.toggleDrawer}
        >
          <div className={classes.wikiRow}>
            {treeName}
            <ImageWithStatusText
              imageUrl={this.props.thumbnailUrl}
              altText={treeName}
              style={styles.treeImg}
            />
          </div>
          <div className={classes.wikiTextContainer}>
            <p>{this.props.wikiDesc}</p>
          </div>
        </div>
      </Drawer>
    );
  }

  render() {
    const { classes } = this.props;
    var treeName = this.props.treeName;
    return (
      <div>
        {isMobile
          ? this.mobileDrawer(classes, treeName)
          : this.desktopDrawer(classes, treeName)}
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);
