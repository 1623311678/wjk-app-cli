const program = require("commander");
const chalk = require("chalk");
const cmd = require("node-cmd");
const log = (content) => console.log(chalk.green(content));
const logWarn = (content) => console.log(chalk.yellow(content));
const { hasInstallGit, writeSomeTemFile, spawn } = require("../utils/index");
const inquirer = require("inquirer");
function installCodelint() {
  program
    .command("install <packageName>")
    .description(
      "install some package eg:wjk-app install codelint,it will help you config eslint/tslint,commitlint,prettier,husky,and so on."
    )
    .action(async (name, option) => {
      //codelint
      //only support vue eslint at now .
      //TODO support tslint ,react
      const res = await inquirer.prompt([
        {
          type: "list",
          name: "type",
          message: "What is your technology stack? Vue or React",
          choices: ["Vue", "React"],
        },
        {
          type: "list",
          name: "lintType",
          message: "select lint ? Eslint or Tslint",
          choices: ["Eslint", "Tslint"],
        },
      ]);
      const type = res["type"];
      const lintType = res["lintType"];
      if (type === "React") {
        logWarn("the codelint in React can not use now,please select Vue");
        return;
      }
      if (lintType === "Tslint") {
        logWarn("the codelint in Tslint can not use now,please select Eslint");
        return;
      }
      switch (name) {
        case "codelint": {
          if (!hasInstallGit()) {
            log("🛵 git init......");
            await spawn("git", ["init"], { cwd: `./` });
            log("🛵 git　init success, has generate .git file");
            cmd.run(`npm install prettier -g`);
            log("🛵 write some files......");
            await writeSomeTemFile();
            log("🛵 write success");
            cmd.run(
              "npm install -D prettier husky@4.3.8 lint-staged eslint-config-prettier eslint-plugin-prettier @commitlint/config-conventional @commitlint/cli"
            );
            log(
              "🐯 install some package,this will take a minutes,please waiting ......🐯"
            );
          }
          break;
        }
      }
    });
}
module.exports = {
  installCodelint,
};
