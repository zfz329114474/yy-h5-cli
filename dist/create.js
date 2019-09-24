'use strict';

var fs = require('fs');
var chalk = require('chalk');
var inquirer = require('inquirer');
var ora = require('ora');
var shell = require('shelljs');
var downloadGitRepo = require('download-git-repo');

var updata = require('./updata.js');
function create() {
  var projectName = process.env.PWD.split('/').pop();
  inquirer.prompt([{
    type: 'input',
    message: '\u9879\u76EE\u540D\u4E3A:',
    name: 'projectName',
    default: projectName
  }, {
    name: 'version',
    type: 'input',
    default: '1.0.0',
    message: '项目版本'
  }, {
    name: 'description',
    message: '请输入项目描述',
    default: ''
  }]).then(function (answer) {
    var loading = ora('正在下载vue模板...');
    loading.start();
    downloadGitRepo('direct:http://121.196.222.148:10008/team-web/vue-base-template.git', 'temCache', { clone: true }, function (err) {
      if (err) {
        loading.fail(chalk.red('vue模板下载失败!!'));
      } else {
        shell.cd('temCache');
        shell.ls('-A').forEach(function (item) {
          shell.mv(process.env.PWD + '/temCache/' + item, process.env.PWD + '/');
        });
        shell.cd('..');
        shell.rm('-r', 'temCache');
        var packageJson = process.env.PWD + '/package.json';
        if (fs.existsSync(packageJson)) {
          var data = fs.readFileSync(packageJson).toString();
          var json = JSON.parse(data);
          json.name = answer.projectName;
          json.version = answer.version;
          json.description = answer.description;
          fs.writeFileSync(packageJson, JSON.stringify(json, null, '\t'), 'utf-8');
        }
        loading.succeed(chalk.green('vue模板下载成功'));
        var needUpdataList = ['eslintrc', 'getHost'];
        updata(needUpdataList);
      }
    });
  });
}

module.exports = create;