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

    console.log('############# Welcome to Japs generator! ###############');
    console.log('# A boilerplate to begin a java project jax-rs based   #');
    console.log('# with gradle and postgresql, fast and to simple       #');
    console.log('########## ' + chalk.red('Win soluções. Allright\'s reserverd.') + '##########');

    var prompts = [
        {
            type: 'input',
            name: 'projectName',
            message: '(1/4) What is the project name?',
            default: 'myapp'
        },

        {
            type: 'input',
            name: 'packageName',
            message: '(2/4) What is your default package name?',
            default: 'com.mycompany.myapp'
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
        done();
    }.bind(this));

};

JapsGenerator.prototype.app = function app() {
    this.entities = [];
    this.resources = [];
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
        utilsAnnotationsDir = utilsDir + 'annotations/',
        utilsCdiDir = utilsDir + 'cdi/',
        utilsCdiInterceptorDir = utilsCdiDir + 'interceptor/',
        utilsCdiProducerDir = utilsCdiDir + 'producer/',
        utilsExceptionsDir = utilsDir + 'exceptions/';

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

    this.template('src/main/java/package/_App.java', javaDir + 'App.java');

    this.template('src/main/java/package/repository/_Repository.java', repositoryDir + 'Repository.java');

    this.template('src/main/java/package/utils/_RestfulException.java', utilsExceptionsDir + 'RestfulException.java');
    this.template('src/main/java/package/utils/_ResourceNotFoundException.java', utilsExceptionsDir + 'ResourceNotFoundException.java');

    this.template('src/main/java/package/cdi/producer/_LoggerProducer.java', utilsCdiProducerDir + 'LoggerProducer.java');
    this.template('src/main/java/package/cdi/producer/_EntityProducer.java', utilsCdiProducerDir + 'EntityProducer.java');

    this.template('src/main/java/package/api/_HelloApi.java', apiDir + 'HelloApi.java');
    this.template('src/main/java/package/service/_HelloService.java', serviceDir + 'HelloService.java');

    if(this.storage === 'postgres') {
        this.template('src/main/java/package/META-INF/_persistence.xml', META_INFDir + 'persistence.xml');
    }
};
