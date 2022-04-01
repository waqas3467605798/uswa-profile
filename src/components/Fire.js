import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'



const firebaseConfig = {
  apiKey: "AIzaSyBkjlqx1gnPxItzkHy7v_eLR0L3WLWR0Z0",
  authDomain: "uswa-profile.firebaseapp.com",
  databaseURL: "https://uswa-profile-default-rtdb.firebaseio.com",
  projectId: "uswa-profile",
  storageBucket: "uswa-profile.appspot.com",
  messagingSenderId: "1000078078072",
  appId: "1:1000078078072:web:23d6500ca316aebd317d8d",
  measurementId: "G-3GPG980K2X"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();


export default firebase;






    // apiKey: "AIzaSyCRKceXGhdhpKFQiAJ2Qgkb1wXgXbI36RQ",
    // authDomain: "ngrpractice.firebaseapp.com",
    // projectId: "ngrpractice",
    // storageBucket: "ngrpractice.appspot.com",
    // messagingSenderId: "384804225359",
    // appId: "1:384804225359:web:d1c84f17b1de731c99853a",
    // measurementId: "G-NKKRC8FGHL"