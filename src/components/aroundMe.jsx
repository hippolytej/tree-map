import React, { Component } from "react";
import "../App.css";
import TreePopUp from "./treePopUp";
import LinkButton from "./linkbutton";
import TemporaryDrawer from "./drawer";
import ReactMapboxGl from "react-mapbox-gl";
import { token, style } from "../config.json";
import { isMobile } from "react-device-detect";
import { wikiData } from "../api_utils/wikiData";
import { parisData } from "../api_utils/parisData";
import TreeLayer from "./treeLayer";
import CircularIndeterminate from "./progress";
import { getCoordinates } from "../api_utils/geocode";

const Map = ReactMapboxGl({
  minZoom: 11,
  maxZoom: 20,
  accessToken: token,
});
const mapStyle = style;
const radius = 500;
const flyToOptions = {
  speed: 0,
};

class aroundMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationAvailable: false,
      treeDict: "",
      nbTrees: 0,
      treeIds: [],
      hoveredTreeID: "",
      clickedTreeID: "",
      address: this.props.location.state
        ? this.props.location.state.address
        : "",
      latitude: 0,
      longitude: 0,
      zoom: [17],
      openDrawer: false,
      wikiTreeData: "",
      thumbnailUrl: "",
      wikiDesc: "",
    };
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
    console.log("CALLED WITH ", this.state);
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

  onTreeHover = (hoveredTreeID, { map }) => {
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
  };

  onTreeEndHover = ({ map }) => {
    map.getCanvas().style.cursor = "";
    this.setState({ hoveredTreeID: "" });
  };

  onTreeClick = (hoveredTreeID) => {
    this.setState({
      hoveredTreeID: hoveredTreeID,
      clickedTreeID: hoveredTreeID,
    });
  };

  onInfoButtonClick = () => {
    console.log("CLICKED");
    this.setState({
      openDrawer: true,
      //mapCenter: this.state.treeDict[hoveredTreeID].geometry.coordinates
    });
    var treeId = this.state.hoveredTreeID
      ? this.state.hoveredTreeID
      : this.state.clickedTreeID;
    var genre = this.state.treeDict[treeId].fields.genre;
    var espece = this.state.treeDict[treeId].fields.espece;
    var keyword = genre + "_" + espece;
    this.wikiTreeData(keyword);
  };

  onCloseButtonClick = () => {
    this.setState({
      hoveredTreeID: "",
      clickedTreeID: "",
      //mapCenter: this.state.treeDict[hoveredTreeID].geometry.coordinates
    });
  };

  toggleDrawer = () => {
    this.setState({
      openDrawer: false,
      thumbnailUrl: "",
      wikiDesc: "",
    });
  };

  wikiTreeData() {
    wikiData.apply(this, arguments);
  }

  render() {
    const mapCenter = [this.state.longitude, this.state.latitude];
    const zoom = this.state.zoom;
    const hoveredTreeID = this.state.hoveredTreeID;
    const clickedTreeID = this.state.clickedTreeID;
    return this.state.locationAvailable ? (
      <div>
        <Map
          onStyleLoad={this.onMapLoad}
          style={mapStyle}
          center={mapCenter}
          containerStyle={{ width: "100vw", height: "100vh" }}
          flyToOptions={flyToOptions}
          zoom={zoom}
        >
          <LinkButton text="Accueil" variant="outlined" to="/">
            Home
          </LinkButton>
          <TreeLayer
            onTreeHover={this.onTreeHover}
            onTreeEndHover={this.onTreeEndHover}
            treeIds={this.state.treeIds}
            treeDict={this.state.treeDict}
            onTreeClick={this.onTreeClick}
          />
          {(hoveredTreeID ||
            clickedTreeID ||
            hoveredTreeID === 0 ||
            clickedTreeID === 0) && (
            <TreePopUp
              isClicked={clickedTreeID || clickedTreeID === 0 ? 1 : 0}
              hoveredTree={
                this.state.treeDict[
                  hoveredTreeID || hoveredTreeID === 0
                    ? hoveredTreeID
                    : clickedTreeID
                ]
              }
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

export default aroundMe;
