// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers.doors',
	'starter.controllers.dashboard',
	'starter.controllers.connect',
	'starter.controllers.user',
	'starter.services',
	'starter.controllers.home',
	'starter.controllers.locations',
	'authserv.service',
	'doors.service',
	'ngResource',
	'locations.service'
])

	.run(function($ionicPlatform, $rootScope, $state, AuthServ) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleLightContent();
		}

	});
		$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams){

			console.log('App.js ' + AuthServ.logged);
			console.log(AuthServ.user);

			if (toState.needAuth == true && AuthServ.logged == false){
				$state.go('connection')
				e.preventDefault()
			} else {
				if (toState.name == 'connection' && AuthServ.logged == true){
					$state.go('tab.home')
					e.preventDefault()
				}
			}
		})
})

	.config(function($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// setup an abstract state for the tabs directive
	.state('tab', {
		url: '/tab',
		abstract: true,
		templateUrl: 'templates/menu/tabs.html'
	})


	// Each tab has its own nav history stack:
	.state('new', {
		url: '/user',
		templateUrl: 'templates/user/inscription.html'
	})	


	.state('connection', {
		url: '/connection',

				templateUrl: 'templates/user/connection.html',
				controller: 'ConnectCtrl'

	})

	.state('tab.account', {
		url: '/account',
		views: {
			'account': {
				templateUrl: 'templates/user/account.html',
				controller: 'UserCtrl'
			}
		},
			needAuth : true
	})
	.state('tab.dashboard', {
		url: '/dashboard',
		views: {
			'locations': {
				templateUrl: 'templates/dashboard/listDashboard.html',
				controller: 'DashboardCtrl'
			}
		},
			needAuth : true
	})

	.state('tab.home', {
		url: '/home',
		views: {
			'home': {
				templateUrl: 'templates/home/home.html',
				controller: 'HomeCtrl'
			}
		},
		needAuth : true
	})

	.state('tab.locations', {
		url: '/locations',
		views: {
			'locations': {
				templateUrl: 'templates/location/location.html',
				controller: 'LocationsCtrl'
			}
		},
			needAuth : true
	})

	.state('tab.doors', {
		url: '/doors',
		views :
		{
			'doors': {
				templateUrl: '/templates/doors/doors.html',
				controller: 'DoorsCtrl'
			}
		},
			needAuth : true
	});

	// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise(function ($injector, $location) {
			var $state = $injector.get("$state");
			$state.go("connection");
		});

});
