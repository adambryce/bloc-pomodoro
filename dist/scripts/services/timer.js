blocPomodoro.directive('timer', ['$interval', function($interval) {
    return {
        templateUrl: '/templates/directives/timer.html',
        replace: true,
        restrict: 'E',
        transclude:false,
        link: function(scope, element, attributes) {
            
            scope.timeLeft = "25:00";
            scope.showStartButton = true;
            
            var totalTimeInSeconds = 1500;
            var promise;
            
            scope.startTimer = function() {
                console.log('I started');
                
                promise = $interval(reduceByOneSecond, 1000);
                scope.showStartButton = false;
                scope.showResetButton = true;
            };
            
            
            scope.stopTimer = function() {
                $interval.cancel(promise);
            };
            
            
            scope.resetTimer = function() {
                console.log('I reset');
                scope.stopTimer();
                totalTimeInSeconds = 1500;
                scope.showStartButton = true;
                scope.showResetButton = false;
            };
            
            
            var reduceByOneSecond = function() {
                totalTimeInSeconds--;
                console.log(totalTimeInSeconds);
                
                var minutes = Math.floor(totalTimeInSeconds % 3600 / 60);
                var seconds = Math.floor(totalTimeInSeconds % 3600 % 60);
                
                if (minutes < 10) {minutes = "0"+minutes;}
                if (seconds < 10) {seconds = "0"+seconds;}
                scope.timeLeft = minutes+':'+seconds;
            };
        }
    }  

}]);