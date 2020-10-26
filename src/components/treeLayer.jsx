import React, { Component } from "react";
import { Layer, Feature } from "react-mapbox-gl";

class TreeLayer extends Component {
  render() {
    const treeIds = this.props.treeIds;
    const treeArray = this.props.treeArray;
    const color = this.props.color;
    const markerType = this.props.markerType;
    return (
      <Layer
        type={markerType}
        id={this.props.treeType}
        layout={markerType === "symbol" ? { "icon-image": "billy" } : undefined}
        paint={
          markerType === "circle"
            ? { "circle-radius": 7, "circle-color": color }
            : undefined
        }
      >
        {treeIds.map((id) => (
          <Feature
            onMouseEnter={this.props.onTreeHover.bind(this, id)}
            onMouseLeave={this.props.onTreeEndHover.bind(this)}
            coordinates={treeArray[id].geometry.coordinates}
            onClick={this.props.onTreeClick.bind(null, id)}
            key={id}
          />
        ))}
      </Layer>
    );
  }
}

export default TreeLayer;
