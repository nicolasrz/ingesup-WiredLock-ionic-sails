angular.module('starter.controllers.home', ['ionic','authserv.service'])
	.controller('HomeCtrl', ['$scope', '$state' ,'AuthServ', function($scope,$state,AuthServ) {


		io.socket.get('/location/?user='+ window.localStorage['id'], function(data){
			console.log('Je passe après mon iosocket.get'+data)
			$scope.locations = data;
		})
		io.socket.on('location',function(msg){
			console.log(msg)
		})

	}]);