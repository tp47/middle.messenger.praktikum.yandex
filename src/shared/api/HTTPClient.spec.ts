import sinon from "sinon";
import { HTTPClient } from ".";
import chai from "chai";

const { expect } = chai;

describe("HTTP client", () => {
  let http: HTTPClient;
  let requestStub: sinon.SinonStub<any>;

  const base = "https://ya-praktikum.tech/api/v2";

  beforeEach(() => {
    http = new HTTPClient("");
    requestStub = sinon.stub(http, "request").resolves();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should stringify parameters object", async () => {
    const expectedURL = base.concat("?a=1&b=2");

    await http.get("", {
      data: {
        a: "1",
        b: "2",
      },
    });

    expect(requestStub.calledWithMatch(expectedURL, { method: "GET" })).equal(
      true,
    );
  });

  it("should stringify query object for GET request where parameters are strings and numbers", async () => {
    const expectedURL = base.concat("?a=1&b=string");
    await http.get("", { data: { a: 1, b: "string" } });

    expect(requestStub.calledWithMatch(expectedURL, { method: "GET" })).equal(
      true,
    );
  });

  it("should encode characters for query", async () => {
    const expectedURL = base.concat("?a=1%2B2&b=2%202");
    await http.get("", { data: { a: "1+2", b: "2 2" } });

    expect(requestStub.calledWithMatch(expectedURL, { method: "GET" })).equal(
      true,
    );
  });

  it("should encode special characters for query", async () => {
    const expectedURL = base.concat("?a=1%3D2%261");
    await http.get("", { data: { a: "1=2&1" } });

    expect(requestStub.calledWithMatch(expectedURL, { method: "GET" })).equal(
      true,
    );
  });

  it("should encode special characters in parameter name for GET query", async () => {
    const expectedURL = base.concat("?a%3Dx%264=q%3Dw%26e");
    await http.get("", { data: { "a=x&4": "q=w&e" } });

    expect(requestStub.calledWithMatch(expectedURL, { method: "GET" })).equal(
      true,
    );
  });
});
