'use strict';

var downloadGit = require('download-git-repo');
var fs = require('fs');
var chalk = require('chalk');
var ora = require('ora');
var shell = require('shelljs');

var _require = require('./utils/constants'),
    CACHE_UTILS_NAME = _require.CACHE_UTILS_NAME;

var notDoneList = [];
function updata(needUpdataList) {

  var loading = ora('正在下载工具模板...');
  loading.start();
  downloadGit('direct:http://121.196.222.148:10008/team-web/h5-common.git', CACHE_UTILS_NAME, { clone: true }, function (err) {
    if (err) {
      loading.fail(chalk.red('工具模板下载失败'));
    } else {
      loading.succeed(chalk.green('工具模板下载成功'));
      notDoneList = needUpdataList;
      needUpdataList.map(function (item) {
        switch (item) {
          case 'eslintrc':
            mvEslintrc(item);
            break;
          case 'getHost':
            mvGetHost(item);
            break;
          default:
            break;
        }
      });
    }
  });
}
function mvGetHost(item) {
  fs.mkdir('./src/utils', { recursive: true }, function (err) {
    if (!err) {
      var getHostPath = process.env.PWD + '/' + CACHE_UTILS_NAME + '/src/getHost.js';
      shell.mv(getHostPath, process.env.PWD + '/src/utils/');
      delCacheDir(item);
    }
  });
}
function mvEslintrc(item) {
  fs.mkdir('./src/utils', { recursive: true }, function (err) {
    if (!err) {
      var getHostPath = process.env.PWD + '/' + CACHE_UTILS_NAME + '/.eslintrc.js';
      shell.mv(getHostPath, process.env.PWD + '/.eslintrc.js');
      delCacheDir(item);
    }
  });
}
function delCacheDir(doneItem) {
  notDoneList.splice(notDoneList.findIndex(function (item) {
    return item === doneItem;
  }), 1);
  if (!notDoneList.length) {
    shell.rm('-r', CACHE_UTILS_NAME);
    console.log(chalk.green('工具文件已跟新'));
  }
}
module.exports = updata;