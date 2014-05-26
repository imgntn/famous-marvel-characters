famous-marvel-characters
by james b. pollack 2014


famo.us + marvel comics API = famous marvel characters

To Do:
- add loader w/ animation (initial marvel api call takes about 600ms)
- 	for now i've just cached the api call in firebase for demo purposes.  
- change image size request depending on avail. screen size
- style the lightboxes & their animations
- get some more interesting results into the lightboxes 
	- wiki from marvel is so slow!! the api returns empty descriptions.  i've emailed marvel about this.
	- short bio would be perfect
	- character image here too
	- alternative: comics, stories, events, etc. in graph relation
	- left or right scroll to next/prev lightbox
- add character search box
- add search results view
- add favorites
- add most viewed

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

