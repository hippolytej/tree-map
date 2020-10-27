import React, { Component } from "react";
import NearbyTreesMap from "./nearbyTreesMap";

class Explore extends Component {
  render() {
    return (
      <div>
        <NearbyTreesMap
          adress={
            this.props.location.state ? this.props.location.state.address : ""
          }
        />
      </div>
    );
  }
}

export default Explore;
