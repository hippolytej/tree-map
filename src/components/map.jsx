import React, { Component } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { GeolocateControl } from 'mapbox-gl';
import TreeLayer from './treeLayer';
import TreePopUp from './treePopUp';
import TemporaryDrawer from './drawer';
import { token, style } from '../config.json';
import { isMobile } from 'react-device-detect';

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
            clickedTreeID: '',
            mapCenter: [2.3466110229492188, 48.85613168160397],
            zoom: [12],
            openDrawer: false,
            wikiTreeData: '',
            thumbnailUrl : '',
            wikiDesc : ''
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.onInfoButtonClick = this.onInfoButtonClick.bind(this);
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
        this.setState({hoveredTreeID: this.state.clickedTreeID ? '' : hoveredTreeID});
        if (isMobile) {
            this.setState({clickedTreeID: hoveredTreeID});
        }
    }

    onTreeEndHover = ({ map }) => {
        map.getCanvas().style.cursor = '';
        this.setState({hoveredTreeID: ''});
    }

    onTreeClick = (hoveredTreeID) => {
        this.setState({
            hoveredTreeID: hoveredTreeID,
            clickedTreeID: hoveredTreeID
        });
    };

    onInfoButtonClick = () => {
        console.log('CLICKED');
        this.setState({
            openDrawer: true
            //mapCenter: this.state.treeDict[hoveredTreeID].geometry.coordinates
        });
        var treeId = this.state.hoveredTreeID ? this.state.hoveredTreeID : this.state.clickedTreeID
        var genre = this.state.treeDict[treeId].fields.genre;
        var espece = this.state.treeDict[treeId].fields.espece;
        var keyword = genre + '_' + espece
        this.wikiTreeData(keyword);
    }

    onCloseButtonClick = () => {
        this.setState({
            hoveredTreeID: '',
            clickedTreeID: ''
            //mapCenter: this.state.treeDict[hoveredTreeID].geometry.coordinates
        });
    }

    toggleDrawer = () => {
        this.setState({
            openDrawer: false,
            thumbnailUrl: '',
            wikiDesc: ''
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

    wikiTreeData = async (keyword) => {
        var safeKeyword = keyword.split(' ').join('_')
        console.log('Safe Keyword: ', safeKeyword)
        var urlBase = 'https://fr.wikipedia.org/w/api.php?format=json&origin=*'
        // First search for a page, get best result, get the title of the best result
        var bestResultTitle = ''
        var bestResultId = 0
        try {
            const searchResponse = await fetch(
                `${urlBase}&action=query&list=search&srsearch=${safeKeyword}`);
                // `${urlBase}&action=opensearch&search=${safeGenre}+incategory:Arbre&redirects=resolve`);
            const responseJson = await searchResponse.json();
            console.log('Search response Json', responseJson);
            bestResultTitle = await responseJson.query.search[0].title;
            bestResultId = await responseJson.query.search[0].pageid;
            console.log('Best result', bestResultTitle);
        } catch (error) {
            console.log('search error', error)
        }

        var desc = ''
        try {
            const descQueryResponse = await fetch(
                `${urlBase}&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${bestResultTitle}`);
            const descQueryJson = await descQueryResponse.json();
            console.log('descQuery Json', descQueryJson)
            const descPages = await descQueryJson.query.pages;
            console.log('Pages', descPages)
            desc = await descPages[Object.keys(descPages)[0]].extract;
            console.log('desc', desc)
        } catch (error) {
            console.log('desc error', error)
        }

        // Then query the best result's page :)
        var thumbnail = ''
        try {
            const thumbQueryResponse = await fetch(
                `${urlBase}&action=query&prop=pageimages&titles=${bestResultTitle}&pithumbsize=200`);
            const thumbQueryJson = await thumbQueryResponse.json();
            console.log('thumbQuery Json', thumbQueryJson)
            thumbnail = await thumbQueryJson.query.pages[bestResultId].thumbnail.source;
            console.log('Thumbnail', thumbnail)
        } catch (error) {
            console.log('thumbnail error', error)
        }

        return this.setState({
            wikiDesc: desc,
            thumbnailUrl: thumbnail
        }, function(){
            console.log('wikiData', this.state.thumbnailUrl);
        });
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
                    {((hoveredTreeID + clickedTreeID) || (hoveredTreeID + clickedTreeID) === 0) && (
                        <TreePopUp
                            isClicked={clickedTreeID ? 1 : 0}
                            hoveredTree={this.state.treeDict[hoveredTreeID ? hoveredTreeID : clickedTreeID]}
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
        );
    }
}

export default TreeMap;
