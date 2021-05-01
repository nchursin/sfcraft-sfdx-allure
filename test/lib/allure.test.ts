import * as chai from "chai";
import { expect } from "chai";
import * as sinonChai from "sinon-chai";
import * as chaiAsPromised from "chai-as-promised";
import { createSandbox, SinonSpy, SinonStub } from "sinon";

import * as cp from "child_process";
import { CLICommand } from "@lib/cli";

import { AllureReport } from "@lib/allure";

chai.use(chaiAsPromised);
chai.should();
chai.use(sinonChai);

const { todo } = test;

const asSpy = (fun: Function) => fun as SinonSpy;
const asStub = (fun: Function) => fun as SinonStub;

describe("Allure API", () => {
  const sandbox = createSandbox();

  beforeEach(async () => {
    sandbox.stub(cp, "exec").callsArg(1);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("calls CLI to generate report", async () => {
    await new AllureReport({
      target: "target",
      outputDir: "output",
    }).generate();

    asSpy(cp.exec).lastCall.should.have.been.calledWith(
      "allure generate target -o output"
    );
  });

  it("throws if allure CLI not found", async () => {
    asStub(cp.exec).callsArgWith(
      1,
      new Error(`
      Command failed: allure --version
      /bin/sh: allure: command not found`)
    );

    await new AllureReport({
      target: "target",
      outputDir: "output",
    })
      .generate()
      .should.be.rejectedWith(
        "Allure seems to be missing in the system. Please make sure Allure CLI is installed"
      );

    asSpy(cp.exec).should.have.been.calledWith("allure --version");
  });
});
