import path from 'path'
import webpack from 'webpack'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'

const outputDir = path.resolve(__dirname, 'dist')

export default function (env, argv) {
  const isProductionMode = argv.mode === 'production'
  return {
    target: 'node',
    entry: {
      'app': [
        './src/index.js'
      ]
    },
    output: {
      filename: isProductionMode ? 'bundle.[chunkhash].js' : 'tempar.js',
      path: outputDir,
      libraryTarget: 'umd'
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, './src')],
        use: isProductionMode
          ? ['babel-loader']
          : [{
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }]
      }]
    },
    resolve: {
      modules: [
        'node_modules',
        path.resolve(__dirname, 'src')
      ]
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: isProductionMode ? 'production' : 'development'
      }),
      new webpack.NamedModulesPlugin(),
      isProductionMode && new UglifyJSPlugin({
        parallel: true,
        sourceMap: true
      })
    ].filter(plugin => plugin),
    devtool: isProductionMode ? 'source-map' : 'cheap-module-eval-source-map'
  }
}