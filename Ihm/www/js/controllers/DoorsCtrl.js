angular.module('starter.controllers.doors', [])

	.controller('DoorsCtrl', function($stateParams, $scope, Doors, Locations, $ionicListDelegate, $ionicPopup) {
        var currLoc = Locations.get({id:$stateParams.locId}, function() {
            $scope.doorsList = currLoc.doors;
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
                    console.log("new door id: "+door.id);
                    $scope.doorsList.push(door);
                    idlist = {};
                    for(d in $scope.doorsList)
                    {
                        idlist.push({doors:d.id});
                    }
                    console.log(idlist);
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
                 ] 
            })
        }
});
