angular.module('starter.controllers.user', ['ionic', 'authserv.service'])
   .controller('UserCtrl', ['$scope', '$state', 'AuthServ', '$http', function($scope,$state, AuthServ, $http) {

   $scope.insc = {};
   $scope.infor = {};
   $scope.dash = {};

   $scope.inscription = function(){

      var name = $scope.insc.name;
      var email = $scope.insc.email;
      var password = $scope.insc.password;
      
      var success = function(res){
            console.log(res);
            if (res) {
               console.log('inscription ok -> redirection vers tab.connection');
               $state.go( "tab.connection" ); //redirection vers la bonne vue
            }
      };
      var error = function(err){
         console.log(err);
      };
      // Le .then permet d'attendre la "promesse" de l'asynchrone de connexion
      AuthServ.setInscription(name,email,password).then(success,error);
   };

   $scope.information = function(){

      var id = $scope.infor.id;

      var success = function(res){
      console.log(res);
      if (res) {
         $state.go( "tab.account" ); //redirection vers la bonne vue
      }
      };
      var error = function(err){
         console.log(err);
      };
      // Le .then permet d'attendre la "promesse" de l'asynchrone de connexion
      AuthServ.getInformation(id,"user").then(success,error);
   };


   $scope.connection = function(){

      var name = $scope.dash.name;
      var password = $scope.dash.password;
      var success = function(res) {
         console.log(res)
         if (res) {
            $http.defaults.headers.common["authorization"] = 'Bearer ' + res.token;
            $state.go("tab.locations"); //redirection vers la bonne vue
         }
      };
      var error = function (err) {
         console.log(err)
      };
         // Le .then permet d'attendre la "promesse" de l'asynchrone de connexion
         AuthServ.getConnexion(name, password).then(success, error);
   };

   $scope.newInscription = function () {
      $state.go( 'new' );
   };
}]);