var path = require('path');

var prodPath = 'lib';
var devPath = require('./devPath') || lib;

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, process.env.NODE_ENV === 'local' ? devPath : prodPath),
    filename: 'index.js',
    library: 'dropzone',
    libraryTarget: 'umd'// THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { compilerOptions: { outDir: path.join(__dirname, process.env.NODE_ENV === 'local' ? devPath : prodPath) } },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx']
  },
  externals: {
    'react': 'react', // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
    'react-dom': 'react-dom',
    'whatwg-fetch': 'whatwg-fetch',
  }
};