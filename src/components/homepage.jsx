import React, { Component } from "react";
import "../App.css";
import { RegularLink, FloatingLink } from "./linkbuttons";
import MiddleDivider from "./divider";
import AddressForm from "./addressForm";
import LocationOn from "@material-ui/icons/LocationOn";
import MapIcon from "@material-ui/icons/Map";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
    };
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.onEnterDown = this.onEnterDown.bind(this);
  }

  handleAddressChange(value) {
    this.setState({ address: value });
  }

  onEnterDown() {
    this.props.history.push({ pathname: "/around-me", state: this.state });
  }

  render() {
    return (
      <div>
        <header>
          <img src="/logo_canopee_v0.001.png" alt="logo" height={"100%"} />
        </header>
        <main>
          <h3>A la recherche d'un bel arbre ?</h3>
          <FloatingLink
            text="Carte des arbres remarquables"
            variant="outlined"
            to="/explore"
            logo={<MapIcon />}
          />
          <MiddleDivider />
          <h3>Quels sont les arbres qui vous entourent ?</h3>
          <FloatingLink
            text="Utiliser ma position"
            variant="outlined"
            logo={<LocationOn />}
            to={{ pathname: "/around-me", state: this.state }}
          />
          <AddressForm
            placeholder="Ou plutôt à cette adresse"
            onChange={this.handleAddressChange}
            onEnterDown={this.onEnterDown}
            value={this.state.address}
          />
        </main>
        <footer>
          <RegularLink
            className="inner"
            text="Code"
            href={"https://github.com/hippolytej/tree-map"}
          />
          <RegularLink
            text="Coolitude"
            href={"https://www.arbres.org/actualite.html"}
          />
          <RegularLink
            text="Data"
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
