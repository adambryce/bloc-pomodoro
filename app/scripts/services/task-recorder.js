blocPomodoro.factory('myTasks', ['$firebaseArray', function($firebaseArray) {

  var ref = new Firebase("https://ab-pomodoro.firebaseio.com/tasks");

  return $firebaseArray(ref)
    

}]);