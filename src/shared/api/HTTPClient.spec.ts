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

  it("should stringify query object for GET request where parameters are strings and numbers", () => {
    http.get("", { data: { a: 1, b: "string" } });

    expect(request).calledWithMatch("?a=1&b=string", "GET");
  });

  it("should encode characters for query", () => {
    http.get("", { data: { a: "1+2", b: "2 2" } });

    expect(request).calledWithMatch("?a=1%2B2&b=2%202", "GET");
  });

  it("should encode special characters for query", () => {
    http.get("", { data: { a: "1=2&1" } });

    expect(request).calledWithMatch("?a=1%3D2%261", "GET");
  });

  it("should encode special characters in parameter name for GET query", () => {
    http.get("", { data: { "a=x&4": "q=w&e" } });

    expect(request).calledWithMatch("?a%3Dx%264=q%3Dw%26e", "GET");
  });
});
