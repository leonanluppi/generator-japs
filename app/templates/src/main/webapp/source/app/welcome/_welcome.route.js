(function() {
    "use strict";

    angular.module("<%= projectNameUI %>.Welcome").config(configRouter);

    function configRouter($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "../templates/welcome/welcome.html"
        })
    }
})();
