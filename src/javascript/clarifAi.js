// import { grpc, ClarifaiStub } from "clarifai-nodejs-grpc";

// Import the Clarifai gRPC-based client
// const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

// Construct the stub object for accessing all the Clarifai API functionality
// const stub = ClarifaiStub.grpc();

// ////////////////////////////////////////////////////////////////////////////////////////////
// // This is where you set up the Metadata object that's used to authenticate. 
// // This authorization will be used by every Clarifai API call.
// // Change the following authorization key to your own credentials
// // Example: metadata.set("authorization", "Key " + "a123457612345678");
// ////////////////////////////////////////////////////////////////////////////////////////////

// export const metadata = new grpc.Metadata();
// metadata.set("authorization", "Key " + "16b361ffc4434af5ba92d3ef766f7cf7");
// // Or, if you were to use an API Key:
// // metadata.set("authorization", "Key " + "YOUR_CLARIFAI_API_KEY_HERE");
// // Yes, the word 'Key' appears in addition to the alphanumeric PAT or API Key

// /////////////////////////////////////////////////////////////////////////////////////////////
// // A UserAppIDSet object is needed when using a PAT. It contains two pieces of information: 
// // user_id (your user id) and app_id (app id that contains the model of interest). 
// // Both of them are specified as string values.
// /////////////////////////////////////////////////////////////////////////////////////////////

// export const user_app_id = {
//     "user_id": "yer7ahgl5fqk",
//     "app_id": "FR-PROJECT"
// };
////////////////////////////////

// const PAT = '16b361ffc4434af5ba92d3ef766f7cf7';
// // Specify the correct user_id/app_id pairings
// // Since you're making inferences outside your app's scope
// const USER_ID = 'yer7ahgl5fqk';
// const APP_ID = 'FR-PROJECT';
// // Change these to whatever model and image URL you want to use
// const MODEL_ID = 'general-image-recognition';
// // const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';
// const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';



// ///////////////////////////////////////////////////////////////////////////////////
// // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
// ///////////////////////////////////////////////////////////////////////////////////

// const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

// const stub = ClarifaiStub.grpc();

// // This will be used by every Clarifai endpoint call
// const metadata = new grpc.Metadata();
// metadata.set("authorization", "Key " + PAT);

// stub.PostModelOutputs(
//     {
//         user_app_id: {
//             "user_id": USER_ID,
//             "app_id": APP_ID
//         },
//         model_id: MODEL_ID,
//         // version_id: MODEL_VERSION_ID, // This is optional. Defaults to the latest model version
//         inputs: [
//             { data: { image: { url: IMAGE_URL, allow_duplicate_url: true } } }
//         ]
//     },
//     metadata,
//     (err, response) => {
//         if (err) {
//             throw new Error(err);
//         }

//         if (response.status.code !== 10000) {
//             throw new Error("Post model outputs failed, status: " + response.status.description);
//         }

//         // Since we have one input, one output will exist here
//         const output = response.outputs[0];

//         console.log("Predicted concepts:");
//         for (const concept of output.data.concepts) {
//             console.log(concept.name + " " + concept.value);
//         }
//     }

// );


    // Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '16b361ffc4434af5ba92d3ef766f7cf7';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'yer7ahgl5fqk';       
const APP_ID = "FR-PROJECT";
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-recognition';
const MODEL_VERSION_ID = 'aa7f35c01e0642fda5cf400f543e7c40';    
const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

///////////////////////////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
///////////////////////////////////////////////////////////////////////////////////

const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
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

// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id

fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));