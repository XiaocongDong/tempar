const serverSideConfig = {
  target: 'node',
  entry: {
    tempar: './src/index.js'
  },
  output: {
    filename: 'tempar.node.js',
    path: __dirname + '/dist',
    libraryTarget: 'umd'
  }
}

const clientSideConfig = {
  target: 'web',
  entry: {
    tempar: './src/index.js'
  },
  output: {
    filename: 'tempar.browser.js',
    path: __dirname + '/dist',
    libraryTarget: 'umd'
  }
}

module.exports = [serverSideConfig, clientSideConfig]
