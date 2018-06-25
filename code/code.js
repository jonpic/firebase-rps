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
var p1Choice
var p2Choice
var p1Score = 0
var p2Score = 0
var smack = ""
// check to see if at least two people are on the site.
var connectionsRef = db.ref("/connections");

var connectedRef = db.ref(".info/connected");


var addConnections = function() {
connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);

    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});
}
// Displays if enough players are online to play RPS
var showConnections = function() { 
addConnections()
connectionsRef.on("value", function(snap) {
  if (snap.numChildren() === 0) {
    $("#player-1-connected").text("No Connection");
    $("#player-2-connected").text("No Connection");
  } else if (snap.numChildren() === 1) {
    $("#player-1-connected").text("Player 1 is Connected");
    $("#player-2-connected").text("No Connection");
  } else if (snap.numChildren() > 1) {
    $("#player-1-connected").text("Player 1 is Connected");
    $("#player-2-connected").text("Player 2 is Connected");
  }
});
};

showConnections()

var updater = function () {
  ready = 0
  db.ref().update({
    p1Score: p1Score,
    p2Score: p2Score,
    ready: ready,

  });
}
  db.ref().on("value", function(snapshot) {

    // If Firebase has a highPrice and highBidder stored (first case)
    if (snapshot.child("p1Choice").exists() && snapshot.child("p2Choice").exists() && snapshot.val().ready === 1) {
        if (snapshot.val().p1Choice === "1-rock" && snapshot.val().p2Choice === "2-rock"){
          updater();
        }
        else if (snapshot.val().p1Choice === "1-rock" && snapshot.val().p2Choice === "2-paper") {
          p2Score++
          updater();
        }
        else if (snapshot.val().p1Choice === "1-rock" && snapshot.val().p2Choice === "2-scissors") {
          
          p1Score++
          updater();
        }
        else if (snapshot.val().p1Choice === "1-paper" && snapshot.val().p2Choice === "2-rock"){
          p1Score++
          updater();
        }
        else if (snapshot.val().p1Choice === "1-paper" && snapshot.val().p2Choice === "2-paper") {
          updater();
        }
        else if (snapshot.val().p1Choice === "1-paper" && snapshot.val().p2Choice === "2-scissors") {
          p2Score++
          updater();
        }
        if (snapshot.val().p1Choice === "1-scissors" && snapshot.val().p2Choice === "2-rock"){
          p2Score++
          updater();
        }
        else if (snapshot.val().p1Choice === "1-scissors" && snapshot.val().p2Choice === "2-paper") {
          p1Score++
          updater();
        }
        else if (snapshot.val().p1Choice === "1-scissors" && snapshot.val().p2Choice === "2-scissors") {
          updater();
          
        }
      // Set the local variables for highBidder equal to the stored values in firebase.
      // highBidder = snapshot.val().highBidder;
      // highPrice = parseInt(snapshot.val().highPrice);
  
      // change the HTML to reflect the newly updated local values (most recent information from firebase)
      // $("#highest-bidder").text(snapshot.val().highBidder);
      // $("#highest-price").text("$" + snapshot.val().highPrice);
  
      // Print the local data to the console.
    }
})
$("#reset-score-button").on("click", function(){
  p1Score = 0
  p2Score = 0
  db.ref().update({
    p1Score: p1Score,
    p2Score: p2Score,
  });
})

$("#shoot").on("click", function(){
  ready = 1;
  db.ref().update({
    ready: ready
  });
});

$(".p1-btn").on("click", function(){
  
  p1Choice = this.value

  db.ref().update({
    p1Choice: p1Choice,
  });
  console.log(p1Choice)
}) 

$(".p2-btn").on("click", function(){

  p2Choice = this.value
  db.ref().update({
    p2Choice: p2Choice,
  });
  console.log(p2Choice)
}) 

db.ref().on("value", function(snapshot) {
  $("#player-1-score").text(snapshot.val().p1Score);
})

db.ref().on("value", function(snapshot) {
  $("#player-2-score").text(snapshot.val().p2Score);
})

$("#smack-btn").on("click", function(){
  smack = $("#chat-input").val().trim();
  db.ref().update({
    smack: smack
  })
})

db.ref().on("value", function(snapshot) {
  $("#chat-p").text(snapshot.val().smack);
})