angular.module('starter.controllers.dashboard', ['ionic','authserv.service'])
	.controller('DashboardCtrl', ['$scope', '$state' ,'AuthServ', function($scope,$state,AuthServ) {

	$scope.dash = {};
	$scope.dashlists = [
	{ title: '13h30',
	  content: 'Ouverture principale porte par Nicolas'	 },
	{ title: '15h00',
	  content: 'Fermeture principale porte par Nicolas'	 },
	{ title: '18h45',
	  content: 'Ouverture porte de garage par Nicolas'	 },
	{ title: '18h55',
	  content: 'Fermture porte de garage par Nicolas'	 },
];


	$scope.connection = function(){

		var name = $scope.dash.name;
		var password = $scope.dash.password;
		
		$scope.res = AuthServ.getConnexion(name,password);
	
	};


	$scope.logout = function(){

		console.log('logout');
	};

	$scope.register = function(){

		console.log('register');
	};


}]);
