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
            scope.completedWorkSessions = 0;
            scope.iAmWorking = null;
            
            var promise;
            
            /* Starts the Timer and takes in length of timer */
            scope.startTimer = function(totalTimeInSeconds) {
                    
                /* This is where the we show the reset buttons */ 
                /* If the break start button is visible, switch it to break reset */ 
                if (scope.showBreakStartButton == true) {
                        console.log('Show Break Reset Button');
                        scope.breakResetButton();
                        scope.iAmWorking = false;
                }
                
                /* If the work start button is visible, switch it to work reset */                 
                else if (scope.showWorkStartButton == true) {
                        console.log('Show Work Reset Button');
                        scope.workResetButton();
                        scope.iAmWorking = true;
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
                    /* resets timer to 5 minutes and switches to a break */ 
                    if (totalTimeInSeconds == 0 && scope.iAmWorking == true) {
                        scope.completedWorkSessions++;
                        if (scope.completedWorkSessions == 4) {
                            scope.iAmWorking = false;
                            scope.resetTimer(600);
                            scope.completedWorkSessions = 0;
                        } else {
                            scope.iAmWorking = false;
                            scope.resetTimer(300);
                        }
                    /* If time gets to zero and it is on a break then */ 
                    /* resets timer to 25 minutes and switches back to work */ 
                    } else if (totalTimeInSeconds == 0 && scope.iAmWorking == false) {
                        scope.iAmWorking = true;
                        scope.resetTimer(1500);

                    }
                }, 1000);  
            };            
            
            scope.resetTimer = function(totalTimeInSeconds) {
                console.log('I reset to');
                console.log(totalTimeInSeconds);
                scope.stopTimer();
                scope.timeLeft = scope.convertSecondsToTime(totalTimeInSeconds);
                
                /* Switch Buttons back after reset */ 
                /* If you were working, switch it to a break button */ 
                if (scope.iAmWorking == false) {
                    console.log('switch back to break button!');
                    scope.breakStartButton();
                    scope.iAmWorking = true;
                    
                /* If you were on a break, switch it to a work button */ 
                } else if (scope.iAmWorking == true) {
                    console.log('switch back to work button!');
                    scope.workStartButton();
                    scope.iAmWorking = true;
                
                /* This is for when a work session is manually reset */ 
                } else if (totalTimeInSeconds = 1500) {
                    scope.workStartButton();
                    scope.iAmWorking = true;
                }
            };
            
            scope.stopTimer = function() {
                $interval.cancel(promise);
            };
            
            
            scope.convertSecondsToTime = function(totalTimeInSeconds) {
                var minutes = Math.floor(totalTimeInSeconds % 3600 / 60);
                var seconds = Math.floor(totalTimeInSeconds % 3600 % 60);
                
                if (minutes < 10) {minutes = "0"+minutes;}
                if (seconds < 10) {seconds = "0"+seconds;}
                return scope.timeLeft = minutes+':'+seconds;
            };
            
            
            scope.workStartButton = function() {
                scope.showBreakStartButton = false;
                scope.showBreakResetButton = false;
                scope.showWorkStartButton = true;
                scope.showWorkResetButton = false;
            };
            
            
            scope.workResetButton = function() {
                scope.showBreakStartButton = false;
                scope.showBreakResetButton = false;
                scope.showWorkStartButton = false;
                scope.showWorkResetButton = true;
            };
            
            
            scope.breakStartButton = function() {
                scope.showBreakStartButton = true;
                scope.showBreakResetButton = false;
                scope.showWorkStartButton = false;
                scope.showWorkResetButton = false;
            };
            
            
            scope.breakResetButton = function() {
                scope.showBreakStartButton = false;
                scope.showBreakResetButton = true;
                scope.showWorkStartButton = false;
                scope.showWorkResetButton = false;
            };
            
        }
    };

}]);