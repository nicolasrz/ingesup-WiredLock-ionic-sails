angular.module('starter.controllers.doors', [])

	.controller('DoorsCtrl', function($scope, Doors, $ionicListDelegate) {
            console.log("putainde mede");
        var doorsList = Doors.query(function() {
            $scope.doorsList = doorsList;
            console.log("door list got");
        });

        $scope.data = {
            buttonText: "Ajouter une porte"
        }
        
        $scope.door = new Doors();

        $scope.createDoor = function(door)
        {
            if(door.id)
            {
                $scope.user.$update(function()
                {
                    console.log("Door exist, update");
                    $scope.door = new Doors();
                });
            }
            else
            {
                $scope.door.$save(function()
                {
                    console.log("new door id: "+door.id);
                    $scope.doorsList.push(door);
                    $scope.door = new Doors();
                });
            }
        }
});
