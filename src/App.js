import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/SignIn/Signin";
import Register from "./components/Register/Register";
import "./App.css";

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    line_linked: {
      shadow: {
        enable: true,
        blur: 5,
      },
      opacity: 0.4,
    },
    opacity: 0.5,
  },
};

const initialState = {
  input: "",
  imageURL: "",
  regionArray: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = (data) => {
    console.log(data); // i get an undefined here
    const clarifaiFace = data.outputs[0].data.regions;

    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    const regionArray = clarifaiFace.map((region) => ({
      leftCol: region.region_info.bounding_box.left_col * width,
      topRow: region.region_info.bounding_box.top_row * height,
      rightCol: width - region.region_info.bounding_box.right_col * width,
      bottomRow: height - region.region_info.bounding_box.bottom_row * height,
    }));

    return regionArray;
  };

  displayFaceBox = (regionArray) => {
    console.log(regionArray);
    this.setState({ regionArray: regionArray });
  };

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    const { input } = this.state;
    console.log(input); // all good

    fetch("https://serene-chamber-52792.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response) {
          fetch("https://serene-chamber-52792.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) =>
              this.setState(Object.assign(this.state.user, { entries: count }))
            )
            .catch((err) => console.log(err));
          console.log("oi");
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

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

  render() {
    const { isSignedIn, route, imageURL, regionArray } = this.state;

    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank name={this.state.user.name} rank={this.state.user.entries} />
            <ImageLinkForm
              // url1face: https://data.whicdn.com/images/294666016/original.jpg
              // urlMoreFaces: https://i.pinimg.com/originals/e8/67/30/e86730e92aaab3236f003fa10660a9a9.jpg
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageURL={imageURL} regionArray={regionArray} />
          </div>
        ) : route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
