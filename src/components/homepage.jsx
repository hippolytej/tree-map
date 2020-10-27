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
          <img src="/logo_canopee_v0.001.png" alt="logo" height="200" />
          <h1>canopee</h1>
          <p>Votre guide arboricole</p>
        </header>
        <main>
          <h3>Explorez le Paris des arbres remarquables</h3>
          <LinkButton text="Carte" variant="outlined" to="/explore" />
          <h3>Faites conaissance avec les arbres qui vous entourent</h3>
          <AddressForm
            onChange={this.handleAddressChange}
            onEnterDown={this.onEnterDown}
            value={this.state.address}
          />
          <p style={{ paddingTop: 0, paddingBottom: 0 }}>ou bien</p>
          <LinkButton
            text="Autour de vous"
            variant="outlined"
            to={{ pathname: "/around-me", state: this.state }}
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
