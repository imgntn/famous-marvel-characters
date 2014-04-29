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
    var Marvel = require('API/marvel');

    function displayChatMessage(name,text) {
      return;
 }

var myDataRef = new window.Firebase('https://famous-marvel.firebaseio.com/james');

myDataRef.push({name:'james',text:'HERROO'});

myDataRef.on('child_added', function(snapshot) {
var message = snapshot.val();
displayChatMessage(message.name, message.text);
});

var mainContext = Engine.createContext();

var layout = new HeaderFooterLayout({
  headerSize: 0,
  footerSize: 40
});

layout.footer.add(new Surface({
    content: 'James B. Pollack (2014)',
    classes: ['footer'],
    properties: {
        zIndex:1,
        lineHeight: '40px',
        textAlign: 'center',
        fontSize: '20px'
    }
}));

var size=mainContext.getSize();

var downMod1 = new StateModifier({
  transform: Transform.translate(0,20,0)
});
var downMod2 = new StateModifier({
  transform: Transform.translate(0,140,0)
});

var downMod3 = new StateModifier({
  transform: Transform.translate(0,260,0)
});

var downMod4 = new StateModifier({
  transform: Transform.translate(0,380,0)
});

var firstSurface = new Surface({
  size: [220, 100],
  content: 'Block of text is static',
  classes: ['menu-left-tab']

});

var secondSurface = new Surface({
  size: [220, 100],
  content: 'Second',
  classes: ['menu-left-tab']
});

var thirdSurface = new Surface({
  size: [220, 100],
  content: 'Third',
  classes: ['menu-left-tab']
});

var fourthSurface = new Surface({
  size: [220, 100],
  content: 'Fourth',
  classes: ['menu-left-tab']
});

layout.content.add(downMod1).add(firstSurface);
layout.content.add(downMod2).add(secondSurface);
layout.content.add(downMod3).add(thirdSurface);
layout.content.add(downMod4).add(fourthSurface);

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

var surfaces = [];

var scrollview = new Scrollview();
scrollview.setOptions({});
scrollview.sequenceFrom(surfaces);

var stateModifier = new StateModifier({
    origin: [1, 0]
});

layout.content.add(stateModifier).add(scrollview);
//layout.content.add(scrollview);
function clickHandler() {
    createLightbox(this);
}

var charactersSoFar=0;

//should make this dynamic after the first call or something based on the response.data.total
// var totalPagesToFetch=14;
var totalPagesToFetch=1;

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

surfaces.push(surface);
    }
  surfaces.sort(SortByName);
}

for (var x=0;x<totalPagesToFetch;x++) {

  var characters = Marvel.getCharacters(100,x*100);
  characters.success(successCallback);
}

});
