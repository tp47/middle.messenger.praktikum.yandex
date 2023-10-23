import { expect } from "chai";
import { Component } from ".";

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

  it("should create component with provided props", () => {
    const text = "hello";
    const pageComponent = new PageClass({ text });
    const spanText =
      pageComponent.element?.querySelector("#test-text")?.innerHTML;
    expect(spanText).to.be.equal(text);
  });
});
