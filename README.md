# Instructions

**Node v18+ required.**

There are no fancy build scripts. All you need to do is run `npm install` and then:

* Start the content server with `npm run server`. CSS is served from `public/`. The server restarts automatically on file changes.

>[!TIP]
>CSS generation only runs on server start. If you want to rebuild your CSS you will have to run `npm run tailwind` (or `npm run tailwind:watch` if you want to auto generate the CSS on file changes)

## A few words on this

This is an "HTMX port" of [this React demo app](https://github.com/mkarajohn/orfium-react-workshop-demo-app/tree/third-pass) that I had made for a React workshop.

In general it's a simple express app, which serves a list of blogposts, with the ability to 
search for them, view a specific blog post and create new ones. That's all; it is meant to be very 
simplistic _on purpose_.

The spirit of simplicity is kept in this HTMX port as well; no templating engines or complex 
build steps are used. Just a simple server and some HTMX powered HTML.

## How the project is structured

The express app and all its routes/endpoints lives in the `server.js` file. 

>[!NOTE]
>IMPORTANT!
>
>We are always checking if a request includes the `hx-request` header in all of our GET handlers.
The reason we do this is in order to handle the required resource differently based on whether the
request came from HTMX or from the user (by hard-navigating to the URL from the address bar)
>
>e.g. If a user hits the localhost:3000/:id route by navigating there from the address bar we want
to serve the complete HTML of our app. However, if the request for localhost:3000/:id came from
HTMX instead (i.e. includes the `hx-request` header) we do not want to serve the HTML of the
whole application again, we only want to serve a partial HTML that only includes the content of
the requested blog that HTMX will handle for us.

We have a directory called `components` which includes the markup for various UI elements that used 
in the app. We read these HTML components in the `html-components.js` file, where we then export 
them as strings in order to be used and served from the various endpoints, found in `server.js`

We also have our `index.html` file, which serves as the skeleton of our app upon which we inject our 
content.

Finally, we have a dummy `db.json` "database" where we save our new blogposts.

And that's pretty much it.


**DISCLAIMER**
This is now considered finished as it has reached feature parity with 
[its React counterpart](https://github.com/mkarajohn/orfium-react-workshop-demo-app/tree/third-pass), for the most part (see "Things that don't work" for a list of things that it lacks)

## Things that work 

- The api returns html instead of json
- the bloglist on the left loads and is searchable
- The blog content shows and closes based on selected blog item from the list
- You can create a new blogpost and submit it
- The preview panel during blog creation

## Things that don't work (kinda)

- Expanded/collapsed state of the list items is not consistent when the list updates completely (e.g. after a search)
- Adding a new bloglist while in search will show the new entry even if it does not match the search criteria
