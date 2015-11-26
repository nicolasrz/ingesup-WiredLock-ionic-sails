angular.module('starter.controllers.home', ['ionic', 'authserv.service'])
    .controller('HomeCtrl', ['$scope', '$http', 'AuthServ', function ($scope, $http, AuthServ) {

        $scope.locations = {};
        var userId = window.localStorage['id'];

        $scope.$on('$ionicView.enter', function () {

            io.socket.on('location', function (msg) {
                console.log('coucou bisou io socket location')
                console.log(msg)
            })
            io.socket.on('door', function (msg) {
                console.log('coucou bisou io socket door')
                console.log(msg)
            });
            io.socket.get('/location/?user=' + userId, {
                token: $http.defaults.headers.common["authorization"]
            }, function (data) {
                $scope.locations = data;
                console.log($scope.locations);

            });

            io.socket.get('/doors/owners/' + userId, {
                token: $http.defaults.headers.common["authorization"]
            }, function (data) {
                $scope.doors = data;
                console.log($scope.doors);
            });
        });
    }]);