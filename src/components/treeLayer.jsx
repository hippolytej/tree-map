import React, { Component } from 'react';
import { Layer, Feature } from 'react-mapbox-gl';

class TreeLayer extends Component {
    render() {
        const treeIds = this.props.treeIds;
        const treeDict = this.props.treeDict;
        return (
            <Layer
                type="symbol"
                id={'trees'}
                layout={{'icon-image': 'park-15'}}>
                {
                    treeIds.map(id => (
                        <Feature
                            onMouseEnter={this.props.onTreeHover.bind(this, treeDict[id])}
                            onMouseLeave={this.props.onTreeEndHover.bind(this)}
                            coordinates={treeDict[id].geometry.coordinates}
                            onClick={this.props.onTreeClick.bind(null, treeDict[id])}
                            key={id}
                        />
                    ))
                }
            </Layer>
        );
    }
}

export default TreeLayer;