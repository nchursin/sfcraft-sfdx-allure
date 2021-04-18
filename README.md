sfdx-allure
===========

SFDX plugin to generate Allure reports

[![Version](https://img.shields.io/npm/v/sfdx-allure.svg)](https://npmjs.org/package/sfdx-allure)
[![CircleCI](https://circleci.com/gh/nchursin/sfdx-allure/tree/master.svg?style=shield)](https://circleci.com/gh/nchursin/sfdx-allure/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/nchursin/sfdx-allure?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/sfdx-allure/branch/master)
[![Codecov](https://codecov.io/gh/nchursin/sfdx-allure/branch/master/graph/badge.svg)](https://codecov.io/gh/nchursin/sfdx-allure)
[![Greenkeeper](https://badges.greenkeeper.io/nchursin/sfdx-allure.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/nchursin/sfdx-allure/badge.svg)](https://snyk.io/test/github/nchursin/sfdx-allure)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx-allure.svg)](https://npmjs.org/package/sfdx-allure)
[![License](https://img.shields.io/npm/l/sfdx-allure.svg)](https://github.com/nchursin/sfdx-allure/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g sfdx-allure
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
sfdx-allure/0.0.0 darwin-x64 node-v12.16.1
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx sfcraft:allure:apex:report -i <string> [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-sfcraftallureapexreport--i-string--o-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx sfcraft:allure:apex:report -i <string> [-o <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Generates allure report from Apex test run

```
Generates allure report from Apex test run

USAGE
  $ sfdx sfcraft:allure:apex:report -i <string> [-o <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --testrunid=testrunid                                                         (required) the ID of the test run

  -o, --outputdir=outputdir                                                         [default: sfallure] directory to
                                                                                    store test result files

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx sfcraft:allure:report -i 7070000000001
```

_See code: [lib/commands/sfcraft/allure/apex/report.js](https://github.com/nchursin/sfdx-allure/blob/v0.0.0/lib/commands/sfcraft/allure/apex/report.js)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
