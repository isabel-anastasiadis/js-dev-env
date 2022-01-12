# js-dev-env
Tutorial by Cory House


## Checklist

1. Ensure the EditorConfig extension is installed for everyone



## How it was set up

1. Create .editorconfig file (see editorconfig.org).  It is a standard that editors can read, and enforce.  For VSCode, we'll need the EditorConfig extension installed for everyone.

2. Add package.json (adding node_modules to gitignore), and install the packages.

3. Automation - Added js script that sets up a dev webserver using Express that serves `src/index.html`.  When the webserver is started, it listens on port 3000, and opens up our site in the browser.  
This was hooked into the package.json by:

```
  "scripts": {
    "prestart": "node build_scripts/startMessage.js",
    "start": "node build_scripts/srcServer.js"
  },
```

4. Added Babel as a transpiler.  We are using '@babel/preset-env' to so we don't have to deal with too many details.  Configuration is set via `.babelrc` file.  Then we set up our dev start scripts to be called with `babel-node` which means they can be written in new javascript because babel-node will compile with our babel settings before running them.

```
  "scripts": {
    "prestart": "babel-node build_scripts/startMessage.js",
    "start": "babel-node build_scripts/srcServer.js"
  },
```

5. Added Webpack, and plugged into our dev server.
* In the config file:
    * We say to use "babel-loader" to transpile all javascript files in source before bundling.
    * The `devtool` field gives  us source maps.  See https://webpack.js.org/configuration/devtool/ for all the options.  "eval-source-map" gives a really high quality for dev environments.
* In the dev webserver file:
    * Using "webpack-dev-middleware", we tell express to use webpack as a compiler, and hook up the public path to the one defined in the webpack config file.
* Added a css file, some javascript that imports the css, and in our `index.html` file, we load our bundle via the public url with a script tag.

6. Added linting with a watcher
    * Added .eslintrc.json





## Dependencies, and what they're used for

Build scripts and console tools:
* "chalk" - lets us write coloured messages in the console.
* "npm-run-all" - allows us to run scripts in parallel (eg. lint watch and our dev server)

Express dev server:
* "express" - webserver
* "open" - it opens a browser at the given address

Babel transpiler:
* "@babel/core" - the core babel library
* "@babel/node" - a CLI that works just like the Node.js CLI, but with added benefit of compiling with Babel presets and plugins before running it.  So instead of `node <some js file>`, we can use `babel-node <some js file>`.
* "@babel/preset-env" - smart presets so we don't have to manage details.
* "@babel/register"
* "@babel/cli" 

Webpack:
* "webpack" - main library
* "babel-loader" - in our webpack.config.dev.js, we say to use the babel-loader to transpile all javascript files in source before bundling.
* "webpack-dev-middleware" - hooks our webpack bundles of our src into express.
* "style-loader" - adds a script tag to the DOM to load the styles.
* "css-loader" - spots css imports in JS files, and includes them in bundling.

Linting:
* "eslint" - main library
* "eslint-watch" - called with "esw" command. 
* "eslint-plugin-import" - ???

Application code:
* "numeral" - formats numbers.

Not done yet:
* "whatwg-fetch"
* "chai"
* "cheerio": "1.0.0-rc.5",
* "compression": "1.7.4",
* "cross-env": "7.0.3",
* "faker": "^5.4.0",
* "html-webpack-plugin": "5.2.0",
* "jsdom": "^16.4.0",
* "json-schema-faker": "0.5.0-rcv.27",
* "json-server": "0.16.3",
* "localtunnel": "2.0.1",
* "mini-css-extract-plugin": "^1.3.9",
* "mocha": "8.3.0",
* "numeral": "2.0.6",
* "rimraf": "3.0.2",
* "surge": "0.21.7",

