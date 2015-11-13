angular.module('starter.controllers.user', ['ionic', 'authserv.service'])
   .controller('UserCtrl', ['$http', '$scope', '$state', 'AuthServ', 'Users', '$ionicPopup', function($http, $scope, $state, AuthServ, Users, $ionicPopup) {

   $scope.insc = {};
   $scope.user = {};

   $scope.currentId = window.localStorage['id'];
   $scope.currentUser = window.localStorage['name'];
   $scope.currentEmail = window.localStorage['email'];


    $scope.$on('$ionicView.enter', function(){
       Users.fetch({id:$scope.currentId},function(result){
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
               $state.go( "connection" ); //redirection vers la bonne vue
            }
      };
      var error = function(err){
         console.log(err);
      };
      // Le .then permet d'attendre la "promesse" de l'asynchrone de connexion
      AuthServ.setInscription(name,email,password).then(success,error);
   };

    $scope.upUser = function(user)
    {
       $scope.user = user;
       user.id = $scope.currentId;
       user.name = $scope.currentUser;
       user.email = $scope.currentEmail;
       var upPopup = $ionicPopup.show(
           {
              templateUrl: '/templates/user/update.html',
              title: 'Update user :',
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
                           Users.maj({id: user.id, name:user.name, email:user.email, password: user.password},function(result){
                              console.log('User updated')
                              $scope.currentUser = user.name;
                              $scope.currentEmail = user.email;
                           },function(err){
                              console.log(err)
                           })
                        }
                     },
                     {
                        text: '<b>Delete</b>',
                        type: 'button-assertive',
                        onTap: function(e)
                        {
                           Users.suppr({id: user.id},function(result){
                              console.log('User destroyed'),
                              AuthServ.logOut(),
                              $state.go('connection')
                           },function(err){
                              console.log(err)
                           })
                        }
                     }
                  ]
           })
    }
}]);
