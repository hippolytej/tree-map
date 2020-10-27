import React from "react";
import { isMobile } from "react-device-detect";
import { wikiData } from "../utils/wikiData";
import { GeolocateControl } from "mapbox-gl";

export function ColorDot(id, name, color) {
  return (
    <li key={id}>
      <span
        style={{
          height: 16,
          width: 16,
          backgroundColor: color,
          borderRadius: 50,
          display: "inline-block",
        }}
      >
        <span style={{ paddingLeft: 30 }}>{name}</span>
      </span>
    </li>
  );
}

export function onTreeHover(hoveredTreeID, { map }) {
  map.getCanvas().style.cursor = "pointer";
  this.setState({
    hoveredTreeID:
      this.state.clickedTreeID || this.state.clickedTreeID === 0
        ? ""
        : hoveredTreeID,
  });
  if (isMobile) {
    this.setState({ clickedTreeID: hoveredTreeID });
  }
}

export function onTreeEndHover({ map }) {
  map.getCanvas().style.cursor = "";
  this.setState({ hoveredTreeID: "" });
}

export function onTreeClick(hoveredTreeID) {
  this.setState({
    hoveredTreeID: hoveredTreeID,
    clickedTreeID: hoveredTreeID,
  });
}

export function onInfoButtonClick() {
  console.log("CLICKED");
  this.setState({
    openDrawer: true,
  });
  var treeId = this.state.hoveredTreeID
    ? this.state.hoveredTreeID
    : this.state.clickedTreeID;
  var genre = this.state.treeArray[treeId].fields.genre;
  var espece = this.state.treeArray[treeId].fields.espece;
  var keyword = genre + "_" + espece;
  wikiData.apply(this, [keyword]);
}

export function onCloseButtonClick() {
  this.setState({
    hoveredTreeID: "",
    clickedTreeID: "",
  });
}

export function toggleDrawer() {
  this.setState({
    openDrawer: false,
    thumbnailUrl: "",
    wikiDesc: "",
  });
}

export function onMapLoad(map) {
  map.addControl(
    new GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: false,
    })
  );
}
