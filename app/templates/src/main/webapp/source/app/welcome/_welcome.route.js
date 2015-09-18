(function() {
    "use strict";

    angular.module("<%= projectName %>.Welcome").config(configRouter);

    function configRouter($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "../templates/welcome/welcome.html"
        })
    }
})();
