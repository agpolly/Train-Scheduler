// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC3ozf4WLCyaKD46WvEtG2yzCUplKbWY7A",
    authDomain: "train-scheduler-e5f1e.firebaseapp.com",
    databaseURL: "https://train-scheduler-e5f1e.firebaseio.com",
    projectId: "train-scheduler-e5f1e",
    storageBucket: "",
    messagingSenderId: "255147420746"
  };
  
  firebase.initializeApp(config);

    var database = firebase.database();

  //Initial Values
  var name = "";
  var destination = "";
  var frequency = 0;
  var time = 0;

   // Capture Button Click
    $("#add-train").on("click", function(event) {
      event.preventDefault();

       // Grabbed values from text boxes
      name = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      time = $("#time-input").val().trim();
      frequency = $("#frequency-input").val().trim();

         // Code for handling the push
      database.ref().push({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency
      });

    });

        // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("value", function(snapshot) {

      // storing the snapshot.val() in a variable for convenience
      var newTrain = snapshot.val();
      
      // Getting an array of each key In the snapshot object
      var newTrainArray = Object.keys(newTrain);

      // Finding the last user's key
      var lastIndex = newTrainArray.length - 1;

      var lastKey = newTrainArray[lastIndex];

      // Using the last user's key to access the last added user object
      var lastObj = newTrain[lastKey]

      // Console.loging the last user's data
      console.log(lastObj.name);
      console.log(lastObj.destination);
      console.log(lastObj.time);
      console.log(lastObj.frequency);

      // Change the HTML to reflect
      $("#name-display").html(lastObj.name);
      $("#destination-display").html(lastObj.email);
      $("#time-display").html(lastObj.age);
      $("#frequency-display").html(lastObj.comment);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });