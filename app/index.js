'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    chalk = require('chalk'),
    yosay = require('yosay');

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

    console.log('\n');
    console.log('############# Welcome to Japs generator! ###############');
    console.log('# A boilerplate to begin a java project jax-rs based   #');
    console.log('# with gradle and postgresql, fast and to simple       #');
    console.log('########## ' + chalk.red('Win soluções. Allright\'s reserverd.') + '##########');
    console.log('\n');

    console.log("Okay, Let's I make some questions to help me create your project...");

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
            message: '(3/5) What is your application path (REST URL Service)?',
            default: 'api'
        },

        {
            type: 'list',
            name: 'storage',
            message: '(4/5) What is your application storage?',
            choices: [
            {
                value: 'postgres',
                name: 'PostgreSQL',
            }
            ]
        },

        {
            when: 'storage.postgres',
            type: 'input',
            name: 'persistenceName',
            message: 'What is your persistence unit name?'
        },

        {
            when: 'storage.postgres',
            type: 'list',
            name: 'transactionType',
            message: 'What is your transaction type?',
            choices: ['JTA', 'RESOURCE_LOCAL']
        },

        {
            type: 'confirm',
            name: 'ui',
            message: '(5/5) Would you like to generate AngularJS webapp UI?',
            default: true
        },

        {
            when: 'ui.true',
            type: 'input',
            name: 'projectNameUI',
            message: 'What is your project name?',
            default: 'japsUI'
        },

        {
            when: 'ui.true',
            type: 'input',
            name: 'authorUI',
            message: 'What is your author name?',
            default: 'Win'
        },

        {
            when: 'ui.true',
            type: 'input',
            name: 'keywordsUI',
            message: 'What is your keywords for this project?',
            default: '"JAX-RS", "AngularJS", "PostgreSQL"'
        },

        {
            when: 'ui.true',
            type: 'confirm',
            name: 'publicOrPrivateUI',
            message: 'This is a private project ?',
            default: true
        }
    ];

    this.prompt(prompts, function(props) {
        this.projectName = props.projectName;
        this.packageName = props.packageName;
        this.restService = props.restService;
        this.storage = props.storage;
        this.persistenceName = props.persistenceName;
        this.transactionType = props.transactionType;
        this.ui = props.ui;
        this.projectNameUI = props.projectNameUI;
        this.authorUI = props.authorUI;
        this.keywordsUI = props.keywordsUI;
        this.publicOrPrivateUI = props.publicOrPrivateUI;
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

    this.mkdir(javaDir);
    this.mkdir(META_INFDir);
    this.mkdir(resourceDir);
    this.mkdir(resourceMETA_INFDir);
    this.mkdir(javaTestDir);
    this.mkdir(resourceTestDir);

    this.mkdir(entityDir);
    this.mkdir(repositoryDir);
    this.mkdir(apiDir);
    this.mkdir(serviceDir);
    this.mkdir(utilsDir);
    this.mkdir(utilsAnnotationsDir);
    this.mkdir(utilsCdiDir);
    this.mkdir(utilsCdiInterceptorDir);
    this.mkdir(utilsCdiProducerDir);
    this.mkdir(utilsExceptionsDir);

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
        appDir = sourceDir + 'app/';

    var appWelcomeDir = appDir + 'welcome/',
        templateWelcomeDir = templatesDir + 'welcome/';

    this.mkdir(webAppDir);
    this.mkdir(sourceDir);
    this.mkdir(assetsDir);
    this.mkdir(assetsStyleDir);
    this.mkdir(assetsImageDir);
    this.mkdir(assetsJavascrptDir);
    this.mkdir(gruntDir);
    this.mkdir(templatesDir);
    this.mkdir(templateWelcomeDir);
    this.mkdir(appDir);
    this.mkdir(appWelcomeDir);

    this.template(webAppDir + '_Gruntfile.js', webAppDir + 'Gruntfile.js');
    this.template(webAppDir + '_.bowerrc', webAppDir + '.bowerrc');
    this.template(webAppDir + '_bower.json', webAppDir + 'bower.json');
    this.template(webAppDir + '_package.json', webAppDir + 'package.json');

    this.template(sourceDir + '_index.jade', sourceDir + 'index.jade');

    this.template(gruntDir + '_aliases.yaml', gruntDir + '_aliases.yaml');
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
