angular.module('starter.controllers.locations', [])

    .controller('LocationsCtrl', function($scope, Locations, $ionicListDelegate) {
        var locationsList = Locations.query(function() {
            $scope.locationsList = locationsList;
            console.log($scope.locationsList);
        });

        $scope.data = {
            buttonText: "Ajouter une locationn"
        }
        
        $scope.locat = new Locations();

        $scope.createLocation = function(locat)
        {
            if(locat.id)
            {
                $scope.user.$update(function()
                {
                    console.log("Locations exist, update");
                    $scope.locat = new Locations();
                });
            }
            else
            {
                $scope.locat.$save(function()
                {
                    console.log("new Locations id: "+locat.id);
                    $scope.locationsList.push(locat)
                    $scope.locat = new Locations();
                });
            }
        }
});
