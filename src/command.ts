export interface Command {
  run(): Promise<unknown> | unknown;
}
