import path from "path";

export default {
  mode: "development",  // node env to development, adds useful names for modules in the build
  devtool: "eval-source-map", // means we can debug our compiled code
  entry: "./src/index.js", // entrypoint, it will start looking at dependencies from here
  output: {
    path: path.resolve(__dirname, "src"),  // this is all in memory for dev, but will pretend it actually made the bundle.js file
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
};
