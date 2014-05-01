/*globals define*/

define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Lightbox = require('famous/views/Lightbox');
    var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Scrollview = require('famous/views/Scrollview');
    var Transform = require('famous/core/Transform');

var mainContext = Engine.createContext();

var layout = new HeaderFooterLayout({
  headerSize: 0,
  footerSize: 40
});

layout.footer.add(new Surface({
    content: 'Data provided by Marvel. © 2014 Marvel',
    classes: ['footer'],
    properties: {
        zIndex:1,
        lineHeight: '40px',
        textAlign: 'center',
        fontSize: '16px'
    }
}));

var menuLength= 4;
var menuSurfaces =[];
function createMenuSurfaceWithContent(contentString) {
  var surface = new Surface({
  size: [210, 100],
  content: contentString,
  classes: ['menu-left-tab']

});

menuSurfaces.push(surface);
return surface;
}

createMenuSurfaceWithContent('A/Z / Z-A');
createMenuSurfaceWithContent('Most Popular');
createMenuSurfaceWithContent('Featured');
createMenuSurfaceWithContent('concept & code: James B. Pollack').addClass('about-me');

function createMenu() {
  for(var i=0;i<menuLength;i++){
var rightMod = new StateModifier({
  transform: Transform.translate(10,0,0)
});

var downMod= new StateModifier({
  transform: Transform.translate(0,30+(120*i),0)
});

layout.content.add(rightMod).add(downMod).add(menuSurfaces[i]);

}
return;
}

createMenu();
mainContext.add(layout);

var FastClick = require('fastclick-amd');
FastClick.attach(document.body);

var charactersWithThumbnails=[];

var lightbox = new Lightbox({inTransition:{duration:100},outTransition:{duration:300}});
mainContext.add(lightbox);

function destroyLightbox(s) {
    lightbox.hide();
}

function createLightbox(s) {

var lightSurface = new Surface({
  content: charactersWithThumbnails[s.clickOrder].name,
  properties: {
    color: 'white',
    textAlign: 'center',
    fontSize:'40px',
    backgroundColor: '#FA5C4F',
    zIndex:99
  }
});

  lightSurface.on('click',function() {
  destroyLightbox();
  });

  lightbox.show(lightSurface);

}
var imageScrollSurfaces = [];

var scrollview = new Scrollview();
scrollview.setOptions({});
scrollview.sequenceFrom(imageScrollSurfaces);

var stateModifier = new StateModifier({
    origin: [1, 0]
});

layout.content.add(stateModifier).add(scrollview);
//layout.content.add(scrollview);
function clickHandler() {
    createLightbox(this);
}

var charactersSoFar=0;

function SortByName(a, b) {
  var aName = a.characterName.toLowerCase();
  var bName = b.characterName.toLowerCase();
  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function successCallback(response) {
    for (var i=0;i<response.data.results.length;i++) if (response.data.results[i].thumbnail.path.indexOf('not_available')===-1) charactersWithThumbnails.push(response.data.results[i]);
    for (var j=charactersSoFar;j<charactersWithThumbnails.length;j++) {
    var contentString=charactersWithThumbnails[j].thumbnail.path + '/standard_large.' + charactersWithThumbnails[j].thumbnail.extension;
    var surface = new ImageSurface({
        size: [100,100],
        content: contentString
    });
  surface.pipe(scrollview);
charactersSoFar=charactersWithThumbnails.length;
surface.on('click', clickHandler);
surface.clickOrder=j;
surface.characterName=charactersWithThumbnails[j].name;

imageScrollSurfaces.push(surface);
    }
  imageScrollSurfaces.sort(SortByName);
}

//we cache just 40 characters for the first load
var myDataRef = new window.Firebase('https://famous-marvel.firebaseio.com/firstBatch');
myDataRef.on('value', function(snapshot) {

  if(snapshot.val() === null) return;
  else {
    var characters = snapshot.val().characters;
    var response = {
      data:{
         results:characters
      }
    };
   successCallback(response);
  }
});

//then add the rest
var myDataRef2 = new window.Firebase('https://famous-marvel.firebaseio.com/allCharacters');
myDataRef2.on('value', function(snapshot) {

  if(snapshot.val() === null) return;
  else {
    var characters = snapshot.val().characters;
    var response = {
      data:{
         results:characters
      }
    };
   successCallback(response);
  }
});

});
