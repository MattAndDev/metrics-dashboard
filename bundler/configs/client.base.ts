import merge from 'webpack-merge'
import { resolve } from 'path'
import baseConf from './base'
import * as webpack from 'webpack'
import { InjectManifest } from 'workbox-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import env from '@env'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
const hotMiddlewareScript = `webpack-hot-middleware/client?path=http://localhost:4141/__webpack_hmr`

const conf: webpack.Configuration = {
  context: resolve(process.cwd(), 'client'),
  target: 'web',
  entry: {
    'app.js': env.HMR_ENABLED
      ? [hotMiddlewareScript, './entry.tsx']
      : './entry.tsx'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/i,
        use: [
          env.HMR_ENABLED ? 'style-loader' : MiniCssExtractPlugin.loader,
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentContext: resolve(__dirname, 'client'),
                localIdentName: '[hash:base64]'
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './static',
          to: './static/'
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/styles.css'
    }),
    ...(!env.HMR_ENABLED
      ? [
          new InjectManifest({
            swSrc: './sw.ts'
          })
        ]
      : [
          new webpack.HotModuleReplacementPlugin({
            requestTimeout: 100
          }),
          new webpack.NoEmitOnErrorsPlugin()
        ])
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        asyncComponents: {
          chunks: 'async',
          test: /components/,
          enforce: true,
          name(module: { identifier: () => string }) {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight((item) => item)
            return `asyncComponents-${moduleFileName}`
          }
        },
        vendor: {
          name: 'lib.js',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        },
        ...(!env.DEV_SERVER && {
          styles: {
            name: 'styles',
            type: 'css/mini-extract',
            chunks: 'all',
            enforce: true
          }
        })
      }
    }
  },
  output: {
    filename: 'js/[name]',
    chunkFilename: 'js/[name]-[chunkhash].js',
    path: resolve(`./${env.OUT_DIR}/client`),
    publicPath: env.HMR_ENABLED ? 'http://localhost:4141/' : '/'
  }
}

export default merge(baseConf, conf)
