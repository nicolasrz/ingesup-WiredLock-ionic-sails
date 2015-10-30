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
		var success = function(res){
				console.log(res)
				if (res) $state.go( "dashboard" ); //redirection vers la bonne vue
		}
		var error = function(err){
			console.log(err)
		};
		// Le .then permet d'attendre la "promesse" de l'asynchrone de connexion
		AuthServ.getConnexion(name,password).then(success,error);
	};


	$scope.logout = function(){

		console.log('logout');
	};

	$scope.register = function(){

		console.log('register');
	};


}]);
