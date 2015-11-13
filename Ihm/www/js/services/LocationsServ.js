angular.module('locations.service', [])

.factory('Locations', function($resource)
{
    return $resource('http://127.0.0.1:1337/location/:id', {id: '@id'}, 
            {
                update: {
                    method: 'put'
                }
            });
})
