define(function(require, exports, module) {

    var $ = require('jquery');

    function test(id) {
        return true;
    }

    function getCharacters(limit,offset) {
        //var characterCall= $.getJSON('http://gateway.marvel.com:80/v1/public/characters?limit='+limit+'&offset='+offset+'&apikey=d63df546af1b868def725d0dde23c56d');
      var characterCall= $.getJSON('/src/first100characters.json');
        return characterCall;
    }

    function getCharacterDetail(characterID) {
        var characterDetailCall= $.getJSON('http://gateway.marvel.com:80/v1/public/characters/'+characterID+'?apikey=d63df546af1b868def725d0dde23c56d');
        return characterDetailCall;
    }

    function anotherTest(id) {
        return false;
    }

    module.exports = {
        test: test,
        anotherTest: anotherTest,
        getCharacters: getCharacters,
        getCharacterDetail:getCharacterDetail
    };
});
