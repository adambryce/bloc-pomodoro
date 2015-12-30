blocPomodoro.directive('timer', ['$interval', function($interval) {
    return {
        templateUrl: '/templates/directives/timer.html',
        replace: true,
        restrict: 'E',
        transclude:false,
        link: function(scope, element, attributes) {
            
            scope.timeLeft = "25:00";
            scope.showWorkStartButton = true;
            scope.showBreakStartButton = false;
            
            var promise;
            
            /* Starts the Timer and takes in length of timer */
            scope.startTimer = function(totalTimeInSeconds) {
                    
                if (scope.showBreakStartButton == true) {
                        console.log('Show Break Reset Button');
                        scope.showBreakStartButton = false;
                        scope.showBreakResetButton = true;
                }
                
                else if (scope.showWorkStartButton == true) {
                        console.log('Show Work Reset Button');
                        scope.showWorkStartButton = false;
                        scope.showWorkResetButton = true;
                }
                
                /* starts a function that reduces time by 1 second every second */
                /* takes in argument for the time to reduce */ 
                promise = $interval(function() {
                    
                    totalTimeInSeconds--;
                    console.log(totalTimeInSeconds);
                    
                    var minutes = Math.floor(totalTimeInSeconds % 3600 / 60);
                    var seconds = Math.floor(totalTimeInSeconds % 3600 % 60);

                    if (minutes < 10) {minutes = "0"+minutes;}
                    if (seconds < 10) {seconds = "0"+seconds;}
                    scope.timeLeft = minutes+':'+seconds;
                    
                    /* If time gets to zero and it's not on a break then */ 
                    /* resets timer to 5 minutes  */ 
                    if (totalTimeInSeconds == 0 && scope.showBreakStartButton == false) {
                        scope.resetTimer(300);
                        
                    /* If time gets to zero and it is on a break then */ 
                    /* resets timer to 25 minutes */ 
                    } else if (totalTimeInSeconds == 0 && scope.showBreakStartButton == true) {
                        scope.resetTimer(1500);
                    }

                }, 1000);
                
            };
            
            
            scope.stopTimer = function() {
                $interval.cancel(promise);
            };
            
            
            scope.resetTimer = function(totalTimeInSeconds) {
                console.log('I reset');
                scope.stopTimer();
                scope.timeLeft = scope.convertSecondsToTime(totalTimeInSeconds);
                
                if (totalTimeInSeconds == 300) {
                    scope.showBreakStartButton = true;
                    scope.showBreakResetButton = false;
                    scope.showWorkStartButton = false;
                    scope.showWorkResetButton = false;
                }
                else if (totalTimeInSeconds == 1500) {
                    scope.showBreakStartButton = false;
                    scope.showBreakResetButton = false;
                    scope.showWorkStartButton = true;
                    scope.showWorkResetButton = false;
                }
            };
            
            scope.convertSecondsToTime = function(totalTimeInSeconds) {
                var minutes = Math.floor(totalTimeInSeconds % 3600 / 60);
                var seconds = Math.floor(totalTimeInSeconds % 3600 % 60);
                
                if (minutes < 10) {minutes = "0"+minutes;}
                if (seconds < 10) {seconds = "0"+seconds;}
                return scope.timeLeft = minutes+':'+seconds;
            };
            
        }
    };

}]);