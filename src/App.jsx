import './App.css';

// libraries
import React from 'react';
import ParticlesBg from 'particles-bg';

// components
import FaceRecognition from './components/face-recognition/FaceRecognition';
import ImageLinkForm from './components/image-link-form/ImageLinkForm';
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import Rank from './components/rank/Rank';
import Register from './components/register/Register';
import SignInForm from './components/formSign/SignInForm';

// class-based component
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      route: "signIn", // make the signIn form the first display when opening this application
      boxes: [],
      isSignedIn: false,
      currentUserId: null
    };
  }

  // calculate face region for creating css box for the face
  calculateFaceLocation = (argInput) => {
  
    const regions = argInput.outputs[0].data.regions;
    const imageTarget = document.getElementById("image-input");
    const imageHeight = imageTarget.height;
    const imageWidth = imageTarget.width;
  
    const faceLocations = regions.map(region => {
      const clarifaiFace = region.region_info.bounding_box;

      return {
          // determines the cube sides of the face model
          leftCol: clarifaiFace.left_col * imageWidth,
          topRow: clarifaiFace.top_row * imageHeight,
          rightCol: imageWidth - clarifaiFace.right_col * imageWidth,
          bottomRow: imageHeight - clarifaiFace.bottom_row * imageHeight,
      };
    });
  
    return faceLocations;
  };

  // seperate function for displaying the box
  displayFaceBox = (boxes) => {
    // note: match the argument name to the this.state.boxes
    console.log(boxes);
    this.setState({ boxes })
  }

  onInputChange = (e) => {
    // setState based on users input
    this.setState({ input: e.target?.value });
  }

  onButtonSubmit = () => {
    // using second argument of setState to trigger correctly the rendering of this.state.imageURL
    this.setState({ imageUrl: this.state?.input }, () => {

      const PAT = process.env.REACT_APP_USER_PAT;
      const USER_ID = process.env.REACT_APP_USER_ID;             
      const APP_ID = process.env.REACT_APP_APP_ID;
      const MODEL_ID = 'face-detection';
      
      const raw = JSON.stringify({
          "user_app_id": {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          "inputs": [
              {
                  "data": {
                      "image": {
                          "url": this.state?.imageUrl
                      }
                  }
              }
          ]
      });

      const requestOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + PAT
          },
          body: raw
      };
      
      // fetch api here (to-do: make this into async await instead)
      fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
          .then(response => response.json())
          .then(result => {
            const faceLocations = this.calculateFaceLocation(result);
            this.displayFaceBox(faceLocations);
          })
          .catch(error => console.log('error', error));
    });
  };

  onRouteChange = (routeLoc) => {
    // routing, determines the landing display when opening
    // this application.

    if (routeLoc === "signOut") {
      this.setState({ isSignedIn: false })
    } else if (routeLoc === "home") {
      this.setState({ isSignedIn: true } )
    };

    this.setState({ route: routeLoc });
  };
  
  // main render page
  render() {
    return (
      <main className='App'>
        <ParticlesBg bg={true} type='cobweb'/>
        <Navigation 
          onRouteChange={this.onRouteChange} 
          isSignedIn={this.state.isSignedIn} 
          currentRoute={this.state.route}
          setUserId={this.state.currentUserId}
        />
        {
          // conditional statement for routing sign in and register form
          this.state?.route === "signIn" ? <SignInForm onRouteChange={ this.onRouteChange } setUserId={ (userId) => this.setState({ currentUserId: userId })}/>:
          this.state?.route === "register" ? <Register onRouteChange={ this.onRouteChange } setUserId={ (userId) => this.setState({ currentUserId: userId })}/>:
          this.state?.route === "home" &&
            <>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={ this.onInputChange } onButtonSubmit={ this.onButtonSubmit } userId={ this.state.currentUserId }/>
              <FaceRecognition imageUrl={ this.state?.imageUrl } boxes={ this.state?.boxes } />
            </>
        }
      </main>
    );
  };
};

// from react.component library
// for checking only if backend is connecting to front-end
// async componentDidMount() {
//   try {
//     const response = await fetch("http://localhost:8001");
//     const responseJson = await response.json();
//     console.log({ "From react": responseJson });
//   } catch (e) {
//     console.error({ "An unexpected error occured": e })
//   };
  
//   // fetch("http://localhost:8001")
//   //   .then(response => response.json())
//   //   .then(data => console.log(data))
// }