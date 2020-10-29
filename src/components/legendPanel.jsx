import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

function ColorDot(id, name, color) {
  return (
    <tr key={id} style={{ verticalAlign: "middle", textAlign: "left" }}>
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
            backdropFilter: "blur(5px)",
          }}
        ></span>
      </td>
      <td>
        <Typography>{name}</Typography>
      </td>
    </tr>
  );
}

function legendContent(nbTrees, treeNamesDict) {
  return nbTrees ? (
    <table
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        background: "rgba(255,255,255,0.2)",
        borderRadius: "6px",
        // -moz-border-radius:6px;
      }}
    >
      <tbody>
        {Object.keys(treeNamesDict).map((item, i) =>
          ColorDot(i, item, treeNamesDict[item]["color"])
        )}
      </tbody>
    </table>
  ) : (
    <div
      style={{
        width: "70vw",
        marginLeft: "auto",
        marginRight: "auto",
        background: "rgba(255,255,255,0.2)",
        borderRadius: "6px",
      }}
    >
      <Typography>C'est la hess morray y'a pas d'arbres ici</Typography>
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
  sumExpanded: {
    overflow: "auto",
  },
  expansionPanelSummaryExpandIcon: {
    right: "auto",
  },
  detailsRoot: {
    padding: 0,
    width: "100%",
    alignItems: "center",
    display: "inline-block",
    textAlign: "center",
    overflow: "auto",
  },
};

function LegendExpansionPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded={true} className={classes.panel}>
        <ExpansionPanelSummary
          classes={{
            root: classes.sumRoot,
            expanded: classes.sumExpanded,
            expandIcon: classes.expansionPanelSummaryExpandIcon,
          }}
          expandIcon={<ExpandMoreIcon />}
        ></ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.detailsRoot }}>
          {legendContent(props.nbTrees, props.treeNamesDict)}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

LegendExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LegendExpansionPanel);
