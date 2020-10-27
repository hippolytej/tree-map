import React, { Component } from "react";
import "../App.css";
import { RegularLink, FloatingLink } from "./linkbuttons";
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
          <img src="/logo_canopee_v0.001.png" alt="logo" height={"100%"} />
        </header>
        <main>
          <h3>Explorez le Paris des arbres remarquables</h3>
          <FloatingLink text="Carte" variant="outlined" to="/explore" />
          <h3>Faites conaissance avec les arbres qui vous entourent</h3>
          <FloatingLink
            text="Autour de vous"
            variant="outlined"
            to={{ pathname: "/around-me", state: this.state }}
          />
          <AddressForm
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
