import React, { Component } from "react";
import "../App.css";
import LinkButton from "./linkbutton";
import AddressForm from "./addressForm";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
    };
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  handleAddressChange(value) {
    this.setState({ address: value });
  }

  render() {
    return (
      <div>
        <header>
          <img src="/logo_canopee_v0.001.png" alt="logo" height="200" />
          <h1>canopee</h1>
          <p>Votre guide arboricole</p>
        </header>
        <main>
          <LinkButton text="Explorez" variant="outlined" to="/explore" />
          <LinkButton
            text="Autour de vous"
            variant="outlined"
            to={{ pathname: "/around-me", state: this.state }}
          />
          <AddressForm
            onChange={this.handleAddressChange}
            value={this.state.address}
          />
        </main>
        <footer>
          <LinkButton
            className="inner"
            text="Code"
            href={"https://github.com/hippolytej/tree-map"}
          />
          <LinkButton
            text="Coolitude"
            href={"https://www.arbres.org/actualite.html"}
          />
          <LinkButton
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
