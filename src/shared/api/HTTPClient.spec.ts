import { expect, use } from "chai";
import sinon from "sinon-chai";
import { createSandbox, SinonStub } from "sinon";
import { HTTPClient } from "./HTTPClient.ts";
import { it } from "mocha";

describe("HTTP transport", () => {
  use(sinon);
  const sandbox = createSandbox();
  let http: HTTPClient;
  let request: SinonStub<any>;

  beforeEach(() => {
    http = new HTTPClient("");
    request = sandbox
      .stub(http, "request" as keyof typeof http)
      .callsFake(() => Promise.resolve({}));
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should stringify query object for GET request where all parameters are strings", () => {
    http.get("", { data: { a: "1", b: "2" } });
    expect(request).calledWithMatch("?a=1&b=2", "GET");
  });
});
