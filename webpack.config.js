const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin: CleanPlugin} = require('clean-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const OptimizeJSPlugin = require('terser-webpack-plugin');
const CssPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (!isDev) {
    config.minimizer = [new OptimizeCSSPlugin(), new OptimizeJSPlugin()];
  }

  return config;
};

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: CssPlugin.loader,
      options: {publicPath: './'},
    },
    'css-loader',
    'postcss-loader',
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const babelOptions = (preset) => {
  const options = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };

  if (preset) {
    options.presets.push(preset);
  }

  return options;
};

const jsLoaders = (preset) => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: babelOptions(preset),
    },
  ];
  if (isDev) {
    loaders.push('eslint-loader');
  }
  return loaders;
};

const plugins = () => {
  const plugins = [
    new HTMLPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: !isDev,
      },
    }),
    new CleanPlugin(),
    new CssPlugin({
      filename: filename('css'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/images'),
          to: path.resolve(__dirname, 'dist/assets/images'),
        },
      ],
    }),
  ];

  if (isDev) {
    new StyleLintPlugin({
      configFile: path.resolve(__dirname, 'stylelint.config.js'),
      context: path.resolve(__dirname, './'),
      files: '**/*.css',
    });
  }

  return plugins;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: ['./index.js'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: isDev ? '/' : './',
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    alias: {
      '@img': path.resolve(__dirname, 'src/assets/images/'),
      '@': path.resolve(__dirname, 'src/assets'),
    },
  },
  optimization: optimization(),
  devServer: {
    contentBase: './dist',
    open: true,
    hot: true,
  },
  devtool: isDev ? 'source-map' : 'hidden-source-map',
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: jsLoaders('@babel/preset-typescript'),
      },
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/images',
        },
      },
      {
        test: /\.(eot|ttf|woff2|woff)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/fonts',
        },
      },
    ],
  },
};
