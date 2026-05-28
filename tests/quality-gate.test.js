import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("quality gate scripts are defined", async () => {
  const pkgRaw = await readFile(new URL("../package.json", import.meta.url), "utf8");
  const pkg = JSON.parse(pkgRaw);

  assert.equal(typeof pkg.scripts.lint, "string");
  assert.equal(typeof pkg.scripts["test:unit"], "string");
  assert.equal(typeof pkg.scripts.build, "string");
});
