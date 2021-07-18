import React, { Component } from "react";
import Particles from "react-particles-js";
import "./App.css";
import { Navigation } from "./components/Navigations/Navigation";
import "tachyons";
import Logo from "./components/Logos/Logo";
import ImageLink from "./components/ImageLinkForm/ImageLink";
import { Rank } from "./components/Rank/Rank";
import { FaceRecognition } from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/SignIn/Signin";
import Register from "./components/Register/Register";

// const app = new Clarifai.App({
//   apiKey: "ae28d77ec6ac4e719be4fc9454b0702f",
// });
//we have moved the clarifai api to backend so that no one can steal our api key from network tab
//and use it for harmful purposes

//deployed on https://smart-brain-front-08.herokuapp.com/
const ParticleOpt = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 700,
      },
    },
  },
};

const initialState = {
  input: "",
  imageurl: "",
  box: {},
  route: "signin",
  SignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  FaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onLinkSubmit = () => {
    this.setState({ imageurl: this.state.input });
    fetch("https://smart-brain-08.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((resp) => resp.json())
      .then((response) => {
        if (response) {
          fetch("https://smart-brain-08.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch((err) => console.log(err));
        }
        this.FaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (Route) => {
    if (Route === "signout") {
      this.setState(initialState);
    } else if (Route === "home") {
      this.setState({ SignedIn: true });
    }
    this.setState({ route: Route });
  };

  render() {
    const { SignedIn, imageurl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={ParticleOpt} />

        <Navigation SignedIn={SignedIn} onRouteChange={this.onRouteChange} />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLink
              onInputChange={this.onInputChange}
              onLinkSubmit={this.onLinkSubmit}
            />
            <FaceRecognition box={box} imageurl={imageurl} />
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
