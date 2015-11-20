angular.module('starter.controllers.locations', [])

    .controller('LocationsCtrl', function($scope, Locations, Doors, $ionicListDelegate,$state,$ionicPopup) {

        $scope.currentIdUser = window.localStorage['id'];

        /*var locationsList =,function() {

        });*/
        $scope.locationsList =  Locations.query({user:$scope.currentIdUser});

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
                    console.log("new Locations id: "+locat.name);
                    $scope.locationsList.push(locat)
                    $scope._locat = new Locations();
                   
                });
            }
        }

        $scope.deleteLocation = function(locat){

			// Delete all doors in location
			var _ss = Locations.get({id:locat.id}, function()
			{
				_doors = _ss.doors;
				console.log(_doors);

				for(i=0; i < _doors.length; i++)
				{
					mdoor = new Doors();
					mdoor.$delete(_doors[i], function()
					{
					});
				}
					
			});
			console.log("language de merde");
            $scope._locat.$delete(locat);
            // suppression de la location du tableau.
            $scope.locationsList.splice($scope.locationsList.indexOf(locat),1);
        }

        $scope.showDoors = function(m_locId)
        {
            $state.go('tab.doors', {locId:m_locId});
        }


        $scope.updateLocation = function(location)
        {
            
            $scope.__location = location
            console.log($scope.__location);
            var upPopup = $ionicPopup.show(
            {
                templateUrl: '/templates/location/updateLocation.html',
                title: 'Update location:',
                width : '500px',
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
                    {
                        text: '<b>Delete</b>',
                        type:'button-assertive',
                        onTap : function(e)
                        {
                            $scope.deleteLocation($scope.__location);
                        }
                    }
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
         onTap: function(e)
         {
            $scope.createLocation($scope._locat);
         }
       },
     ]
   });

  };
});
