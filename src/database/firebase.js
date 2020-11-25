import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyD0okrtmjPGw-p2fHJuqxd2SwNjSHyNYkY",
    authDomain: "projeto-norton-app.firebaseapp.com",
    databaseURL: "https://projeto-norton-app.firebaseio.com",
    projectId: "projeto-norton-app",
    storageBucket: "projeto-norton-app.appspot.com",
    messagingSenderId: "710738094596",
    appId: "1:710738094596:web:3d6cfcbd7ef263a5dbe351",
    measurementId: "G-4SNZ5MXPD8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export default db;