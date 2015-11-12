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
        this.logged = false;
        console.log('Authser logged : ' + this.logged)

        this.getConnexion = function (name, password) {

            var defer = $q.defer(); // permet de récupérer la réponse déférée
            $http.post("http://localhost:1337/api/login/", {"name": name, "password": password})
                .success((function(srv){                              // Deuxième couche on passe le service en paramètre
                    return function (data) {                          // Troisième couche, il est alors possible que les couche communique entre elles

                        console.log("success " + data);
                        srv.user = data;                              // Pour récupérer les variables du service, il faut le passer en paramètre sur plusieurs couches.
                        srv.logged = true;                            // sinon, pour lui, le this est celui de la requête post envoyée à l'API
                        return defer.resolve(data);
                    }
                })(this))                                             // Première couche, on dit que le service passe en paramètre
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