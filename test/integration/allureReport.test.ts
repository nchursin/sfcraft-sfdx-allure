import SfdxReport from "@salesforce/plugin-apex/lib/commands/force/apex/test/report";
import Report, { tempDirName } from "@src/commands/sfcraft/allure/apex/report";
import * as chai from "chai";
// import { expect } from "chai";
import * as sinonChai from "sinon-chai";
import * as chaiAsPromised from "chai-as-promised";
import { createSandbox } from "sinon";
import * as fs from "fs";
import * as fse from "fs-extra";
import * as path from "path";
import * as os from "os";
import { SfdxCommand } from "@salesforce/command";
import * as rimraf from "rimraf";

chai.use(chaiAsPromised);
chai.should();
chai.use(sinonChai);

// tslint:disable-next-line: no-string-based-set-immediate
// const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

let commandUnderTest;
const config: any = {};

const sfdxReportMock: SfdxReport = new SfdxReport([], config);

const testRunId = "testRunId";
const defaultArgs = `-i ${testRunId} -u username@test.com`;

const runCommand = (command: SfdxCommand, args = defaultArgs) => {
  command.argv = args.split(" ");
  return command._run();
};

const { todo } = test;

describe("sfcraft:allure:apex:report (integration tested)", () => {
  const sandbox = createSandbox();

  const testRunDirBasePath = path.join(os.tmpdir(), "test-run");
  let testRunDir: string;
  let outputTestDir: string;

  beforeAll(async () => {
    testRunDir = await fs.promises.mkdtemp(testRunDirBasePath);

    outputTestDir = path.join(testRunDir, "test", "data", "sfallure");
    commandUnderTest = new Report([], config);
    (commandUnderTest as any).reportCmd = sfdxReportMock;

    sandbox.stub(sfdxReportMock as any, "assignOrg");
    sandbox.stub(commandUnderTest, "assignOrg");

    sfdxReportMock.run = async (): Promise<any> => {
      await fs.promises.mkdir(tempDirName);
      await fse.copy(
        path.join(".", "test", "data", "sfallure-apex-test-results"),
        path.join(".", tempDirName)
      );
      return {};
    };

    // sandbox.stub(cmd, "run");
    // (cmd.run as SinonStub).withArgs("allure").returns([0]);
  });

  // it("integration", async () => {
  //   await runCommand(commandUnderTest, `-i TEST_RUN_ID -o ${outputTestDir}`);
  // });

  todo("integration");

  afterAll(() => {
    rimraf.sync(testRunDir);
  });
});
