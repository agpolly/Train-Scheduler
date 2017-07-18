// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC3ozf4WLCyaKD46WvEtG2yzCUplKbWY7A",
    authDomain: "train-scheduler-e5f1e.firebaseapp.com",
    databaseURL: "https://train-scheduler-e5f1e.firebaseio.com",
    projectId: "train-scheduler-e5f1e",
    storageBucket: "train-scheduler-e5f1e.appspot.com",
    messagingSenderId: "255147420746"
    };
  
  firebase.initializeApp(config);

  //variable to hold info from firebase
  var database = firebase.database();

  //array to hold train info
  var trainInfo = [];

   // Capture Button Click
    $("#addUserTrain").on("click", function(event) {
      event.preventDefault();

       //store user input into variables
       var form = $("#add-train");

       var name = $("#train-name").val().trim();
       var destination = $("#train-destination").val().trim();
       var time = $("#train-time").val().trim();
       var frequency = $("#train-frequency").val().trim();

      //store user input in object for Firebase
       var userTrain = {
       name: name,
       destination: destination,
       time: time,
       frequency: frequency    
       }

      // Push user input object to Firebase
       database.ref().push(userTrain);

      //clear input fields
      $("#train-name").val("");
      $("#train-destination").val("");
      $("#train-time").val("");
      $("#train-frequency").val("");
      });

  //event listener to add user input
      database.ref().on("child_added", function(snapshot) {

  //saves Firebase object into varible
      var newTrain = snapshot.val();
  
  //push info into new trainInfo array
     trainInfo.push(newTrain);

  //creates new row on table
     var newRow = $("<tr>");
     newRow.attr("id", trainInfo.indexOf(newTrain));
       
     var newName = $("<td>");
     var newDestination = $("<td>");
     var newTime = $("<td>");
     var newFrequency = $("<td>");
      
     newName.text(newTrain.name);
     newDestination.text(newTrain.destination);
     newTime.text(newTrain.time);
     newFrequency.text(newTrain.frequency);

  //add to new row
     newRow.append(newName);
     newRow.append(newDestination);
     newRow.append(newTime);
     newRow.append(newFrequency);

  //add new row to train panel
     $("#newTrainContainer").append(newRow);

     }, function(errorObject){
     console.log("Errors Handled: " + errorObject.code);
     });

      function timeFigure(){
  // Update currentTime variable to current second 
  var currentTime = moment();
  
  //display current time
  $("#current-time").text(currentTime);

  //update arrival times
  for (var i = trainInfo.length - 1; i >= 0; i--) {
    
    //save current train to variable
    var currentTrain = trainInfo[i];

    var startTime = moment(currentTrain.start, "hh:mm");

    //difference between the times
    if (moment().diff(moment(startTime), "minutes") > 0){
      var timeDifference = moment().diff(moment(startTime), "minutes");
      
      var remainder = timeDifference % currentTrain.frequency;
    
      var timeUntilArrival = currentTrain.frequency - remainder;

      var nextTrain = moment().add(timeUntilArrival, "minutes").format("HH:mm");