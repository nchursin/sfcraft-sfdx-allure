import * as cp from "child_process";

import { Argument } from "./arguments";

const execPromise = (command: string) =>
  new Promise((resolve, reject) =>
    cp.exec(command, (err: any, stdout: unknown) => {
      if (err) {
        return reject(err);
      }
      return resolve(stdout);
    })
  );

export class Command {
  private command: string;
  private args: Argument[];

  constructor(command: string, args?: Argument[]) {
    this.command = command;
    this.args = args;
  }

  public run() {
    return execPromise(`${this.command} ${this.argsAsString()}`.trim());
  }

  private argsAsString() {
    return (
      (this.args && this.args.map((arg: Argument) => arg.string()).join(" ")) ||
      ""
    );
  }
}

export { NamedArgument, Flag, NamelessArgument } from "./arguments";
