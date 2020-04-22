import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCRBj0ZlsttBBuVZLL2-ehg-_xYhAPhFk0",
    authDomain: "bsafe-2d8c3.firebaseapp.com",
    databaseURL: "https://bsafe-2d8c3.firebaseio.com",
    projectId: "bsafe-2d8c3",
    storageBucket: "bsafe-2d8c3.appspot.com",
    messagingSenderId: "757358915087",
    appId: "1:757358915087:web:fde6b27fd16352a3453d7a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default Firebase =  firebase.initializeApp(firebaseConfig);