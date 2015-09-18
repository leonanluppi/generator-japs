'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    yosay = require('yosay'),
    packagejs = require(__dirname + '/../package.json'),
    mkdirp = require('mkdirp');

var JapsGenerator = module.exports = function JapsGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function() {
        this.installDependencies({skipInstall: options['skip-install']});
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(JapsGenerator, yeoman.generators.Base);

JapsGenerator.prototype.askFor = function askFor() {
    var done = this.async();

    console.log('Welcome to ' + chalk.red('Japs Generator') +  ' version: ' + packagejs.version);
    console.log('\n');

    console.log("Okay, Let's I make some questions to help create your project...");

    console.log('\n');

    var prompts = [
        {
            type: 'input',
            name: 'projectName',
            message: '(1/4) What is the project name?',
            default: 'japsProject'
        },

        {
            type: 'input',
            name: 'packageName',
            message: '(2/4) What is your default package name?',
            default: 'com.win.japsProject'
        },

        {
            type: 'input',
            name: 'restService',
            message: '(3/4) What is your application path (REST URL Service)?',
            default: 'api'
        },

        {
            type: 'list',
            name: 'storage',
            message: '(4/4) What is your application storage?',
            choices: [
            {
                value: 'postgres',
                name: 'PostgreSQL',
            }
            ]
        }
    ];

    this.prompt(prompts, function(props) {
        this.projectName = props.projectName;
        this.packageName = props.packageName;
        this.restService = props.restService;
        this.storage = props.storage;
        this.persistenceName = props.persistenceName;
        this.transactionType = props.transactionType;
        done();
    }.bind(this));

};

JapsGenerator.prototype.app = function app() {
    this.generatorConfig = {
        "projectName": this.projectName,
        "packageName": this.packageName,
    };

    /* Create packages folder*/
    var packageFolder = this.packageName.replace(/\./g, '/'),
    packageFolderTest = packageFolder + '/test';

    /* Create a simple java project structure */
    var javaDir = 'src/main/java/' + packageFolder + '/',
    META_INFDir = 'src/main/java/META-INF/',
    resourceDir = 'src/main/resources/',
    resourceMETA_INFDir = resourceDir + 'META-INF/',
    javaTestDir = 'src/test/java/' + packageFolderTest + '/',
    resourceTestDir = 'src/test/resources/';

    /* Create a JAPS project structure */
    var entityDir = javaDir + '/entity/',
    repositoryDir = javaDir + '/repository/',
    apiDir = javaDir + '/api/',
    serviceDir = javaDir + '/service/',
    utilsDir = javaDir + '/utils/',
    utilsAnnotationsDir = utilsDir + 'annotation/',
    utilsCdiDir = utilsDir + 'cdi/',
    utilsCdiInterceptorDir = utilsCdiDir + 'interceptor/',
    utilsCdiProducerDir = utilsCdiDir + 'producer/',
    utilsExceptionsDir = utilsDir + 'exception/';

    mkdirp(javaDir);
    mkdirp(META_INFDir);
    mkdirp(resourceDir);
    mkdirp(resourceMETA_INFDir);
    mkdirp(javaTestDir);
    mkdirp(resourceTestDir);

    mkdirp(entityDir);
    mkdirp(repositoryDir);
    mkdirp(apiDir);
    mkdirp(serviceDir);
    mkdirp(utilsDir);
    mkdirp(utilsAnnotationsDir);
    mkdirp(utilsCdiDir);
    mkdirp(utilsCdiInterceptorDir);
    mkdirp(utilsCdiProducerDir);
    mkdirp(utilsExceptionsDir);

    this.template('_build.gradle', 'build.gradle');

    this.template('src/resources/META-INF/_beans.xml', resourceMETA_INFDir + 'beans.xml');

    this.template('src/main/package/_App.java', javaDir + 'App.java');

    this.template('src/main/package/repository/_Repository.java', repositoryDir + 'Repository.java');

    this.template('src/main/package/utils/_RestfulException.java', utilsExceptionsDir + 'RestfulException.java');
    this.template('src/main/package/utils/_ResourceNotFoundException.java', utilsExceptionsDir + 'ResourceNotFoundException.java');

    this.template('src/main/package/cdi/producer/_LoggerProducer.java', utilsCdiProducerDir + 'LoggerProducer.java');
    this.template('src/main/package/cdi/producer/_EntityProducer.java', utilsCdiProducerDir + 'EntityProducer.java');

    this.template('src/main/package/api/_HelloApi.java', apiDir + 'HelloApi.java');
    this.template('src/main/package/service/_HelloService.java', serviceDir + 'HelloService.java');

    if(this.storage === 'postgres') {
        this.template('src/main/package/META-INF/_persistence.xml', META_INFDir + 'persistence.xml');
    }

    /* Webapp angularJS */
    var webAppDir = 'src/main/webapp/',
        sourceDir = webAppDir + 'source/',
        assetsDir = sourceDir + 'assets/',
        assetsStyleDir = assetsDir + 'stylesheet/',
        assetsImageDir = assetsDir + 'image/',
        assetsJavascrptDir = assetsDir + 'javascript/',
        gruntDir = sourceDir + 'grunt/',
        templatesDir = sourceDir + 'templates/',
        templatesIncludesJadeDir = templatesDir + 'includes/jade/',
        appDir = sourceDir + 'app/';

    var appWelcomeDir = appDir + 'welcome/',
        templateWelcomeDir = templatesDir + 'welcome/';

    mkdirp(webAppDir);
    mkdirp(sourceDir);
    mkdirp(assetsDir);
    mkdirp(assetsStyleDir);
    mkdirp(assetsImageDir);
    mkdirp(assetsJavascrptDir);
    mkdirp(gruntDir);
    mkdirp(templatesDir);
    mkdirp(templatesIncludesJadeDir);
    mkdirp(templateWelcomeDir);
    mkdirp(appDir);
    mkdirp(appWelcomeDir);

    this.template(webAppDir + '_Gruntfile.js', webAppDir + 'Gruntfile.js');
    this.template(webAppDir + '_.bowerrc', webAppDir + '.bowerrc');
    this.template(webAppDir + '_bower.json', webAppDir + 'bower.json');
    this.template(webAppDir + '_package.json', webAppDir + 'package.json');

    this.template(sourceDir + '_index.jade', sourceDir + 'index.jade');

    this.template(templatesIncludesJadeDir + '_head.jade', templatesIncludesJadeDir + 'head.jade');
    this.template(templatesIncludesJadeDir + '_footer.jade', templatesIncludesJadeDir + 'footer.jade');

    this.template(gruntDir + '_aliases.yaml', gruntDir + 'aliases.yaml');
    this.template(gruntDir + '_autoprefixer.js', gruntDir + 'autoprefixer.js');
    this.template(gruntDir + '_clean.js', gruntDir + 'clean.js');
    this.template(gruntDir + '_concat.js', gruntDir + 'concat.js');
    this.template(gruntDir + '_connect.js', gruntDir + 'connect.js');
    this.template(gruntDir + '_copy.js', gruntDir + 'copy.js');
    this.template(gruntDir + '_jade.js', gruntDir + 'jade.js');
    this.template(gruntDir + '_less.js', gruntDir + 'less.js');
    this.template(gruntDir + '_uglify.js', gruntDir + 'uglify.js');
    this.template(gruntDir + '_watch.js', gruntDir + 'watch.js');

    this.template(assetsStyleDir + '_app.less', assetsStyleDir + 'app.less');
    this.template(assetsStyleDir + '_bootstrap.custom.min.css', assetsStyleDir + 'bootstrap.custom.min.css');

    this.template(assetsJavascrptDir + '_cbpAnimatedHeader.js', assetsJavascrptDir + 'cbpAnimatedHeader.js');
    this.template(assetsJavascrptDir + '_classie.js', assetsJavascrptDir + 'classie.js');
    this.template(assetsJavascrptDir + '_freelancer.js', assetsJavascrptDir + 'freelancer.js');

    this.template(assetsImageDir + '_profile.png', assetsImageDir + 'profile.png');

    this.template(templateWelcomeDir + '_welcome.jade', templateWelcomeDir + 'welcome.jade');

    this.template(appDir + '_app.js', appDir + 'app.js');
    this.template(appWelcomeDir + '_welcome.module.js', appWelcomeDir + 'welcome.module.js');
    this.template(appWelcomeDir + '_welcome.route.js', appWelcomeDir + 'welcome.route.js');
};
