// import { ensureJsonMap, ensureString } from "@salesforce/ts-types";
import SfdxReport from "@salesforce/plugin-apex/lib/commands/force/apex/test/report";
import Report, {
  tempDirName,
} from "../../../../../src/commands/sfcraft/allure/apex/report";
import { expect } from "chai";
import { SinonSpy, createSandbox } from "sinon";
import { SfdxCommand } from "@salesforce/command";
import * as rimraf from "rimraf";

describe("sfcraft:allure:apex:report", () => {
  let commandUnderTest;
  const config: any = {};

  const sfdxReportMock: SfdxReport = new SfdxReport([], config);

  const defaultArgs = "-i testRunId";

  const asSpy = (fun) => fun as SinonSpy;

  const runCommand = (cmd: SfdxCommand, args = defaultArgs) => {
    cmd.argv = args.split(" ");
    return cmd._run();
  };

  const sandbox = createSandbox();

  beforeEach(() => {
    commandUnderTest = new Report([], config);
    (commandUnderTest as any).reportCmd = sfdxReportMock;
    sfdxReportMock.run = sandbox.spy();
    sandbox.spy(rimraf, "sync");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("calls force:apex:test:report to get report", async () => {
    const testRunId = "7070000000001";

    await runCommand(commandUnderTest, `-i ${testRunId}`);

    expect((sfdxReportMock as any).flags).to.contain({
      testrunid: testRunId,
    });
    expect(asSpy(sfdxReportMock.run).called).to.be.true;
  });

  it("stores force:apex:test:report results in sfcraft-allure-tmp folder", async () => {
    await runCommand(commandUnderTest);
    expect((sfdxReportMock as any).flags).to.contain({
      outputdir: tempDirName,
    });
  });

  it("removes sfcraft-allure-tmp after execution", async () => {
    await runCommand(commandUnderTest);

    expect(asSpy(rimraf.sync).called).to.be.true;
    expect(asSpy(rimraf.sync).calledWith(tempDirName)).to.be.true;
    expect(asSpy(rimraf.sync).calledAfter(asSpy(sfdxReportMock.run))).to.be
      .true;
  });
});
