angular.module('doors.service', [])

.factory('Doors', function($resource)
{
    return $resource('http://127.0.0.1:1337/door/:id', null,
            {
                update: {
                    method: 'PUT'
                }
            });
})
