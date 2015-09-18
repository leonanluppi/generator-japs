'use strict';

(function(){
    angular.module("<%= projectName %>", [
        /* Angular Modules */
        "ngRoute",
        "ngResource",
        "ngAnimate",
        "ngStorage",

        "<%= projectName %>.Welcome",

        /* 3rd Modules */
        "highcharts-ng"
    ]);
})();
