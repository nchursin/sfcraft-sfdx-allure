// import { flags, SfdxCommand } from "@salesforce/command";
import { FlagsConfig, SfdxCommand } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import { AnyJson } from "@salesforce/ts-types";
import SfdxReport from "@salesforce/plugin-apex/lib/commands/force/apex/test/report";
import * as rimraf from "rimraf";
import * as fs from "fs";
import * as cmd from "node-run-cmd";

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages("@sfcraft/allure", "apex-report");

export const tempDirName = "sfcraft-allure-tmp";

export default class AllureReport extends SfdxCommand {
  public static readonly description = messages.getMessage(
    "commandDescription"
  );
  public static examples = [`$ sfdx sfcraft:allure:report -i 7070000000001`];

  protected static flagsConfig: FlagsConfig = {
    testrunid: (SfdxReport as any).flagsConfig.testrunid,
    outputdir: {
      ...(SfdxReport as any).flagsConfig.outputdir,
      char: "o",
      default: "sfallure",
    },
  };

  protected sfdxReportConfig: any = {};
  protected reportCmd = new SfdxReport([], this.sfdxReportConfig);

  public async run(): Promise<AnyJson> {
    const [error] = await cmd.run("allure --version");
    if (error) {
      throw new Error("Allure not found. Please verify allure installation");
    }

    rimraf.sync(this.flags.outputdir);

    this.reportCmd.argv = [
      "-i",
      this.flags.testrunid,
      "--outputdir",
      tempDirName,
      "-r",
      "human",
      "-c",
      "--loglevel",
      "fatal",
    ];

    await this.reportCmd._run();

    fs.renameSync(
      `${tempDirName}/test-result-${this.flags.testrunid}.json`,
      `${tempDirName}/sf-test-results.json`
    );

    await cmd.run(`allure generate ${tempDirName} -o ${this.flags.outputdir}`);

    rimraf.sync(tempDirName);

    return;
  }
}
