import { isMobile } from "react-device-detect";
import { wikiData } from "../utils/wikiData";
import { GeolocateControl } from "mapbox-gl";

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

export function createGeoJSONCircle(center, radiusInKm, points) {
  if (!points) points = 64;

  var coords = {
    latitude: center[1],
    longitude: center[0],
  };

  var km = radiusInKm;

  var ret = [];
  var distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
  var distanceY = km / 110.574;

  var theta, x, y;
  for (var i = 0; i < points; i++) {
    theta = (i / points) * (2 * Math.PI);
    x = distanceX * Math.cos(theta);
    y = distanceY * Math.sin(theta);

    ret.push([coords.longitude + x, coords.latitude + y]);
  }
  ret.push(ret[0]);

  return {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [ret],
          },
        },
      ],
    },
  };
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
