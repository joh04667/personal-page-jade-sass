# TODO:

#### admin.jade:

* ~~Set server route for editing posts~~

* ~~Currently when modal gets too long, the buttons at the bottom are unreachable. fix it (`max-height` on editor?).~~

* ~~When a new post is submitted, redirect to new post page on success. Likewise, when post is edited, redirect to that page~~

* Admin modal should not be escapable by clicking outside the modal dialog

* Add encryption and login to access admin page.

* Trix Editor supports picture uploads, but needs to be set up. Implement this




#### blog.jade:

* Format post container with padding

* Include pagination at top of page as well

* Add 'first' and 'last' links to pagination links

* Add 'date edited' field to post


##### index.jade:

* ~~Currently you can scroll sideways for the slide-up menu. Fix it.~~

* Include link to blog



#### Server:

* Change router to route from `index.js` instead of `server.js`

* Set up route to go to latest page `/blog/latest`

* Server crashes when there is a database error. Add try/catch blocks so this doesn't nuke everything, and complete error handling on client side (halfway set up already)
