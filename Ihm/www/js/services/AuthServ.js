angular.module('authserv.service', [])


    .factory('Users', function ($resource) {
        return $resource('http://localhost:1337/', null, {
            fetch: {
                method: 'GET',
                url: 'http://localhost:1337/user/:id',
                params: {id: '@id'}},
            maj: {
                method: 'PUT', url: 'http://localhost:1337/user/:id',
                params: {id:'@id', name: '@name', email: '@email'},
                transformResponse: function(data, headers) {

                }},
            suppr: {
                method: 'DELETE',
                url: 'http://localhost:1337/user/:id',
                params: {id: '@id'},
                transformResponse: function(data, headers) {

                }
            }

        })
    })
    .service('AuthServ', function ($http, $q) {

        this.user;
        this.logged = false;

        this.getConnexion = function (name, password) {

            var defer = $q.defer(); // permet de récupérer la réponse déférée
            $http.post("http://localhost:1337/api/login/", {"name": name, "password": password})
                .success((function(srv){                              // Deuxième couche on passe le service en paramètre
                    return function (data) {                          // Troisième couche, il est alors possible que les couche communique entre elles

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
                    return defer.resolve(data);
                })
                .error(function (data) {
                    console.log(data);
                    return defer.reject(data);
                })
            return defer.promise; // envoie d'une promesse d'envoi de réponse
        };

        this.logOut = function (){
            $http.defaults.headers.common["authorization"] = '',
            window.localStorage['id'] = '';
            window.localStorage['name'] ='';
            window.localStorage['email'] ='';
            this.logged = false;
            this.user = null;
        }
    });
