import React, { Component } from "react";
import { token, style } from "../config.json";
// Components
import ReactMapboxGl from "react-mapbox-gl";
import TreeLayer from "./treeLayer";
import TreePopUp from "./treePopUp";
import LinkButton from "./linkbutton";
import TemporaryDrawer from "./drawer";
// Utils
import { remarkableParisData } from "../utils/parisData";
import * as mapUtils from "../utils/map_utils";

const Map = ReactMapboxGl({
  minZoom: 11,
  maxZoom: 16,
  accessToken: token,
});
const mapStyle = style;
const flyToOptions = {
  speed: 0.6,
};

class RemarkableTreesMap extends Component {
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
    this.onTreeHover = mapUtils.onTreeHover.bind(this);
    this.onTreeEndHover = mapUtils.onTreeEndHover.bind(this);
    this.onTreeClick = mapUtils.onTreeClick.bind(this);
    this.onInfoButtonClick = mapUtils.onInfoButtonClick.bind(this);
    this.onCloseButtonClick = mapUtils.onCloseButtonClick.bind(this);
    this.toggleDrawer = mapUtils.toggleDrawer.bind(this);
    this.onMapLoad = mapUtils.onMapLoad.bind(this);
    this.treeData = remarkableParisData.bind(this);
  }

  componentDidMount() {
    this.treeData();
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

export default RemarkableTreesMap;
