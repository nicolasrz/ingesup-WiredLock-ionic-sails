angular.module('starter.controllers.home', ['ionic','authserv.service'])
	.controller('HomeCtrl', ['$scope', '$state' ,'AuthServ', function($scope,$state,AuthServ) {


$scope.doors =[];


 $scope.doorInformation = function(){
    var success = function(res){
	      // console.log(res);
	      if (res) {
	      	console.log(res);
	        for(i=0;i<res.length;i++){
	        	console.log(res[i]);
	        	$scope.doors.push(res[i]);
	        }
	      }
      };
      var error = function(err){
         console.log(err);
      };
      // Le .then permet d'attendre la "promesse" de l'asynchrone de connexion
      AuthServ.getInformation(3,"door").then(success,error);
   };

   
$scope.doorInformation();
	}]);