angular.module('authserv.service',[])

.service('AuthServ',function($http){
	var connection;
	
	this.getConnexion = function(name,password){
		$http.post("http://10.33.1.233:1337/api/login/",  { "name": name, "password": password })
		.success(function(data) {
        	alert("SUCCESS!");
			console.log(data);	
    	})
    	.error(function(data) {
        	alert("ERROR");
			console.log(data);
    	})
	};

});