import { addParameters } from "@storybook/react";
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks";

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage
  }
});


import 'antd/dist/antd.css';

// export const parameters = {
//     actions: { argTypesRegex: '^on[A-Z].*' },
// };
