import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
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

const HomeLink = (props) => <Link to="/" {...props} />;

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
    var latitude = 0;
    var longitude = 0;
    var gotLocation = false;
    if (this.props.location.state) {
      latitude = this.props.location.state.latitude;
      longitude = this.props.location.state.longitude;
      gotLocation = true;
      console.log("USING LINK DATA");
    } else {
      console.log("USING DEFAULT DATA");
    }
    this.state = {
      locationAvailable: gotLocation,
      treeDict: "",
      nbTrees: 0,
      treeIds: [],
      hoveredTreeID: "",
      clickedTreeID: "",
      latitude: latitude,
      longitude: longitude,
      zoom: [16],
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
        console.log("GOTLOCATION");
        parisData.apply(this, [
          this.state.latitude,
          this.state.longitude,
          radius,
        ]);
      }
    );
    console.log("lat", this.state.latitude);
    console.log("long", this.state.longitude);
  };

  errorHandler = (err) => {
    if (err.code === 1) {
      alert("Error: Access is denied!");
    } else if (err.code === 2) {
      alert("Error: Position is unavailable!");
    }
  };

  getUserPosition() {
    console.log("CALLED");
    if (navigator.geolocation) {
      var options = { timeout: 60000 };
      navigator.geolocation.getCurrentPosition(
        this.locationFound,
        this.errorHandler,
        options
      );
    } else {
      alert("Sorry, browser does not support geolocation!");
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
          <LinkButton text="Accueil" variant="outlined" link={HomeLink}>
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
