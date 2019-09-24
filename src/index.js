#! /usr/bin/env node
const fs = require('fs');

const program = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');

const { VERSION }  = require('./utils/constants') ;
const create = require('./create.js')
const updata = require('./updata');

program.version(VERSION)
program
  .command('updata')
  .alias('i')
  .description('下载模块')
  .action((...args) => {
    inquirerfn()
  })
program
  .command('create')
  .description('更新模块')
  .action(() => {

    create()
  })
program.parse(process.argv)
// yyH5 不带参数时
if(!process.argv.slice(2).length) {
  program.outputHelp(make_green)
}
function make_green (txt) {
  return chalk.green(txt);
}
function inquirerfn() {
  inquirer.prompt([
    {
      type: 'checkbox',
      name: 'gitLabList',
      message: '请选择需要下载或者跟新的文件',
      choices: [
        'getHost',
        'eslintrc'
      ]
    }
  ]).then(({gitLabList}) => {
    updata(gitLabList)
  })
}