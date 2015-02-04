/*===============================================
* Title: Clean Grunt Task
* Author: Leonan Luppi Pinotti
* Desc: Concat all .js files into one
*===============================================*/

module.exports = {
    development: {
        src: [
            "source/app/*.js",
            "source/app/**/*.module.js",
            "source/app/**/*.js"
        ],
        dest: "build/app/app.js"
    }
};
