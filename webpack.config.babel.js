import path from 'path';

export default env => {
  return {
    entry: path.resolve(__dirname, 'src/main/js/index.js'),
    mode: env?.production ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
      ],
    },
    output: {
      filename: 'bundle.js',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist/'),
    },
    target: 'node',
  };
};
