angular.module('starter.controllers.user', ['ionic', 'authserv.service'])
   .controller('UserCtrl', ['$http', '$scope', '$state', 'AuthServ', 'Users', function($http, $scope, $state, AuthServ, Users) {

   $scope.insc = {};
   $scope.infor = {};

   $scope.currentId = window.localStorage['id'];
    $scope.currentUser = window.localStorage['name'];
    $scope.currentEmail = window.localStorage['email'];


       $scope.$on('$ionicView.enter', function(){
          console.log('coucou');
          Users.fetch({id:$scope.currentId},function(result){
             console.log('It works')
          },function(err){
             console.log(err)
          })
       });

   $scope.user = new Users();

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
}]);
