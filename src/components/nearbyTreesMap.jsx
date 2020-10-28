import React, { Component } from "react";
import "../App.css";
import { token, style } from "../config.json";
// Components
import TreePopUp from "./treePopUp";
import { RegularLink } from "./linkbuttons";
import TemporaryDrawer from "./drawer";
import ReactMapboxGl from "react-mapbox-gl";
import TreeLayer from "./treeLayer";
import CircularIndeterminate from "./progress";
// Utils
import { getCoordinates } from "../utils/geocode";
import { parisData } from "../utils/parisData";
import * as mapUtils from "../utils/map_utils";

const Map = ReactMapboxGl({
  minZoom: 14,
  maxZoom: 20,
  accessToken: token,
});
const mapStyle = style;
const radius = 100;
const flyToOptions = {
  speed: 0,
};

class NearbyTreesMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationAvailable: false,
      treeArray: [],
      treeNamesDict: {},
      nbTrees: 0,
      hoveredTreeID: "",
      clickedTreeID: "",
      address: this.props.address ? this.props.address : "",
      latitude: 0,
      longitude: 0,
      zoom: [17],
      openDrawer: false,
      wikiTreeData: "",
      thumbnailUrl: "",
      wikiDesc: "",
    };
    this.onTreeHover = mapUtils.onTreeHover.bind(this);
    this.onTreeEndHover = mapUtils.onTreeEndHover.bind(this);
    this.onTreeClick = mapUtils.onTreeClick.bind(this);
    this.onInfoButtonClick = mapUtils.onInfoButtonClick.bind(this);
    this.onCloseButtonClick = mapUtils.onCloseButtonClick.bind(this);
    this.toggleDrawer = mapUtils.toggleDrawer.bind(this);
    this.onMapLoad = mapUtils.onMapLoad.bind(this);
  }

  locationFound = (position) => {
    this.setState(
      {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
        locationAvailable: true,
      },
      () => {
        parisData.apply(this, [
          this.state.latitude,
          this.state.longitude,
          radius,
        ]);
      }
    );
  };

  errorHandler = (err) => {
    if (err.code === 1) {
      alert("Error: Access is denied!");
    } else if (err.code === 2) {
      alert("Error: Position is unavailable!");
    }
  };

  getUserPosition() {
    if (this.state.address) {
      getCoordinates.apply(this, [this.state.address, token]).then(() => {
        parisData.apply(this, [
          this.state.latitude,
          this.state.longitude,
          radius,
        ]);
      });
    } else if (navigator.geolocation) {
      var options = { timeout: 60000 };
      navigator.geolocation.getCurrentPosition(
        this.locationFound,
        this.errorHandler,
        options
      );
    } else {
      alert(
        "Sorry, browser does not support geolocation and no address was supplied"
      );
    }
  }

  componentDidMount() {
    if (this.state.locationAvailable) {
      parisData.apply(this, [
        this.state.latitude,
        this.state.longitude,
        radius,
      ]);
    } else {
      this.getUserPosition.apply(this);
    }
  }

  render() {
    const mapCenter = [this.state.longitude, this.state.latitude];
    const zoom = this.state.zoom;
    const hoveredTreeID = this.state.hoveredTreeID;
    const clickedTreeID = this.state.clickedTreeID;
    var bounds = [
      [2.14402, 48.772687],
      [2.529051, 48.969946],
    ];
    return this.state.locationAvailable ? (
      <div>
        <Map
          onStyleLoad={this.onMapLoad}
          style={mapStyle}
          center={mapCenter}
          containerStyle={{ width: "100vw", height: "100vh" }}
          flyToOptions={flyToOptions}
          zoom={zoom}
          maxBounds={bounds}
        >
          <RegularLink text="Accueil" variant="outlined" to="/">
            Home
          </RegularLink>
          <div
            style={{
              position: "fixed",
              top: 20,
              right: 100,
            }}
          >
            {this.state.nbTrees ? (
              <ul style={{ listStyle: null }}>
                {Object.keys(this.state.treeNamesDict).map((item, i) =>
                  mapUtils.ColorDot(
                    i,
                    item,
                    this.state.treeNamesDict[item]["color"]
                  )
                )}
              </ul>
            ) : (
              "Pas d'arbres par ici :("
            )}
          </div>
          {Object.keys(this.state.treeNamesDict).map((item, i) => (
            <TreeLayer
              key={i}
              treeType={item}
              onTreeHover={this.onTreeHover}
              onTreeEndHover={this.onTreeEndHover}
              treeIds={this.state.treeNamesDict[item]["ids"]}
              treeArray={this.state.treeArray}
              onTreeClick={this.onTreeClick}
              markerType="circle"
              color={this.state.treeNamesDict[item]["color"]}
            />
          ))}

          {(hoveredTreeID ||
            clickedTreeID ||
            hoveredTreeID === 0 ||
            clickedTreeID === 0) && (
            <TreePopUp
              isClicked={clickedTreeID || clickedTreeID === 0 ? 1 : 0}
              hoveredTree={
                this.state.treeArray[
                  hoveredTreeID || hoveredTreeID === 0
                    ? hoveredTreeID
                    : clickedTreeID
                ]
              }
              getMeThere={false}
              onCloseButtonClick={this.onCloseButtonClick}
              onInfoButtonClick={this.onInfoButtonClick}
            />
          )}
        </Map>
        <TemporaryDrawer
          wikiDesc={this.state.wikiDesc}
          thumbnailUrl={this.state.thumbnailUrl}
          leftDrawer={this.state.leftDrawer}
          openDrawer={this.state.openDrawer}
          toggleDrawer={this.toggleDrawer}
        />
      </div>
    ) : (
      <CircularIndeterminate />
    );
  }
}

export default NearbyTreesMap;
