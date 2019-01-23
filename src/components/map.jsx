import React, { Component } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import TreeLayer from './treeLayer';
import TreePopUp from './treePopUp';
import { token, style } from '../config.json';

const Map = ReactMapboxGl({
    minZoom: 8,
    maxZoom: 15,
    accessToken: token
});
const mapStyle = style;
const flyToOptions = {
    speed: 0.6
};



class TreeMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            treeDict: '',
            nbTrees: 0,
            treeIds: [],
            hoveredTreeID: '',
            mapCenter: [2.3466110229492188, 48.85613168160397],
            zoom: [12]
        };
    }

    onTreeHover = (hoveredTreeID, { map }) => {
        map.getCanvas().style.cursor = 'pointer';
        // this.setState({hoveredTreeID: hoveredTreeID});
    }

    onTreeEndHover = ({ map }) => {
        map.getCanvas().style.cursor = '';
        // this.setState({hoveredTreeID: ''});
    }

    onTreeClick = (hoveredTreeID) => {
        this.setState({
            hoveredTreeID: hoveredTreeID,
            mapCenter: this.state.treeDict[hoveredTreeID].geometry.coordinates,
            zoom: [14]
        });
    };

    componentWillMount(){
        var ids = [];
        return fetch('https://opendata.paris.fr/api/records/1.0/search/?dataset=arbresremarquablesparis&rows=200')
            .then((response) => response.json())
            .then((responseJson) => {
                var maxNbTrees = Math.min(responseJson.parameters.rows, responseJson.nhits);
                for (var i = 0; i < maxNbTrees; i++) {
                    ids.push(i)
                }
                this.setState({
                    treeDict: responseJson.records,
                    nbTrees: maxNbTrees,
                    treeIds: ids
            }, function(){
                console.log('dict', this.state.treeDict);
                console.log('nb', this.state.nbTrees);
                console.log('ids', this.state.treeIds);
            });
        })
            .catch((error) =>{
            console.error(error);
        });
    }
    render() {
        const hoveredTreeID = this.state.hoveredTreeID;
        const mapCenter = this.state.mapCenter;
        const zoom = this.state.zoom;
        return (
            <Map
                style={mapStyle}
                center={mapCenter}
                containerStyle={{ width: '100vw', height: '100vh'}}
                flyToOptions={flyToOptions}
                zoom={zoom}
            >
                <TreeLayer
                    onTreeHover={this.onTreeHover}
                    onTreeEndHover={this.onTreeEndHover}
                    treeIds={this.state.treeIds}
                    treeDict={this.state.treeDict}
                    onTreeClick={this.onTreeClick}
                />
                {hoveredTreeID && (
                    <TreePopUp
                        hoveredTree={this.state.treeDict[hoveredTreeID]}
                    />
                    )}
            </Map>
        );
    }
}

export default TreeMap;
