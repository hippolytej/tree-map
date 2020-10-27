import React from "react";
import CircularIndeterminate from "./progress";

class ImageWithStatusText extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageLoaded: false };
  }

  handleImageLoaded() {
    this.setState({ imageLoaded: true });
    console.log("LOADED", this.state);
  }

  handleImageErrored() {
    this.setState({ imageLoaded: false });
  }

  componentDidMount() {
    setTimeout(() => this.setState({ imageLoaded: true }), 3000);
  }

  render() {
    const imageLoaded = this.state.imageLoaded;
    const imageUrl = this.props.imageUrl;
    return (
      <div>
        <img
          src={imageUrl}
          onLoad={this.handleImageLoaded.bind(this)}
          onError={this.handleImageErrored.bind(this)}
          alt=""
          style={{ paddingTop: 10 }}
        />
        {imageLoaded ? null : <CircularIndeterminate />}
      </div>
    );
  }
}

export default ImageWithStatusText;
