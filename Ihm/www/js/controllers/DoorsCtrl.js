angular.module('starter.controllers.doors', [])

	.controller('DoorsCtrl', function($stateParams, $scope, Doors, Locations, $ionicListDelegate, $ionicPopup) {
        var currLoc = Locations.get({id:$stateParams.locId}, function() {
            if(currLoc.doors)
            {
                $scope.doorsList = currLoc.doors;
                $scope.currLoc = currLoc;
            }
            else
                $scope.doorsList = [];
        });
        $scope.locId = $stateParams.locId;

        $scope.data = {
            buttonText: "Ajouter une porte"
        }
        $scope._door = new Doors();

        $scope.createDoor = function(door)
        {
            if(door.id)
            {
                $scope._door.$update(door, function()
                {
                    console.log("Door exist, update");
                    $scope._door = new Doors();
                });
            }
            else
            {
                
                $scope._door.$save(function()
                {
                    //console.log("new door id: "+door.id);
                    $scope.doorsList.push(door);
                    currLoc.doors = $scope.doorsList;
                    currLoc.$update($scope.locId);
                    $scope._door = new Doors();
                });
            }
        }

        $scope.changeState = function(door)
        {
            $scope.door = new Doors();
            $scope.door.$update(door, function()
            {
                $scope.door = new Doors();
            });
        }

        $scope.delDoor = function(door)
        {
            mdoor = new Doors();
            mdoor.$delete(door, function()
            {
                $scope.doorsList.splice($scope.doorsList.indexOf(door), 1);
                currLoc.doors=doorsList;
                currLoc.$update();
            });
        }

        $scope.upDoor = function(door)
        {
            $scope.__door = door;
            var upPopup = $ionicPopup.show(
            {
                templateUrl: '/templates/doors/update.html',
                title: 'Update door :',
                subTitle: '',
                scope: $scope,
                buttons: 
                [
                    { text: 'Cancel' },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function(e) 
                        {
                            $scope.createDoor($scope.__door);
                        }
                    },
                    {
                        text: '<b>Delete !</b>',
                        type: 'button-negative',
                        onTap: function(e) 
                        {
                            $scope.delDoor($scope.__door);
                        }
                    },
                 ] 
            })
        }
});
