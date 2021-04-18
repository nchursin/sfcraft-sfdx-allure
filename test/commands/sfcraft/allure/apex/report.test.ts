// import { ensureJsonMap, ensureString } from "@salesforce/ts-types";
import SfdxReport from "@salesforce/plugin-apex/lib/commands/force/apex/test/report";
import Report, {
  tempDirName,
} from "../../../../../src/commands/sfcraft/allure/apex/report";
import * as chai from "chai";
import { expect } from "chai";
import * as sinonChai from "sinon-chai";
import { SinonSpy, createSandbox, match } from "sinon";
import { SfdxCommand } from "@salesforce/command";
import * as cmd from "node-run-cmd";
import * as rimraf from "rimraf";
import * as fs from "fs";

chai.should();
chai.use(sinonChai);

const flushPromises = () => new Promise((resolve) => setImmediate(resolve));

let commandUnderTest;
const config: any = {};

const sfdxReportMock: SfdxReport = new SfdxReport([], config);

const testRunId = "testRunId";
const defaultArgs = `-i ${testRunId}`;

const asSpy = (fun) => fun as SinonSpy;

const runCommand = (cmd: SfdxCommand, args = defaultArgs) => {
  cmd.argv = args.split(" ");
  return cmd._run();
};

const sandbox = createSandbox();

describe("sfcraft:allure:apex:report", () => {
  beforeEach(() => {
    commandUnderTest = new Report([], config);
    (commandUnderTest as any).reportCmd = sfdxReportMock;
    sfdxReportMock.run = sandbox.stub();
    sandbox.stub(rimraf, "sync");
    sandbox.stub(fs, "renameSync");
    sandbox.stub(cmd, "run");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("calls force:apex:test:report to get report", async () => {
    const testRunId = "7070000000001";

    await runCommand(commandUnderTest, `-i ${testRunId}`);

    asSpy(sfdxReportMock.run).should.have.been.called;
    expect((sfdxReportMock as any).flags).to.contain({
      testrunid: testRunId,
    });
  });

  it("stores force:apex:test:report results in sfcraft-allure-tmp folder", async () => {
    await runCommand(commandUnderTest);
    expect((sfdxReportMock as any).flags).to.contain({
      outputdir: tempDirName,
    });
  });

  it("stores force:apex:test:report results as json with coverage", async () => {
    await runCommand(commandUnderTest);
    expect((sfdxReportMock as any).flags).to.contain({
      json: true,
      codecoverage: true,
    });
  });

  it("removes sfcraft-allure-tmp after execution", async () => {
    await runCommand(commandUnderTest);

    asSpy(rimraf.sync).should.have.been.calledOnce;
    asSpy(rimraf.sync).should.have.been.calledWith(tempDirName);
    await flushPromises();
  });

  it(`moves ${tempDirName}/test-result-${testRunId}.json to ${tempDirName}/test-results.json`, async () => {
    await runCommand(commandUnderTest);

    asSpy(fs.renameSync).should.have.been.calledWith(
      `${tempDirName}/test-result-${testRunId}.json`,
      `${tempDirName}/test-results.json`
    );
    asSpy(fs.renameSync).should.have.been.calledAfter(
      asSpy(sfdxReportMock.run)
    );
    asSpy(fs.renameSync).should.have.been.calledBefore(asSpy(rimraf.sync));
  });

  it(`launches allure on ${tempDirName}`, async () => {
    await runCommand(commandUnderTest);

    asSpy(cmd.run)
      .should.have.been.calledOnce.calledWithMatch(
        match(`allure generate ${tempDirName}`)
      )
      .calledAfter(asSpy(fs.renameSync))
      .calledBefore(asSpy(rimraf.sync));
  });

  it("outputs allure files to outputdir", async () => {
    const outputDir = "allureDir";
    await runCommand(commandUnderTest, `${defaultArgs} -o ${outputDir}`);

    asSpy(cmd.run).should.have.been.calledWithMatch((value: string) =>
      value.includes(`-o ${outputDir}`)
    );
  });

  it("does not change force:apex:test:report when output dir is specified", async () => {
    const outputDir = "allureDir";
    await runCommand(commandUnderTest, `${defaultArgs} -o ${outputDir}`);

    expect((sfdxReportMock as any).flags).to.contain({
      outputdir: tempDirName,
    });
  });

  it("defaults output to 'sfallure' folder", async () => {
    await runCommand(commandUnderTest);

    const defaultOutputDir = "sfallure";
    await runCommand(commandUnderTest);

    asSpy(cmd.run).should.have.been.calledWithMatch((value: string) =>
      value.includes(`-o ${defaultOutputDir}`)
    );
  });

  it("verifies allure installtion before anything else", async () => {
    // throw error
    await runCommand(commandUnderTest);
  });
});
