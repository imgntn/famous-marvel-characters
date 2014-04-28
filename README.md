famous-marvel-characters
by james b. pollack 2014


famo.us + marvel comics API = famous marvel characters

To Do:
- add loader w/ animation (initial marvel api call takes about 600ms)
- divide results into grids and put grids into a sequenced scrollview
- add an 'infinite scroll' that fetches more grids when you get close to the last grid
- style the lightboxes & their animations
- get some more interesting results into the lightboxes 
	- wiki from marvel is so slow!!
	- short bio would be perfect
	- character image here too
	- alt: comics, stories, evenets, etc.
	- left or right scroll to next/prev lightbox
- add character search box
- add search results view


>
after whitelisting your localhost and deploy domains with marvel:

>
-npm install -g grunt-cli bower
>
-npm install && bower install
>
-grunt serve

> 
when you push to heroku, the Procfile runs server.js, which serves a compressed build version fron /dist

