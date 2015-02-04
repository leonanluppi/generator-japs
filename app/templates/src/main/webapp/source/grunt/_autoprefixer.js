/*===============================================
* Title: Auto Prefixer Grunt Task
* Author: Leonan Luppi Pinotti   
* Desc: Add all browsers prefix on .css, example:
*       h1 {transition: color 1s linear .2s}
*       will be
*       h1 {-webkit-transition: color 1s linear .2s; Ch, Saf  3.2
*      		-moz-transition: color 1s linear .2s; 4 < Fx <16
*        	-ms-transition: color 1s linear .2s; IE 10
*          	-o-transition: color 1s linear .2s; 10.5 < Op < 12.1
*           transition: color 1s linear .2s}
*===============================================*/  

module.exports = {
	development: {
		build: {
			expand: true,
			cwd: "source",
			src: ["build/assets/stylesheet/style/*.css"],
			dest: "build"
		}
	}
};