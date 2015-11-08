angular.module('doors.service', [])

.factory('Doors', function($resource)
{
    return $resource('http://127.0.0.1:1337/door/:id', {id:'@id', state:'@state', owners:'@owners'},
            {
                update: {
                    method: 'PUT'
                }
            });
})
