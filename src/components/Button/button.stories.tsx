import React from "react";
import { action } from "@storybook/addon-actions";

import Button from "./button";
import "../../styles/index.scss";

export default {
  title: "@demo/Button",
  component: Button,
  parameters: {}
};

export const DefaultButton = () => (
  <Button onClick={action("clicked")}>Hello Button</Button>
);

export const ButtonWithSize = () => (
  <>
    <Button onClick={action("clicked")} size="sm">
      Small
    </Button>
    <Button onClick={action("clicked")} size="lg">
      Large
    </Button>
  </>
);

export const ButtonWithType = () => (
  <>
    <Button onClick={action("clicked")}>Default</Button>
    <Button onClick={action("clicked")} btnType="primary">
      Primary
    </Button>
    <Button onClick={action("clicked")} btnType="danger">
      Danger
    </Button>
    <Button
      onClick={action("clicked")}
      btnType="link"
      target="_blank"
      href="https://www.baidu.com"
    >
      Link
    </Button>
  </>
);
