#!/usr/bin/env node
const program = require("commander");
const { create } = require("../libs/create/index");
const { install } = require("../libs/install/index");
// version
program.version(require("../package.json").version);
//regist command create,install
create();
install();
// parser arg
program.parse(process.argv);
