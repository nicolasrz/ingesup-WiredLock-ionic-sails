angular.module('authserv.service', [])


    .factory('Users', function ($resource) {
        /*return $resource('http://localhost:1337/user/:id', {id: '@id'},
         {
         update: {
         method: 'put'
         }
         'get':    {method:'GET'},
         'save':   {method:'POST'},
         'query':  {method:'GET', isArray:true},
         'remove': {method:'DELETE'},
         'delete': {method:'DELETE'}
         })*/
        return $resource('http://localhost:1337/', null, {
            fetch: {method: 'GET', url: 'http://localhost:1337/user/:id', params: {id: '@id'}}

        })

    })
    .service('AuthServ', function ($http, $q) {

        this.user;

        this.getConnexion = function (name, password) {

            var defer = $q.defer(); // permet de récupérer la réponse déférée
            $http.post("http://localhost:1337/api/login/", {"name": name, "password": password})
                .success(function (data) {

                    console.log("success " + data);
                    this.user = data;
                    return defer.resolve(data);
                })
                .error(function (data) {

                    console.log(data);
                    return defer.reject(data);
                })
            return defer.promise; // envoie d'une promesse d'envoi de réponse

        };

        this.setInscription = function (name, email, password) {

            var defer = $q.defer(); // permet de récupérer la réponse déférée
            $http.post("http://localhost:1337/user/create/", {"name": name, "email": email, "password": password})
                .success(function (data) {

                    console.log("success " + data);
                    return defer.resolve(data);
                })
                .error(function (data) {

                    console.log(data);
                    return defer.reject(data);
                })
            return defer.promise; // envoie d'une promesse d'envoi de réponse

        };
    });