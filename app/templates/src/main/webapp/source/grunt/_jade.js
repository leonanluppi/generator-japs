/*===============================================
* Title: Jade Grunt Task
* Author: Leonan Luppi Pinotti   
* Desc: Compile all .jade to .html, if select
*       production task then it will minify 
*       otherwise will be readable
*===============================================*/  

module.exports = {
    development: {
        options: {
            pretty: true
        },
        files: [{
            expand: true,
            cwd: "source",
            src: ["**/*.jade"],
            dest: "build/",
            ext: ".html"
        }]
    },

    production: {
        files: [{
            expand: true,
            cwd: "source",
            src: ["**/*.jade"],
            dest: "build/",
            ext: ".html"
        }]
    }    
};