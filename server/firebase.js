const {initializeApp} = require('firebase/app')


const firebaseConfig = {
  apiKey: "AIzaSyD3NbomXkNvyRcDFvWiPRoIzdCyJ4LpI5A",
  authDomain: "audify-2a5df.firebaseapp.com",
  projectId: "audify-2a5df",
  storageBucket: "audify-2a5df.appspot.com",
  messagingSenderId: "962410092265",
  appId: "1:962410092265:web:2aaf65afe368878ed54278"
};

const firebase = initializeApp(firebaseConfig)

module.exports = firebase