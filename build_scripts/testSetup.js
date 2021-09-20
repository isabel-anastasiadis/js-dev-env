// this file isn't transpiled, so must use CommonJS and ES5

// require babel to transpile before our tests run by mocha
require('@babel/register')();

// Disable webpack features that Mocha doesn't understand (because we are importing our css into our js)
require.extensions['.css'] = function() {};  // treat it like an empty function
