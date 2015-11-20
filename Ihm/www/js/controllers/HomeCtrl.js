angular.module('starter.controllers.home', ['ionic','authserv.service'])
	.controller('HomeCtrl', ['$scope', '$state' ,'AuthServ', function($scope,$state,AuthServ) {


		io.socket.on('connect', function(){
			console.log('connecté à l\'api')
			io.socket.get('/location/?user='+ window.localStorage['id'], function(data){
				console.log('Je passe après mon iosocket.get'+data)
				$scope.locations = data;
			})
			io.socket.on('location',function(msg){
				console.log(msg)
			})
		})

	}]);