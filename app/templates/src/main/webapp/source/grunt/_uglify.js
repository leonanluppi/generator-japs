 /*===============================================
 * Title: Uglify Grunt Task
 * Author: Leonan Luppi Pinotti   
 * Desc: Minify all .js files and copy to a unique
 *===============================================*/  
 
module.exports = {
	production: {
		options: {
			mangle: false
		},
		files: {
			"build/app/app.min.js": ["source/app/*.js"]
		}
	}
};