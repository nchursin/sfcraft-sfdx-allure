export interface Argument {
  string(): string;
}

abstract class BaseNamedArgument implements Argument {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  public string(): string {
    throw new Error("Method not implemented.");
  }

  protected argNameToPass() {
    return this.name.length === 1 ? `-${this.name}` : `--${this.name}`;
  }
}

export class NamedArgument extends BaseNamedArgument {
  private value: string;

  constructor(name: string, value: string) {
    super(name);
    this.value = value;
  }

  public string() {
    return `${this.argNameToPass()} ${this.value}`;
  }
}

export class NamelessArgument implements Argument {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  public string() {
    return this.value;
  }
}

export class Flag extends BaseNamedArgument {
  public string() {
    return `${this.argNameToPass()}`;
  }
}
