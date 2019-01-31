import React, { Component } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { GeolocateControl } from 'mapbox-gl';
import TreeLayer from './treeLayer';
import TreePopUp from './treePopUp';
import TemporaryDrawer from './drawer';
import { token, style } from '../config.json';

const Map = ReactMapboxGl({
    minZoom: 11,
    maxZoom: 16,
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
            zoom: [12],
            leftDrawer: false,
            bottomDrawer: false,
            wikiTreeData: '',
            thumbnailUrl : '',
            wikiDesc : ''
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    onMapLoad = (map) => {
        map.addControl(
            new GeolocateControl({
                positionOptions: {enableHighAccuracy: true},
                trackUserLocation: false})
                );
      };

    onTreeHover = (hoveredTreeID, { map }) => {
        map.getCanvas().style.cursor = 'pointer';
        this.setState({hoveredTreeID: hoveredTreeID});
    }

    onTreeEndHover = ({ map }) => {
        map.getCanvas().style.cursor = '';
        this.setState({hoveredTreeID: ''});
    }

    onTreeClick = (hoveredTreeID) => {
        this.setState({
            hoveredTreeID: hoveredTreeID,
            bottomDrawer: true
            //mapCenter: this.state.treeDict[hoveredTreeID].geometry.coordinates
        });
        var species = this.state.treeDict[hoveredTreeID].fields.libellefrancais;
        console.log('species', species)
        this.wikiTreeData(species);
    };

    onPopUpClick = () => {
        this.setState({
            hoveredTreeID: ''
            //mapCenter: this.state.treeDict[hoveredTreeID].geometry.coordinates
        });
    }

    toggleDrawer = () => {
        this.setState({
            bottomDrawer: false,
            thumbnailUrl: ''
        });
    };

    componentDidMount(){
        this.TreeData();
    }

    TreeData = async () => {
        var ids = [];
        const response = await fetch(
            'https://opendata.paris.fr/api/records/1.0/search/?dataset=arbresremarquablesparis&rows=200');
        const responseJson = await response.json();
        var maxNbTrees = Math.min(responseJson.parameters.rows, responseJson.nhits);
        for (var i = 0; i < maxNbTrees; i++) {
            ids.push(i)
        }
        return this.setState({
            treeDict: responseJson.records,
            nbTrees: maxNbTrees,
            treeIds: ids
        }, function(){
            console.log('dict', this.state.treeDict);
            console.log('nb', this.state.nbTrees);
            console.log('ids', this.state.treeIds);
        });
    }

    wikiTreeData = async (species) => {
        var safeSpecies = species.split(' ').join('_')

        // First search for a page, get best result, get the title of the best result
        const searchResponse = await fetch(
            `https://fr.wikipedia.org/w/api.php?action=opensearch&search=${safeSpecies}&format=json&redirects=resolve&origin=*`);
        const responseJson = await searchResponse.json();
        const bestResult = await responseJson[3][0];
        console.log('Best result', bestResult);
        var bestResultTitle = bestResult.split('/').slice(-1)[0]
        console.log('Best result title', bestResultTitle);

        const descQueryResponse = await fetch(
            `https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${bestResultTitle}&origin=*`);
        const descQueryJson = await descQueryResponse.json();
        console.log('descQuery Json', descQueryJson)
        const descPages = descQueryJson.query.pages;
        console.log('Pages', descPages)
        const desc = descPages[Object.keys(descPages)[0]].extract;
        console.log('desc', desc)

        // Then query the best result's page :)
        const thumbQueryResponse = await fetch(
            `https://fr.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${bestResultTitle}&format=json&pithumbsize=200&origin=*`);
        const thumbQueryJson = await thumbQueryResponse.json();
        console.log('thumbQuery Json', thumbQueryJson)
        const thumbPages = thumbQueryJson.query.pages;
        console.log('Pages', thumbPages)
        const thumbnail = thumbPages[Object.keys(thumbPages)[0]].thumbnail.source;
        console.log('Thumbnail', thumbnail)

        //TODO const description = queryJson;
        return this.setState({
            wikiDesc: desc,
            thumbnailUrl: thumbnail
        }, function(){
            console.log('wikiData', this.state.thumbnailUrl);
        });
    }

    render() {
        const hoveredTreeID = this.state.hoveredTreeID;
        const mapCenter = this.state.mapCenter;
        const zoom = this.state.zoom;
        return (
            <div>
                <Map
                    onStyleLoad={this.onMapLoad}
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
                            onPopUpClick={this.onPopUpClick}
                        />
                        )}
                </Map>
                <TemporaryDrawer
                    wikiDesc={this.state.wikiDesc}
                    thumbnailUrl={this.state.thumbnailUrl}
                    leftDrawer={this.state.leftDrawer}
                    bottomDrawer={this.state.bottomDrawer}
                    toggleDrawer={this.toggleDrawer}
                />
            </div>
        );
    }
}

export default TreeMap;
