import React, { Component } from "react";
import ReactMapboxGl from "react-mapbox-gl";
import { GeolocateControl } from "mapbox-gl";
import TreeLayer from "./treeLayer";
import TreePopUp from "./treePopUp";
import LinkButton from "./linkbutton";
import TemporaryDrawer from "./drawer";
import { token, style } from "../config.json";
import { isMobile } from "react-device-detect";
import { wikiData } from "../api_utils/wikiData";
import { remarkableParisData } from "../api_utils/parisData";

const Map = ReactMapboxGl({
  minZoom: 11,
  maxZoom: 16,
  accessToken: token,
});
const mapStyle = style;
const flyToOptions = {
  speed: 0.6,
};

class TreeMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeArray: "",
      nbTrees: 0,
      treeIds: [],
      hoveredTreeID: "",
      clickedTreeID: "",
      clickedTreeName: "",
      mapCenter: [2.3466110229492188, 48.85613168160397],
      zoom: [12],
      openDrawer: false,
      wikiTreeData: "",
      thumbnailUrl: "",
      wikiDesc: "",
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.onInfoButtonClick = this.onInfoButtonClick.bind(this);
  }

  onMapLoad = (map) => {
    map.addControl(
      new GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: false,
      })
    );
  };

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
    this.setState({
      openDrawer: true,
      //mapCenter: this.state.treeDict[hoveredTreeID].geometry.coordinates
    });
    var treeId = this.state.hoveredTreeID
      ? this.state.hoveredTreeID
      : this.state.clickedTreeID;
    var name = this.state.treeArray[treeId].fields.libellefrancais;
    var genre = this.state.treeArray[treeId].fields.genre;
    var espece = this.state.treeArray[treeId].fields.espece;
    var keyword = genre + "_" + espece;
    this.wikiTreeData(keyword);
    this.setState({ clickedTreeName: name });
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

  componentDidMount() {
    this.treeData();
  }

  treeData() {
    remarkableParisData.apply(this);
  }

  wikiTreeData() {
    wikiData.apply(this, arguments);
  }

  render() {
    const hoveredTreeID = this.state.hoveredTreeID;
    const clickedTreeID = this.state.clickedTreeID;
    const mapCenter = this.state.mapCenter;
    const zoom = this.state.zoom;
    return (
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
            treeArray={this.state.treeArray}
            onTreeClick={this.onTreeClick}
            markerType="symbol"
          />
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
              getMeThere={true}
              onCloseButtonClick={this.onCloseButtonClick}
              onInfoButtonClick={this.onInfoButtonClick}
            />
          )}
        </Map>
        <TemporaryDrawer
          wikiDesc={this.state.wikiDesc}
          thumbnailUrl={this.state.thumbnailUrl}
          treeName={this.state.clickedTreeName}
          leftDrawer={this.state.leftDrawer}
          openDrawer={this.state.openDrawer}
          toggleDrawer={this.toggleDrawer}
        />
      </div>
    );
  }
}

export default TreeMap;