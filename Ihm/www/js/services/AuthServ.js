angular.module('authserv.service',[])

.service('AuthServ',function($http, $q){
   var connection;

   this.getConnexion = function(name,password){
      
      var defer = $q.defer(); // permet de récupérer la réponse déférée  
      $http.post("http://localhost:1337/api/login/",  { "name": name, "password": password })
      .success(function(data) {
           
         console.log("success " + data);
         return defer.resolve(data);
       })
       .error(function(data) {
           
         console.log(data);
         return defer.reject(data);
       })
       return defer.promise; // envoie d'une promesse d'envoi de réponse
       
   };

   this.setInscription = function(name,email,password){
      
      var defer = $q.defer(); // permet de récupérer la réponse déférée  
      $http.post("http://localhost:1337/user/create/",  { "name": name, "email": email, "password": password })
      .success(function(data) {
           
         console.log("success " + data);
         return defer.resolve(data);
       })
       .error(function(data) {
           
         console.log(data);
         return defer.reject(data);
       })
       return defer.promise; // envoie d'une promesse d'envoi de réponse
       
   };

   this.getInformation = function(id,model){

      var defer = $q.defer();
      $http.get("http://localhost:1337/"+model+"/find/",  { "id": id})
      .success(function(data) {


         console.log("success " + data);
         return defer.resolve(data);
      })
      .error(function(data) {

         console.log(data);
         return defer.reject(data);
      })
   return defer.promise;
   }
})