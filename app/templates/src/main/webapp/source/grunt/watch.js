/*===============================================
* Title:
* Author: Leonan Luppi Pinotti
* Desc: Watch HTTP Node.js Server changes.
*       When changes fire mapped tasks
*===============================================*/

module.exports = {
    jade: {
        files: "source/**/*.jade",
        tasks: ["jade:development"],
        options: {
            livereload: true
        }
    },

    stylesheet: {
        files: "source/**/*.less",
        tasks: ["less:development", "autoprefixer"],
        options: {
            livereload: true
        }
    },

    copy: {
        files: [
            'source/**',
            '!source/**/*.less',
            '!source/**/*.jade'
        ],
        tasks: ['copy', 'concat'],
        options: {
            livereload: true
        }
    },
};
