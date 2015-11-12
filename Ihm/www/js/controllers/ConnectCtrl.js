angular.module('starter.controllers.connect', ['ionic', 'authserv.service'])
    .controller('ConnectCtrl', ['$scope', '$state', 'AuthServ', '$http', function($scope, $state, AuthServ, $http) {

        $scope.dash = {};
        $scope.user = {};

        $scope.connection = function(){

            var name = $scope.dash.name;
            var password = $scope.dash.password;
            var success = function(res) {
                console.log('Controleur ' + res)
                if (res) {
                    window.localStorage['id'] = res.id;
                    window.localStorage['name'] = res.name;
                    window.localStorage['email'] = res.email;

                    $http.defaults.headers.common["authorization"] = res.token;
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
