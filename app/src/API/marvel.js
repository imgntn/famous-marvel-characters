define(function(require, exports, module) {

    var $ = require('jquery');

    function test(id) {
        return true;
    }

    function getCharacters() {
        $.getJSON('http://gateway.marvel.com:80/v1/public/characters?limit=100&offset=0&apikey=d63df546af1b868def725d0dde23c56d', function(data) {
           return data;
        });
    }

    function anotherTest(id) {
        return false;
    }

    module.exports = {
        test: test,
        anotherTest: anotherTest,
        getCharacters: getCharacters
    };
});
