const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyB-IkwadZb67Mb-ceCuViGb0OMfCNwOKaU",
    authDomain: "acm-test-e80ed.firebaseapp.com",
    databaseURL: "https://acm-test-e80ed.firebaseio.com",
    projectId: "acm-test-e80ed",
    storageBucket: "acm-test-e80ed.appspot.com",
    messagingSenderId: "50853533479",
    appId: "1:50853533479:web:ac4ce1a63e2ca29e63fb02",
    measurementId: "G-4VP3QEW5WC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore()
  const auth = firebase.auth()

  firebase.getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        unsubscribe()
        resolve(user)
      }, reject)
    }
  )};

export default {
  db,
  auth,
  firebase
}