#! /usr/bin/env node
"use strict";

const program = require("commander");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk").default;

if (process.platform === "win32") {
  var rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on("SIGINT", function() {
    process.emit("SIGINT");
  });
}

process.on("SIGINT", function() {
  process.exit();
});

program
  .command("start")
  .description("start")
  .action(function() {
    require("../scripts/start");
  });

program
  .command("new [name]")
  .description("run setup commands for all envs")
  // .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action(function(name, options) {
    console.log("Creating a new app in " + path.resolve(process.cwd(), name));
    fs.ensureDirSync(name);
    fs.copySync(
      path.join(__dirname, "../new-source-files"),
      path.join(process.cwd(), name)
    );
    console.log(
      "Created app in " + chalk.blue(path.resolve(process.cwd(), name))
    );
    console.log("cd " + name);
    console.log("npm start");
    process.exit();
  });

program.parse(process.argv);
