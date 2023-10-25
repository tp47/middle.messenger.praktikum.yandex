import sinon from "sinon";
import chai from "chai";
import { EventBus } from ".";

const { expect } = chai;

describe("Event bus", () => {
  let eventBus: EventBus;

  beforeEach(() => {
    eventBus = new EventBus();
  });

  it("should call provided function on event", () => {
    const callbackStub = sinon.stub();
    eventBus.register("test", callbackStub);

    eventBus.dispatch("test");

    expect(callbackStub.calledOnce).to.be.true;
  });

  it("should not call provided function if event unregistered", () => {
    const callbackStub = sinon.stub();
    eventBus.register("test", callbackStub);
    eventBus.unregister("test", callbackStub);

    eventBus.dispatch("test");

    expect(callbackStub.called).to.be.false;
  });
});
