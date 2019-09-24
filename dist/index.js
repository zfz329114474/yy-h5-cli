#! /usr/bin/env node
'use strict';

var fs = require('fs');

var program = require('commander');
var chalk = require('chalk');
var inquirer = require('inquirer');

var _require = require('./utils/constants'),
    VERSION = _require.VERSION;

var create = require('./create.js');
var updata = require('./updata');

program.version(VERSION);
program.command('updata').alias('i').description('下载模块').action(function () {
  inquirerfn();
});
program.command('create').description('更新模块').action(function () {

  create();
});
program.parse(process.argv);
// yyH5 不带参数时
if (!process.argv.slice(2).length) {
  program.outputHelp(make_green);
}
function make_green(txt) {
  return chalk.green(txt);
}
function inquirerfn() {
  inquirer.prompt([{
    type: 'checkbox',
    name: 'gitLabList',
    message: '请选择需要下载或者跟新的文件',
    choices: ['getHost', 'eslintrc']
  }]).then(function (_ref) {
    var gitLabList = _ref.gitLabList;

    updata(gitLabList);
  });
}