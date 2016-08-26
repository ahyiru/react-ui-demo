var webpackMiddleware = require("webpack-dev-middleware");
app.use(webpackMiddleware(...));
Example usage:

app.use(webpackMiddleware(webpack({
    // webpack options 
    // webpackMiddleware takes a Compiler object as first parameter 
    // which is returned by webpack(...) without callback. 
    entry: "...",
    output: {
        path: "/"
        // no real path is required, just pass "/" 
        // but it will work with other paths too. 
    }
}), {
    // all options optional 
 
    noInfo: false,
    // display no info to console (only warnings and errors) 
 
    quiet: false,
    // display nothing to the console 
 
    lazy: true,
    // switch into lazy mode 
    // that means no watching, but recompilation on every request 
 
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    // watch options (only lazy: false) 
 
    publicPath: "/assets/",
    // public path to bind the middleware to 
    // use the same as in webpack 
 
    headers: { "X-Custom-Header": "yes" },
    // custom headers 
 
    stats: {
        colors: true
    }
    // options for formating the statistics 
}));


/*

Add the following three plugins to the plugins array:

plugins: [
    // Webpack 1.0 
    new webpack.optimize.OccurenceOrderPlugin(),
    // Webpack 2.0 fixed this mispelling 
    // new webpack.optimize.OccurrenceOrderPlugin(), 
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
]
Occurence ensures consistent build hashes, hot module replacement is somewhat self-explanatory, no errors is used to handle errors more cleanly.

Add 'webpack-hot-middleware/client' into the entry array. This connects to the server to receive notifications when the bundle rebuilds and then updates your client bundle accordingly.

Now add the middleware into your server:

Add webpack-dev-middleware the usual way

var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);
 
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));
Add webpack-hot-middleware attached to the same compiler instance

app.use(require("webpack-hot-middleware")(compiler));

*/

















