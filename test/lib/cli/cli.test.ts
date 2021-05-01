import * as chai from "chai";
import * as sinonChai from "sinon-chai";
import * as chaiAsPromised from "chai-as-promised";
import { SinonSpy, createSandbox } from "sinon";

import * as cp from "child_process";

import { Command, NamedArgument } from "@src/lib/cli";

chai.use(chaiAsPromised);
chai.should();
chai.use(sinonChai);

const asSpy = (fun: Function) => fun as SinonSpy;

describe("Command", () => {
  const sandbox = createSandbox();

  beforeEach(() => {
    sandbox.stub(cp, "exec").callsArg(1);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("calls command received by constructor", async () => {
    const command = new Command("ls");

    await command.run();

    asSpy(cp.exec).should.have.been.calledWith("ls");
  });

  it("executes command with arguments", async () => {
    const commandString = "allure";
    const args = [new NamedArgument("outputdir", "folderPath")];
    const command = new Command(commandString, args);

    await command.run();

    asSpy(cp.exec).should.have.been.calledWith(
      `${commandString} ${args.map((arg) => arg.string()).join(" ")}`
    );
  });
});
