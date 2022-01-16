#!/usr/bin/env node
const program = require("commander");
const download = require("download-git-repo");
const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const { clone } = require("./download");
const clear = require("clear");
const chalk = require("chalk");
const log = (content) => console.log(chalk.green(content));
// const { clone } = require("./download");
const open = require("open");
const { resolve } = require("path");
// 版本信息
program.version(require("../package.json").version);

// 帮助信息
program.option("-F, --framework", "指定创建项目的框架，目前支持vue，react");
const spawn = async (...args) => {
  const { spawn } = require("child_process");
  return new Promise((resolve) => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("close", () => {
      resolve();
    });
  });
};
// 创建指令
program
  .command("create <projectName>")
  .description("指令描述")
  .option("-vue", "选项描述")
  .option("-react", "选项描述") // option 可有多个
  .action(async (name, option) => {
    /*
    执行指令的回调方法
    projectName：对应创建的项目名
    option：对应上面设置的指令的选项（它是一个对象，如命令写有多个option，则对象中会增加属性，如果写了未定义的option，命令行会报错提示“未知选项”）
    注意：option设置的时候是 "-vue"下面拿到的是"Vue"、"--vue"回调拿到的是"vue"，我为了cli工具使用方便则用了一个"-"的
  */
    // 这里如果用户写多个选项只会生效第一个选项
    const type = Object.keys(option)[0];
    switch (type) {
      case "Vue":
        console.log("创建vue项目");
        break;
      case "React":
        clear();
        const data = await figlet("welcome to wjk app ");
        log(data);
        clone;
        log(`🛴 创建项目`);
        //https://github.com/1623311678/react-project-template.git
        await clone(
          "direct:https://github.com/1623311678/react-project-template.git/#master",
          name
        );
        //自动安装依赖
        log("🛵 正在安装依赖中......");
        await spawn("npm", ["install"], { cwd: `./${name}` });
        log(`
        🥳  安装完成：
        快去把项目跑起来吧~：
        =========================================
        cd ${name}
        npm run start
        =========================================
            `);
        break;
      default:
        console.log("未知选项");
    }
  });

// 解析指令
program.parse(process.argv);
