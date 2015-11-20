angular.module('starter.controllers.home', ['ionic', 'authserv.service'])
    .controller('HomeCtrl', ['$scope', '$http', 'AuthServ', function ($scope, $http, AuthServ) {

        $scope.locations = {};
        var id = window.localStorage['id'];

        $scope.$on('$ionicView.enter', function () {
            io.socket.get('/location/?user='+ id, { token: $http.defaults.headers.common["authorization"]
            }, function (data) {
                $scope.locations = data;
                console.log($scope.locations[0]);
            });
            io.socket.on('location', function (msg) {
                console.log('coucou bisou io socket location')
                console.log(msg)
            })
        });

        /*$scope.location = {}
         var headAuth = $http.defaults.headers.common["authorization"]
         var id = window.localStorage['id']

         $scope.$on('$ionicView.enter', function () {

         io.socket.get({
         url: '/location/?user='+id,
         headers: headAuth
         }, function (data) {
         console.log(data)
         $scope.locations = data;
         console.log($scope.location);
         });
         io.socket.on('location', function (msg) {
         console.log('coucou bisou io socket location')
         console.log(msg)
         })
         });*/
    }]);