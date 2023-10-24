import sinon from "sinon";
import { HTTPClient } from ".";
import chai from "chai";

const { expect } = chai;

describe("HTTP client", () => {
  let http: HTTPClient;
  let request: sinon.SinonStub<any>;

  beforeEach(() => {
    http = new HTTPClient("");
    request = sinon.stub(http, "request").resolves();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should stringify parameters object", async () => {
    await http.get("", {
      data: {
        a: "1",
        b: "2",
      },
    });

    const expectedURL = `https://ya-praktikum.tech/api/v2/?a=1&b=2`;

    expect(request.calledWithMatch(expectedURL, "GET")).to.be.true;
  });
});
