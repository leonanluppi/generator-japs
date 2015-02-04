'use strict';

(function(){
    angular.module("<%= projectNameUI %>", [
        /* Angular Modules */
        "ngRoute",
        "ngResource",
        "ngAnimate",
        "ngStorage",

        "<%= projectNameUI %>.Welcome",
        
        /* 3rd Modules */
        "highcharts-ng"
    ]);
})();
