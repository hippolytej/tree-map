import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function ColorDot(id, name, color) {
  return (
    <tr style={{ verticalAlign: "middle", textAlign: "left" }}>
      <td>
        <span
          style={{
            height: 16,
            width: 16,
            backgroundColor: color,
            borderRadius: 50,
            display: "inline-block",
            marginRight: 20,
            verticalAlign: "middle",
          }}
        ></span>
      </td>
      <td>{name}</td>
    </tr>
  );
}

function legendContent(nbTrees, treeNamesDict) {
  return (
    <div>
      {nbTrees ? (
        <table
          style={{
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {Object.keys(treeNamesDict).map((item, i) =>
            ColorDot(i, item, treeNamesDict[item]["color"])
          )}
        </table>
      ) : (
        "Pas d'arbres par ici :("
      )}
    </div>
  );
}

const styles = {
  root: {
    width: "100%",
  },
  panel: {
    background: "transparent",
    border: 0,
    boxShadow: "none",
  },
  expansionPanelSummaryExpandIcon: {
    right: "auto",
  },
  details: {
    alignItems: "center",
  },
  pute: {
    width: "100%",
    alignItems: "center",
    display: "inline-block",
    textAlign: "center",
  },
};

function LegendExpansionPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded={true} className={classes.panel}>
        <ExpansionPanelSummary
          classes={{
            expandIcon: classes.expansionPanelSummaryExpandIcon,
          }}
          expandIcon={<ExpandMoreIcon />}
        ></ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.pute}>
            {legendContent(props.nbTrees, props.treeNamesDict)}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

LegendExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LegendExpansionPanel);
