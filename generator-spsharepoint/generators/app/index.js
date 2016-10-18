'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var url = "";

module.exports = yeoman.Base.extend({

  prompting: function () {
    this.log(yosay(
      'Welcome to the ' + chalk.red('SPSharePoint') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'siteurl',
      message: 'Enter Sharepoint Site Url',
      required: true,
      default: 'http://www.sharepoint.com/'
    },       
      {
      type: 'input',
      name: 'libraryurl',
      message: 'Enter SharePoint Libarary Url where files will be hosted',
      required: true,
      default: 'http://www.shareopint.com/Style%20Library'
    },
    {
      type: 'input',
      name: 'listname',
      message: 'Enter SharePoint List name from where data will be retrieved',
      required: true,
      default: 'Test'
    },
    {
      type: 'input',
      name: 'foldername',
      message: 'Folder name for your file strucutre',
      required: true,
      default: 'SharePointApp'
    },
    ];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
      url = this.props.libraryurl;
      var urlWithoutHttp = url.replace("http://", '\\\\\\\\').replace(":", "@");
      var indexOfSlash = urlWithoutHttp.indexOf("/");
      var urlWithDavWWWRoot = urlWithoutHttp.substring(0, indexOfSlash) + "\\\\DavWWWRoot" + urlWithoutHttp.substring(indexOfSlash);
      var finalDavUrl = urlWithDavWWWRoot.replace("/", "\\\\");
      url = finalDavUrl;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('./' + this.props.foldername + '/files/index.html'), {
        url: this.props.libraryurl,
      }
    );
    this.fs.copyTpl(
      this.templatePath('style.css'),
      this.destinationPath('./' + this.props.foldername + '/files/style.css')
    );
    this.fs.copyTpl(
      this.templatePath('script.js'),
      this.destinationPath('./' + this.props.foldername + '/files/script.js'), {
        listname: this.props.listname
      }
    );
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('./' + this.props.foldername + '/gulpfile.js'), {
        davurl: url
      }
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('./' + this.props.foldername + '/package.json'),{
        url: this.props.libraryurl,
      }
    );    
  },

  install: function () {
    this.installDependencies();
  }
});
