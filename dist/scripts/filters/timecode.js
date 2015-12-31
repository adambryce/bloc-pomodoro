 (function() {
     function timecode() {
         return function(secondsToConvert) {
                var minutes = Math.floor(secondsToConvert % 3600 / 60);
                var seconds = Math.floor(secondsToConvert % 3600 % 60);
                
                if (minutes < 10) {minutes = "0"+minutes;}
                if (seconds < 10) {seconds = "0"+seconds;}
             
                output = minutes+':'+seconds;
             
                return output
            };
     }
 
     angular
         .module('blocPomodoro')
         .filter('timecode', timecode);
 })();
