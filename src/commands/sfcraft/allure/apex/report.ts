// import { flags, SfdxCommand } from "@salesforce/command";
import { SfdxCommand } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import { AnyJson } from "@salesforce/ts-types";
import SfdxReport from "@salesforce/plugin-apex/lib/commands/force/apex/test/report";
import * as rimraf from "rimraf";
// import Run from "@salesforce/plugin-apex/lib/commands/force/apex/test/run";

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages("sfdx-allure", "org");

export const tempDirName = "sfcraft-allure-tmp";

export default class AllureReport extends SfdxCommand {
  public static readonly description = messages.getMessage(
    "commandDescription"
  );

  protected sfdxReportConfig: any = {};
  protected reportCmd = new SfdxReport([], this.sfdxReportConfig);

  protected static flagsConfig: any = {
    testrunid: (SfdxReport as any).flagsConfig.testrunid,
    outputdir: (SfdxReport as any).flagsConfig.outputdir,
  };

  public static examples = [`$ sfdx sfcraft:allure:report -i 7070000000001`];

  public async run(): Promise<AnyJson> {
    this.reportCmd.argv = [
      "-i",
      this.flags.testrunid,
      "--outputdir",
      "sfcraft-allure-tmp",
    ];

    await this.reportCmd._run();

    rimraf.sync("sfcraft-allure-tmp");
    return;
  }
}
