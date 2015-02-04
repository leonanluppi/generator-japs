/*===============================================
* Title: Less Grunt Task 
* Author: Leonan Luppi Pinotti
* Desc: Compile all .less to .css if select 
*       production task then it will minify
*       otherwise will be readable
*===============================================*/  

module.exports = {
    development: {
        options: {
            cleancss: false
        },
        
        files: {
            "build/assets/stylesheet/style.css": ["source/assets/stylesheet/*.less"]
        }
    },

    production: {
    	options: {
    		cleancss: true
    	},

        files: {
            "build/assets/stylesheet/style.css": ["source/assets/stylesheet/*.less"]
        }
    }    
};