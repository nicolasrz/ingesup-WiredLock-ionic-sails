angular.module('starter.controllers.doors', [])

	.controller('DoorsCtrl', function($scope, Doors, $ionicListDelegate) {
        var doorsList = Doors.query(function() {
            $scope.doorsList = doorsList;
        });
        console.log('ress');

        $scope.data = {
            buttonText: "Ajouter une porte"
        }
        $scope._door = new Doors();

        $scope.createDoor = function(door)
        {
            if(door.id)
            {
                $scope._door.$update(function()
                {
                    console.log("Door exist, update");
                    $scope._door = new Doors();
                });
            }
            else
            {
                $scope._door.$save(function()
                {
                    console.log("new door id: "+door.id);
                    $scope.doorsList.push(door);
                    $scope._door = new Doors();
                });
            }
        }

        $scope.changeState = function(door)
        {
            $scope.door = new Doors();
            $scope.door.$update(door, function()
            {
                console.log("Door : "+door.id+" updated !");
                $scope.door = new Doors();
            });
        }
});
