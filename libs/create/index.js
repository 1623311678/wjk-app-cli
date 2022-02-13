const program = require("commander");
const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const { clone } = require("./download");
const clear = require("clear");
const chalk = require("chalk");
const log = (content) => console.log(chalk.green(content));
const { spawn } = require("../utils/index");
const inquirer = require("inquirer");
// create Vue or React project command
async function dowloadTemplate(type, name) {
  //download form git
  let temUrl = "";
  switch (type) {
    case "Vue":
      {
        temUrl =
          "direct:https://github.com/1623311678/vue-project-template.git/#master";
      }
      break;
    case "React":
      {
        temUrl =
          "direct:https://github.com/1623311678/react-project-template.git/#master";
      }
      break;
    default:
      console.log("未知选项");
  }
  // clear();
  const data = await figlet("welcome to wjk app ");
  log(data);
  log(`🛴 创建项目`);
  await clone(temUrl, name);
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
}
function create() {
  program
    .command("create <projectName>")
    .description("create vue or react project eg:wjk-app create my-app")
    .action(async (name, option) => {
      //dowload the Vue or React template
      //TODO language options ts or js
      const res = await inquirer.prompt([
        {
          type: "list",
          name: "type",
          message: "What do you want to use? Vue or React",
          choices: ["Vue", "React"],
        },
        {
          type: "list",
          name: "language",
          message: "use typescript?",
          choices: ["Yes", "No"],
        },
      ]);
      await dowloadTemplate(res["type"], name);
    });
}
module.exports = {
  create,
};
