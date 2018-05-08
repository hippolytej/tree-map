import React, { Component } from 'react';
import { Popup } from 'react-mapbox-gl';

class TreePopUp extends Component {
    render() {
        var hoveredTree = this.props.hoveredTree;
        return (
            <Popup key={hoveredTree.recordid} coordinates={hoveredTree.geometry.coordinates}>
                <div>
                    <h3>{hoveredTree.fields.libellefrancais}</h3>
                    <p>Espèce : {hoveredTree.fields.espece}</p>
                    <p>Genre : {hoveredTree.fields.genre}</p>
                    {hoveredTree.fields.dateplantation ? (<p> Date de plantation : {hoveredTree.fields.dateplantation} </p>) : null}
                </div>
            </Popup>
        );
    }
}

export default TreePopUp;