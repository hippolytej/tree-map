import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import LinkButton from './linkbutton';

const HomeLink = props => <Link to="/" {...props} />

class Explore extends Component {
  render() {
    return (
      <div>
        <main>
          Coming soon
        </main>
        <footer>
          <LinkButton text="Accueil" variant="outlined" link={HomeLink}>Home</LinkButton>
        </footer>
      </div>
    );
  }
}

export default Explore;