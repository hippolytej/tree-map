import React, { Component } from 'react';
import { Popup } from 'react-mapbox-gl';

class TreePopUp extends Component {
    render() {
        var hoveredTree = this.props.hoveredTree;
        const onPopUpClick = this.props.onPopUpClick;
        return (
            <Popup
                key={hoveredTree.recordid}
                coordinates={hoveredTree.geometry.coordinates}
                offset={15}
                onClick={onPopUpClick}
            >
                <div>
                    <h3>{hoveredTree.fields.libellefrancais}</h3>
                    <div>Espèce : {hoveredTree.fields.espece}</div>
                    <div>Genre : {hoveredTree.fields.genre}</div>
                    {hoveredTree.fields.dateplantation ? (<div> Année de plantation : {
                        hoveredTree.fields.dateplantation.substr(0, 4)} </div>) : null}
                </div>
            </Popup>
        );
    }
}

export default TreePopUp;