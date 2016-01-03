blocPomodoro.controller('LandingCtrl', ['$scope', 'myTasks',
    function($scope, myTasks) {


        $scope.tasks = myTasks;
        
        $scope.showTaskButton = true;

        $scope.addTask = function() {
            $scope.tasks.$add({
                text: $scope.newTaskText
            });
            $scope.showTaskButton = true;
        };
        
        $scope.removeLastTask = function() {
            $scope.lengthOfArray = $scope.tasks.length - 1;
            console.log($scope.lengthOfArray);
            $scope.tasks.$remove($scope.lengthOfArray);
            
            if ($scope.lengthOfArray == 0) {
                $scope.showTaskButton = false;
            }
        }
    }
]);
