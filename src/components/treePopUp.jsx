import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'react-mapbox-gl';
import PopUpButton from './button';
import { isMobile } from 'react-device-detect';

class TreePopUp extends Component {
    render() {
        var hoveredTree = this.props.hoveredTree;
        const onCloseButtonClick = this.props.onCloseButtonClick;
        const onInfoButtonClick = this.props.onInfoButtonClick;
        const isClicked = this.props.isClicked;
        const long = hoveredTree.geometry.coordinates[0]
        const lat = hoveredTree.geometry.coordinates[1];
        const cityMapperLink = `https://citymapper.com/directions?endcoord=${lat}%2C${long}&endname=Arbre%20Remarquable`;
        return (
            <Popup
                key={hoveredTree.recordid}
                coordinates={hoveredTree.geometry.coordinates}
                offset={15}
            // style={{maxWidth: 200, minWidth: 200}}
            >
                <div style={{ overflowX: 'auto' }}>
                    <h3 style={{ fontFamily: 'Roboto', fontSize: 14, marginTop: 5, marginBottom: 5 }}>{hoveredTree.fields.libellefrancais}</h3>
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td style={{ fontFamily: 'Roboto', fontSize: 14, fontWeight: 'medium' }}>Genre</td>
                                <td style={{ fontFamily: 'Roboto', fontSize: 14, textAlign: 'right' }}>{hoveredTree.fields.genre}</td>
                            </tr>
                            <tr>
                                <td style={{ fontFamily: 'Roboto', fontSize: 14, fontWeight: 'medium' }}>Espèce</td>
                                <td style={{ fontFamily: 'Roboto', fontSize: 14, textAlign: 'right' }}>{hoveredTree.fields.espece}</td>
                            </tr>
                            {"dateplantation" in hoveredTree.fields ?
                                <tr>
                                    <td style={{ fontFamily: 'Roboto', fontSize: 14, fontWeight: 'medium' }}>Planté en</td>
                                    <td style={{ fontFamily: 'Roboto', fontSize: 14, textAlign: 'right' }}>{hoveredTree.fields.dateplantation.substr(0, 4)}</td>
                                </tr>
                                : null}

                        </tbody>
                    </table>
                    {(isClicked || isMobile) ?
                        <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            <a
                                href={cityMapperLink}
                                target="_blank"
                                rel="noopener noreferrer">
                                <img
                                    src="https://static.citymapper.com/img/embed/GetMeThere_Citymapper.png"
                                    alt="Get directions with Citymapper"
                                />
                            </a>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <PopUpButton
                                    onClick={onInfoButtonClick}
                                    text="Infos">
                                </PopUpButton>
                                <PopUpButton
                                    onClick={onCloseButtonClick}
                                    text="Fermer">
                                </PopUpButton>
                            </div>
                        </div>
                        : null}
                </div>
            </Popup>
        );
    }
}

TreePopUp.propTypes = {
    onInfoButtonClick: PropTypes.func.isRequired
};

export default TreePopUp;