import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import LinkButton from './components/link';

const ExploreLink = props => <Link to="/explore" {...props} />

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Arboricool</h1>
        </div>
        <p>Votre guide arboricole</p>
        <LinkButton text="Explore" link={ExploreLink}>Explore</LinkButton>
      </div>
    );
  }
}

export default App;