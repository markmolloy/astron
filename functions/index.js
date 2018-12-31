const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');
const automl = require('@google-cloud/automl').v1beta1;

// exports.predictor = functions.database.ref('/predictions/{pred}').onWrite((change) => {
//     const content = change.after.val();
  
//     const client = new automl.PredictionServiceClient();

//   /**
//    * TODO(developer): Uncomment the following line before running the sample.
//    */
//     const projectId = `astron-data`;
//     const computeRegion = `us-central1`;
//     const modelId = `astron_0`;
//     //const filePath = `local text file path of content to be classified, e.g. "./resources/test.txt"`;
//     const scoreThreshold = `0.5`;

//   // Get the full path of the model.
//   const modelFullId = client.modelPath(projectId, computeRegion, modelId);

//   // Read the file content for prediction.
//   //const content = fs.readFileSync(filePath, 'base64');

//   const params = {};

//   if (scoreThreshold) {
//     params.scoreThreshold = scoreThreshold;
//   }

//   // Set the payload by giving the content and type of the file.
//   const payload = {};
//   payload.image = {imageBytes: content};

//   // params is additional domain-specific parameters.
//   // currently there is no additional parameters supported.
//  return client
//     .predict({name: modelFullId, payload: payload, params: params})
//     .then(responses => {
//       console.log(`Prediction results:`);
//       return responses[0].payload.forEach(result => {
//         console.log(`Predicted class name: ${result.displayName}`);
//         console.log(`Predicted class score: ${result.classification.score}`);
//         return result;
//       });
//     })
//     .catch(err => {
//       console.error(err);
//       return null;
//     });
//   });

//   exports.predictorFireStore = functions.firestore.document('predictions/curr').onUpdate((change) => {
//     const c = change.after.data();
//     const content = c.a;
//     console.log('in');
//     const client = new automl.PredictionServiceClient();

//   /**
//    * TODO(developer): Uncomment the following line before running the sample.
//    */
//     const projectId = `astron-data`;
//     const computeRegion = `us-central1`;
//     const modelId = `astron_0_v20181229134536`;
//     //const filePath = `local text file path of content to be classified, e.g. "./resources/test.txt"`;
//     const scoreThreshold = `0.5`;

//   // Get the full path of the model.
//   const modelFullId = client.modelPath(projectId, computeRegion, modelId);
//   console.log('past modelFullId');

//   // Read the file content for prediction.
//   //const content = fs.readFileSync(filePath, 'base64');

//   const params = {};

//   if (scoreThreshold) {
//     params.scoreThreshold = scoreThreshold;
//   }
// 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
//   // Set the payload by giving the content and type of the file.
//   const payload = {};
//   payload.image = {imageBytes: content};
//   console.log('past payload');
//   // params is additional domain-specific parameters.
//   // currently there is no additional parameters supported.
//  return client
//     .predict({name: modelFullId, payload: payload, params: params})
//     .then(responses => {
//       console.log(`Prediction results:`);
//       return responses[0].payload.forEach(result => {
//         console.log(`Predicted class name: ${result.displayName}`);
//         console.log(`Predicted class score: ${result.classification.score}`);
//         return result;
//       });
//     })
//     .catch(err => {
//       console.error(err);
//       return null;
//     });
//   });

const project = 'astron-data';
const region = 'us-central1';
const automl_model = 'ICN8038108350978352172';

//const sizeOf = require('image-size');
//onst fs = require('fs');
const exec = require('child_process').exec;






// GCP libraries
// const {gcsClient} = require('@google-cloud/storage');
// //const gcsClient = new gcs();
// //const automl = require('@google-cloud/automl');
const predictionClient = new automl.PredictionServiceClient({});

// const gcs = require('@google-cloud/storage');
// const gcsClient = new gcs();

const Storage = require('@google-cloud/storage');

// Your Google Cloud Platform project ID
//const projectId = 'YOUR_PROJECT_ID';

// Creates a client
const gcsClient = new Storage.Storage();







// Firebase libraries
//const functions = require('firebase-functions');
//const admin = require('firebase-admin');
const db = admin.firestore();
//admin.initializeApp(functions.config().firebase);
//admin.initializeApp()

function callAutoMLAPI(b64img) {
    return new Promise((resolve, reject) => {
        const payload = {
            "image": {
              "imageBytes": b64img
            }
          }
        const reqBody = {
            name: predictionClient.modelPath(project, region, automl_model),
            payload: payload
        }
        predictionClient.predict(reqBody)
            .then(responses => {
                console.log('Got a prediction from AutoML API!', JSON.stringify(responses));
                resolve(responses);
                return responses;
            })
            .catch(err => {
                console.log('AutoML API Error: ',err);
                reject(err);
            });
    });
    
}

exports.callCustomModel = functions.storage.object().onFinalize(event => {
    const Storage = require('@google-cloud/storage');

// Your Google Cloud Platform project ID
//const projectId = 'YOUR_PROJECT_ID';

// Creates a client
const gcsClient = new Storage.Storage();
    const file = gcsClient.bucket(event.bucket).file(event.name);
    let destination = '/tmp/' + event.name.replace(/\s/g, '');
    return file.download({destination: destination})
        .then(() => {
            let bitmap = fs.readFileSync(destination);
            let data = new Buffer(bitmap).toString('base64');
            return callAutoMLAPI(data);  
        })
        .then((response) => {
            let predictions = {};
            let preds = {};

            // Get only the first prediction response
            let data = response[0]['payload'];
            predictions[data[0].displayName] = data[0].classification.score;
            // preds['prediction'] = data[0].displayName;
            // preds['score'] = data[0].classification.score;

            preds = {
                'prediction': data[0].displayName,
                'score': data[0].classification.score
            }

            if (Object.keys(predictions).length === 0) {
                predictions = {"predictionErr": "No high confidence predictions found"};
            }
            return db.collection('images').doc(event.name).set(preds);
        })
        .then(() => {
            // Delete tmp image file to clean up resources
            return new Promise((resolve, reject) => {
                fs.unlinkSync(destination, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
                });
            });
        })
        .catch((err) => {
            console.log('error occurred', err);
        });
});