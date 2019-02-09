import React, { Component } from 'react';
import TreeMap from './map'
import TemporaryDrawer from './drawer'

class Explore extends Component {
  render() {
    return (
      <div>
        <TemporaryDrawer />
        <TreeMap />
      </div>
    );
  }
}

export default Explore;