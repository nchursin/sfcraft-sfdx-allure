SFDX Allure
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
* [Install](#install)
* [Commands](#commands)
<!-- tocstop -->
  <!-- install -->
# Install

1. Install [SfAllure](https://github.com/nchursin/salesforce-allure-plugin)
1. `sfdx plugins:install @sfcraft/allure`
<!-- installstop -->

# Commands
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

_See code: [lib/commands/sfcraft/allure/apex/report.js](https://github.com/nchursin/sfdx-allure/blob/v0.1.0/lib/commands/sfcraft/allure/apex/report.js)_
<!-- commandsstop -->
