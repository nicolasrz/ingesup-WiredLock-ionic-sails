angular.module('starter.controllers.connect', ['ionic', 'authserv.service'])
    .controller('ConnectCtrl', ['$scope', '$state', 'AuthServ', '$http', function($scope,$state, AuthServ, $http) {

        $scope.dash = {};
        $scope.user = {};

        $scope.connection = function(){

            var name = $scope.dash.name;
            var password = $scope.dash.password;
            var success = function(res) {
                console.log(res)
                if (res) {
                    $http.defaults.headers.common["authorization"] = 'Bearer ' + res.token;
                    console.log(AuthServ.user);
                    $scope.user = AuthServ.user;
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
/**
 * Created by Hubert on 08/11/2015.
 */
