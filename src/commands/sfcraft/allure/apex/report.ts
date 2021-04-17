// import { flags, SfdxCommand } from "@salesforce/command";
import { flags, SfdxCommand } from "@salesforce/command";
import { Messages } from "@salesforce/core";
import { AnyJson } from "@salesforce/ts-types";
import Report from "@salesforce/plugin-apex/lib/commands/force/apex/test/report";
// import Run from "@salesforce/plugin-apex/lib/commands/force/apex/test/run";

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages("sfdx-allure", "org");

export default class AllureReport extends SfdxCommand {
  public static description = messages.getMessage("commandDescription");

  protected static flagsConfig: any = {
    testrunid: flags.string({
      char: "i",
      description: "test run id",
    }),
  };

  // protected static flagsConfig: any = (() => {
  //   const srcConfig = Report.flagsConfig;
  //   delete srcConfig.json;
  //   delete srcConfig.resultformat;
  //   delete srcConfig.codecoverage;
  //   return srcConfig;
  // })();

  public static examples = [`$ sfdx sfcraft:allure:report -i 7070000000001`];

  public async run(): Promise<AnyJson> {
    const config: any = {};
    const reportCmd = new Report(["-i", this.flags.testrunid], config);
    // reportCmd.

    return reportCmd._run();
    // return {};
  }
}
