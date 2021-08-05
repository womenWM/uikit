const path = require("path");
module.exports = {
  typescript: {
    reactDocgen: false
  },
  stories: ["../src/**/*.stories.js", "../src/**/*.stories.tsx"],

  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-actions",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null,
        inline: true
      }
    },
    "@storybook/preset-typescript",
    "@storybook/addon-links",
    // "@storybook/addon-storysource",
    {
      name: "@storybook/addon-storysource",
      options: {
        cssLoaderOptions: {
          modules: true,
          localIdentName: "[name]__[local]--[hash:base64:5]"
        }
      }
    }
  ],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [["react-app", { flow: false, typescript: true }]]
          }
        },
        {
          loader: require.resolve("react-docgen-typescript-loader"),
          options: {
            shouldExtractLiteralValuesFromEnum: true,
            propFilter: prop => {
              if (prop.parent) {
                const show = !prop.parent.fileName.includes("node_modules");
                return show;
              } else {
                return true;
              }
            }
          }
        }
      ]
    });
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp)$/,
      loader: 'file-loader',
    });
    config.resolve.extensions.push(".ts", ".tsx");
    Object.assign(config.resolve.alias,{
      '@': path.resolve(__dirname, '../src'),
    });
    return config;
  }
};
