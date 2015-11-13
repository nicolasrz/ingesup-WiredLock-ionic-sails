angular.module('starter.controllers.locations', [])

    .controller('LocationsCtrl', function($scope, Locations, $ionicListDelegate,$state,$ionicPopup) {

        var locationsList = Locations.query({user:2},function() {
            $scope.locationsList = locationsList;
        });


        
        $scope.currentIdUser = window.localStorage['id'];

        $scope.data = {
            buttonText: "Ajouter une location"
        }
        
        $scope._locat = new Locations();

        $scope.createLocation = function(locat)
        {
            if(locat.id)
            {      
                $scope._locat.$update(locat,function()
                {
                    console.log("Locations exist, update");
                    $scope._locat = new Locations();
                });
            }
            else
            {
                $scope._locat.user = $scope.currentIdUser;
                $scope._locat.$save(function()
                {
                    //console.log("new Locations id: "+locat.id);
                    $scope.locationsList.push(locat)
                    $scope._locat = new Locations();
                   
                });
            }
        }


        $scope.showDoors = function()
        {
            $state.go('tab.doors');
        }


        $scope.updateLocation = function(location)
        {
            
            $scope.__location = location
            console.log($scope.__location);
            var upPopup = $ionicPopup.show(
            {
                templateUrl: '/templates/location/updateLocation.html',
                title: 'Update location:',
                scope: $scope,
                buttons: 
                [
                    { text: 'Cancel' },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function(e) 
                        {
                            $scope.createLocation($scope.__location);
                        }
                    },
                 ] 
            });
        }





        $scope.saveLocationPopUp = function() {
   $scope.data = {}

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     templateUrl: '/templates/location/addLocation.html',
     title: 'Ajouter une location',
     scope: $scope,
     buttons: [
       { text: 'Annuler' },
       {
         text: '<b>Enregistrer</b>',
         type: 'button-positive',
         onTap: $scope.createLocation,
       },
     ]
   });

  };
});
