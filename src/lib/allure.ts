import { CLICommand, Flag, NamedArgument, NamelessArgument } from "@lib/cli";
import { exec } from "child_process";

interface AllureReportOptions {
  target: string;
  outputDir: string;
}

const ALLURE_APP_COMMAND = "allure";

export class AllureReport {
  private targetDir: string;
  private outputDir: string;

  constructor(options: AllureReportOptions) {
    this.targetDir = options.target;
    this.outputDir = options.outputDir;
  }

  public async generate() {
    try {
      await new CLICommand(ALLURE_APP_COMMAND, [new Flag("version")]).run();
    } catch (error) {
      throw new Error(
        "Allure seems to be missing in the system. Please make sure Allure CLI is installed"
      );
    }

    return new CLICommand(ALLURE_APP_COMMAND, [
      new NamelessArgument("generate"),
      new NamelessArgument(this.targetDir),
      new NamedArgument("o", this.outputDir),
    ]).run();
  }
}
