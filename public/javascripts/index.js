window.app = angular.module('app', ['ngRoute']);

app.service('rsadService', function () {
    var data;
    var id;
    return {
        data:function () {
            // This exposed private data
            return data;
        },
        addData:function (rsads) {
            // This is a public function that modifies private data
            data = rsads.adList;
        },
        setID: function (setId){
            id = setId;
        },
        getID: function (){
            return id;
        }
    };
});

app.controller('SearchCtrl', ['$scope', '$http', '$location', 'rsadService', function (s, h, l, r) {
    s.search = function () {
        var that = this;
        h.get('http://s001.tw.ias.global.rakuten.com/adv/?rad_nw=tw&rad_site=Ichiba&rad_charset=UTF-8&rad_ssl=0&log=0&rad_total=100&rad_loc='+this.locationID).success(function (data){
            r.addData(data);
            r.setID(that.locationID);
            l.path('/rsad');    
        });
        
    };
}]);


app.controller('RSADCtrl', ['$scope', 'rsadService', function(s, r){
    s.locationid = r.getID();
    s.data = r.data();
}]);


app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when('/rsad', {
        controller: 'RSADCtrl',
        templateUrl: 'templates/rsad.html'
    }).otherwise({
        redirectTo: '/'
    });
}]);