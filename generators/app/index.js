'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = yeoman.Base.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the sublime ' + chalk.red('generator-cmdcli') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Enter project name',
      default: path.basename(process.cwd()),
      validate: function (str) {
        return str.length > 0;
      }
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.projectName = props.projectName;
      this.props.commandName = this.projectName.toLowerCase();
      this.commandName = this.props.commandName;
    }.bind(this));
  },

  writing: {
    packageJSON: function () {
      this.copy('_package.json', 'package.json');
    },
    config: function () {
      this.copy('cmdclirc.json', '.cmdclirc.json');
    },
    git: function () {
      this.copy('gitignore', '.gitignore');
      this.copy('gitattributes', '.gitattributes');
    },
    editorConfig: function () {
      this.copy('editorconfig', '.editorconfig');
    },
    bin: function () {
      this.copy('bin', 'bin/' + this.commandName);
    },
    babel: function () {
      this.copy('babelrc', '.babelrc');
    },
    commands: function () {
      this.copy('commandswelcome.js', 'src/commands/welcome.js');
      this.copy('commandsindex.js', 'src/commands/index.js');
    }
  },

  install: function () {
    this.installDependencies({
      bower: false
    });
  }
});
