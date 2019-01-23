import React, { Component } from 'react';
import { Popup } from 'react-mapbox-gl';

class TreePopUp extends Component {
    render() {
        var hoveredTree = this.props.hoveredTree;
        return (
            <Popup key={hoveredTree.recordid} coordinates={hoveredTree.geometry.coordinates}>
                <div>
                    <h3>{hoveredTree.fields.libellefrancais}</h3>
                    <div>Espèce : {hoveredTree.fields.espece}</div>
                    <div>Genre : {hoveredTree.fields.genre}</div>
                    {hoveredTree.fields.dateplantation ? (<div> Date de plantation : {hoveredTree.fields.dateplantation} </div>) : null}
                </div>
            </Popup>
        );
    }
}

export default TreePopUp;