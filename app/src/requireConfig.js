/*globals require*/
require.config({
    shim: {

    },
    paths: {
        famous: '../lib/famous',
        requirejs: '../lib/requirejs/require',
        almond: '../lib/almond/almond',
        'famous-polyfills': '../lib/famous-polyfills/index',
        jquery: '../lib/jquery/dist/jquery',
        API: '../src/API',
        'fastclick-amd': '../lib/fastclick-amd/fastclick'
    }
});
require(['main']);
