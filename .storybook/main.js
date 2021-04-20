const LWCWebpackPlugin = require('lwc-webpack-plugin');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-links",
    "@storybook/addon-controls",
    '@storybook/addon-a11y',
    "@storybook/addon-essentials"
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    // Override default rules, prevents issues related to loading CSS files.
    
    config.plugins.push(
      new LWCWebpackPlugin()
    );

    config.module.rules = config.module.rules.filter(
      f => f.test.toString() !== '/\\.css$/'
    );   
    
    return config;
  }
};

/* 
config.plugins.push(
        new LWCWebpackPlugin({
            namespace: {
                // LWC Namespace with path
                lightning: path.resolve('./src/lightning'),
                c: path.resolve('./src/c'),
            },
            modules: [
                "@salesforce-ux/design-system"
            ]
        })
    );
    config.module.rules = [{
        test: /\.stories\.js$/,
        loaders: [require.resolve('@storybook/addon-storysource/loader')],
        enforce: 'pre',
    },
    {
        test: /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/,
        loader: 'file-loader/dist/cjs.js',
        query: { name: 'static/media/[name].[hash:8].[ext]' }
    }];
    
 */
//'@storybook/preset-create-react-app',
