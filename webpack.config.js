const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const PRODUCTION = !!process.env.PRODUCTION;

const DEMOS = ['tfjs_wasm'];

module.exports = (env) => {
  const config = {
    mode: PRODUCTION ? 'production' : 'development',
    devtool: 'inline-source-map',
    devServer: {
      open: ['/'],
      host: '0.0.0.0',
      port: 8090,
      watchFiles: ['src/**/*'],
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      clean: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      ...DEMOS.map((d) => new HtmlWebpackPlugin({
        template: 'src/demos/draw/index.html',
        filename: `${d}_draw.html`,
        chunks: [`${d}_draw`],
      })),
      new HtmlWebpackPlugin({
        template: 'src/demos/draw/index.html',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {from: 'node_modules/@tensorflow/tfjs-backend-wasm/dist/*.wasm'},
          {from: 'node_modules/@handtracking.io/yoha/models/lan', to: 'lan/'},
          {from: 'node_modules/@handtracking.io/yoha/models/box', to: 'box/'},
        ]
      })
    ],
    optimization: {

    },
    module: {
      rules: [
        {
          test: /\.wasm$/i,
          type: 'javascript/auto',
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    entry: {
      ...DEMOS.map((d) => {
        const chunkName = `${d}_draw`;
        return {
          [chunkName]: {
            import: `./src/demos/draw/${d}_entry.ts`,
            filename: `${d}_draw.js`,
          }
        }
      }).reduce((cur, prev, index) => {return {...prev, ...cur};}, {})
    }
  };

  return [config];
}
