/*globals define*/

define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var GridLayout = require('famous/views/GridLayout');
    var Lightbox = require('famous/views/Lightbox');
    var Marvel = require('API/marvel');
    var mainContext = Engine.createContext();

    var charactersWithThumbnails=[];

    // var lightbox = new Lightbox({inTransition:false});
var lightbox = new Lightbox({inTransition:{duration:100},outTransition:{duration:300}});
    mainContext.add(lightbox);

function destroyLightbox(s) {
    lightbox.hide();
}

function createLightbox(s) {
    var lightSurface = new Surface({
  content: charactersWithThumbnails[s.id-1].name,
  properties: {
    color: 'white',
    textAlign: 'center',
    fontSize:'40px',
    backgroundColor: '#FA5C4F'
  }
});

  lightSurface.on('click',function() {
  destroyLightbox();
  });

  lightbox.show(lightSurface);

}

var grid = new GridLayout({
  dimensions: [4,4]
});

var surfaces = [];

function gridClickHandler() {
    createLightbox(this);
}

var characters=  Marvel.getCharacters();
characters.success(function(response) {

    for (var i=0;i<response.data.results.length;i++) if (response.data.results[i].thumbnail.path.indexOf('not_available')===-1) charactersWithThumbnails.push(response.data.results[i]);
    for (var j=0;j<charactersWithThumbnails.length;j++) {
    var contentString=charactersWithThumbnails[j].thumbnail.path + '/standard_large.' + charactersWithThumbnails[j].thumbnail.extension;
    var surface = new ImageSurface({
        size: [undefined, undefined],
        content: contentString
    });

surface.on('click', gridClickHandler);

        surfaces.push(surface);
    }

    grid.sequenceFrom(surfaces);
    mainContext.add(grid);
});

});
