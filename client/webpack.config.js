const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
  },

  mode: process.env.NODE_ENV,

  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "./index.html"),
    }),
  ],
  devServer: {
    proxy: {
      context: ["/api"],
      target: "http://localhost:3000",
      changeOrigin: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  module: {
    // rules array is executed in reverse order
    rules: [
      {
        //  matches the preceding item 0 or 1 times (could be .js or .jsx)
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        resolve: {
          extensions: [".js", ".jsx"],
        },
        use: {
          loader: "babel-loader",
        },
      },

      {
        // for CSS
        // this is a regexp
        // \. escapes the period
        // [] or
        // $ end of string
        // i not case sensitive
        test: /\.css$/i,
        use: [
          // creates 'style' nodes from JS strings
          "style-loader",
          // compiles CSS to commonJS
          "css-loader",
          // transpile postcss to CSS
          "postcss-loader",
        ],
      },
      // handle images using file-loader - source: https://v4.webpack.js.org/loaders/file-loader/
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        use: [{ loader: "file-loader" }],
      },
    ],
  },
};
