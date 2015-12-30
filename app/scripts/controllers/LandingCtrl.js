blocPomodoro.controller('LandingCtrl', function($scope, $firebaseObject) {
  var ref = new Firebase("https://ab-pomodoro.firebaseio.com/");

    // download the data into a local object
    $scope.data = $firebaseObject(ref);
            
});
