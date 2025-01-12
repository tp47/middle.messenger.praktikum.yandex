import { Component } from "@/shared/model";
import { SideButtonProps } from "./sideButton.types";
import arrowIcon from "@/assets/arrow.svg";
import styles from "./sideButton.module.css";

class SideButton extends Component {
  constructor(props: SideButtonProps) {
    super({
      ...props,
      events: {
        click: (event: MouseEvent) => {
          event.preventDefault();

          if (props.to) {
            window.router.go(props.to);
          }
        },
      },
    });
  }

  protected render() {
    const { to } = this.props;
    return `
      <a class="${styles.sideButton}" href="${to}">
        <img src="${arrowIcon}" />
      </a>
    `;
  }
}

export { SideButton };
