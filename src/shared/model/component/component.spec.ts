import { Component } from ".";
import chai from "chai";
import sinon from "sinon";
const { expect } = chai;

interface Props {
  text?: string;
  events?: Record<string, () => void>;
}

describe("Component", () => {
  let PageClass: typeof Component;

  beforeEach(() => {
    class Page extends Component {
      constructor(props: Props) {
        super({
          ...props,
        });
      }

      protected render(): string {
        return `
          <div>
            <span id="test-id">{{text}}</span>
            <button>{{text-button}}</button>
          </div>
        `;
      }
    }

    PageClass = Page;
  });

  it("should be rendered with provided props", () => {
    const text = "hello";
    const pageComponent = new PageClass({ text });

    const spanText =
      pageComponent.element?.querySelector("#test-id")?.innerHTML;
    expect(spanText).to.be.equal(text);
  });

  it("should hide on hide method", () => {
    const pageComponent = new PageClass({});

    pageComponent.hide();

    expect(pageComponent.getContent().style.display).equal("none");
  });

  it("should show after being hidden and shown", () => {
    const pageComponent = new PageClass({});

    pageComponent.hide();
    pageComponent.show();

    expect(pageComponent.getContent().style.display).equal("flex");
  });

  it("should be reactive", () => {
    const text = "new value";
    const pageComponent = new PageClass({ text: "Hello" });

    pageComponent.setProps({ text });

    const spanText =
      pageComponent.element?.querySelector("#test-id")?.innerHTML;
    expect(spanText).to.be.equal(text);
  });

  it("should set events on element", () => {
    const handlerStub = sinon.stub();
    const pageComponent = new PageClass({
      events: {
        click: handlerStub,
      },
    });

    const event = new MouseEvent("click");
    pageComponent.element?.dispatchEvent(event);

    expect(handlerStub.calledOnce).to.be.true;
  });
});
