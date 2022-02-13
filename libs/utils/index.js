const fs = require("fs");
const cmd = require("node-cmd");
function hasInstallGit() {
  try {
    var test = execSync("git rev-parse --is-inside-work-tree", {
      encoding: "utf8",
    });
  } catch (e) {}
  return !!test;
}
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
async function writeSomeTemFile() {
  const commitlintConfig = require("../../templates/commitlint.config");
  const huskyConfig = require("../../templates/huskyrc");
  const eslintConfig = require("../../templates/eslintrc");
  const prettier = require("../../templates/prettier.config");
  const commitlint = require("../../templates/commitlintrc");
  const templateMap = [
    {
      fileContent: JSON.stringify(huskyConfig),
      path: ".huskyrc",
    },
    {
      fileContent: JSON.stringify(commitlintConfig),
      path: "commitlint.config.js",
    },
    {
      fileContent: JSON.stringify(prettier),
      path: "prettier.config.js",
    },
    {
      fileContent: JSON.stringify(eslintConfig),
      path: ".eslintrc.js",
    },
    {
      fileContent: JSON.stringify(commitlint),
      path: ".commitlintrc.js",
    },
  ];
  for (let i = 0; i < templateMap.length; i++) {
    const current = templateMap[i];
    const path = `${process.cwd()}/${current["path"]}`;
    fs.writeFile(
      path,
      current["path"] == ".huskyrc"
        ? `${current["fileContent"]}`
        : `module.exports = ${current["fileContent"]}`,
      function (err) {
        if (err) {
          return console.error(err);
        } else {
          cmd.run(`prettier --write ${path}`);
        }
      }
    );
  }
  fs.readFile("package.json", "utf8", (err, data) => {
    if (err) {
      console.log("err", err);
      return;
    }
    let obj = JSON.parse(data) || {};
    obj["lint-staged"] = {
      "src/**/*.{js,json,css,vue}": [
        "prettier --write",
        "eslint --fix",
        "git add",
      ],
    };
    fs.writeFile("package.json", JSON.stringify(obj), "utf8", function (err) {
      if (err) {
        return console.error(err);
      } else {
        cmd.run(`prettier --write package.json`);
      }
    });
  });
}
module.exports = {
  hasInstallGit,
  writeSomeTemFile,
  spawn,
};
