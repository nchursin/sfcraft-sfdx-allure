import { expect } from "chai";
import { NamedArgument, Flag, NamelessArgument } from "@src/lib/cli";

describe("Arguments", () => {
  it("generates argument line", () => {
    expect(new NamedArgument("outputdir", "folder/path").string()).to.equal(
      "--outputdir folder/path"
    );
  });

  it("generates argument name with single char correctly", () => {
    expect(new NamedArgument("o", "folder/path").string()).to.equal(
      "-o folder/path"
    );
  });

  it("generates argument line without value", () => {
    expect(new Flag("o").string()).to.equal("-o");
  });

  it("generates argument line without value", () => {
    expect(new Flag("o").string()).to.equal("-o");
  });

  it("generates nameless argument", () => {
    expect(new NamelessArgument("path/to/file").string()).to.equal(
      "path/to/file"
    );
  });
});
