// Initialize Firebase
var config = {
  apiKey: "AIzaSyA1UadcwegP_Gk4GKSNXIVLZpEDJQqStUs",
  authDomain: "fb-rps-hw.firebaseapp.com",
  databaseURL: "https://fb-rps-hw.firebaseio.com",
  projectId: "fb-rps-hw",
  storageBucket: "",
  messagingSenderId: "598861475865"
};
firebase.initializeApp(config);

var db = firebase.database()