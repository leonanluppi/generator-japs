/*===============================================
* Title: Sync Grunt Task
* Author: Leonan Luppi Pinotti
* Desc: Copy all files to build directory
*===============================================*/

module.exports = {
	development: {
	    cwd: 'source',
	    src: [
	        '**',
	        '!**/*.less',
	        '!**/*.jade'
	    ],
	    dest: 'build',
	    expand: true
	}
};
