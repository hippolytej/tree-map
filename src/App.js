import React, { Component } from 'react';
import TreeMap from './components/map'
import TemporaryDrawer from './components/drawer'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <TemporaryDrawer />
        <TreeMap />
      </div>
    );
  }
}

export default App;
