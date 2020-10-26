import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import LinkButton from "./linkbutton";
import TextField from "./textfield";

const ExploreLink = (props) => <Link to="/explore" {...props} />;
const AroundMeLink = (props) => (
  <Link
    to={{
      pathname: "/around-me",
      state: { latitude: 48.83613168160397, longitude: 2.3466110229492188 },
    }}
    {...props}
  />
);

class HomePage extends Component {
  render() {
    return (
      <div>
        <header>
          <img src="/logo_canopee_v0.001.png" alt="logo" height="200" />
          <h1>canopee</h1>
          <p>Votre guide arboricole</p>
        </header>
        <main>
          <LinkButton text="Explorez" variant="outlined" link={ExploreLink} />
          <LinkButton
            text="Autour de vous"
            variant="outlined"
            link={AroundMeLink}
          />
          <TextField text="Explorez" />
        </main>
        <footer>
          <LinkButton
            className="inner"
            text="Code"
            link={"a"}
            href={"https://github.com/hippolytej/tree-map"}
          />
          <LinkButton
            text="Coolitude"
            link={"a"}
            href={"https://www.arbres.org/actualite.html"}
          />
          <LinkButton
            text="Data"
            link={"a"}
            href={
              "https://opendata.paris.fr/explore/dataset/les-arbres/information/"
            }
          />
        </footer>
      </div>
    );
  }
}

export default HomePage;
