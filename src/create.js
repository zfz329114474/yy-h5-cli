const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');
const shell = require('shelljs')
const downloadGitRepo = require('download-git-repo');

const updata = require('./updata.js')
function create() {
  const projectName = process.env.PWD.split('/').pop()
  inquirer.prompt([
    {
      type: 'input',
      message: `项目名为:`,
      name: 'projectName',
      default: projectName
    },
    {
      name: 'version',
      type: 'input',
      default: '1.0.0',
      message: '项目版本'
    },
    {
      name: 'description',
      message: '请输入项目描述',
      default: ''
    }
  ]).then(answer => {
    let loading = ora('正在下载vue模板...');
    loading.start()
    downloadGitRepo('direct:http://121.196.222.148:10008/team-web/vue-base-template.git', 'temCache', {clone: true}, (err) => {
      if(err) {
        loading.fail(chalk.red('vue模板下载失败!!'))
      } else {
        shell.cd('temCache')
        shell.ls('-A').forEach(item => {
          shell.mv(`${process.env.PWD}/temCache/${item}`, `${process.env.PWD}/`)
        })
        shell.cd('..')
        shell.rm('-r','temCache')
        const packageJson = `${process.env.PWD}/package.json`
        if(fs.existsSync(packageJson)) {
          const data = fs.readFileSync(packageJson).toString();
          let json = JSON.parse(data);
          json.name = answer.projectName
          json.version = answer.version
          json.description = answer.description
          fs.writeFileSync(packageJson, JSON.stringify(json, null, '\t'), 'utf-8')
        }
        loading.succeed(chalk.green('vue模板下载成功'));
        const needUpdataList = [
          'eslintrc',
          'getHost'
        ]
        updata(needUpdataList)
      }
    })
  })
}

module.exports = create