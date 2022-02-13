#! /usr/bin/env node
const { promisify } = require("util");
const ora = require("ora");
module.exports.clone = async function (repo, desc) {
  const download = promisify(require("download-git-repo"));
  const process = ora(`正在下载....${repo}`);
  process.start();
  try {
    await download(repo, desc, { clone: true });
  } catch (err) {
    //    console.log(err)
  }
  process.succeed();
};
