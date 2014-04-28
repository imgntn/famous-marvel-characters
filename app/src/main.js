/*globals define*/

define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
//    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');
//    var StateModifier = require('famous/modifiers/StateModifier');
    var GridLayout = require('famous/views/GridLayout');
    var Lightbox = require('famous/views/Lightbox');
    var GenericSync = require('famous/inputs/GenericSync');
    var MouseSync   = require('famous/inputs/MouseSync');
    var TouchSync   = require('famous/inputs/TouchSync');
    var ScrollSync  = require('famous/inputs/ScrollSync');

    var Marvel = require('API/marvel');
    var mainContext = Engine.createContext();

    var start = 0;
    var update = 0;
    var end = 0;
    var position = [0, 0];

    var genericSync = new GenericSync(function() {
        return [0, 0];
    }, {
        syncClasses: [MouseSync, TouchSync, ScrollSync]
    });
    Engine.pipe(genericSync);

    genericSync.on('start', function() {
        start++;
        position = [0, 0];
     // console.log('start:',start,' end:',end,' update:',update,' position:',position);
    });

    genericSync.on('update', function(data) {
        update++;
        position[0] += data.position[0];
        position[1] += data.position[1];
        //console.log('start:',start,' end:',end,' update:',update,' position:',position);
    });

    genericSync.on('end', function() {
        end++;
       // console.log('start:',start,' end:',end,' update:',update,' position:',position);
    });

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

  lightSurface.on('touchstart',function() {
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

surface.on('touchstart', gridClickHandler);

        surfaces.push(surface);
    }

    grid.sequenceFrom(surfaces);
    mainContext.add(grid);
});

});
