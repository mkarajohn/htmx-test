# Instructions

**Node v18+ required.**

There are no fancy build scripts and auto runners.

Start the content server with `npm run server`. Contents are served from the `dist/` dir, so make 
sure to have "built" the frontend files first

Start the api server with `npm run api`

Build the frontend manually whenever you make a change to anything in the `frontend/` dir by running 
`npm run build`

Changes to the api or the content server require a server restart in order to take effect.

If you want to feel fancy you can have the `tailwindcss` process watch for changes in your CSS files 
with `tailwind:watch` but you probably won't need it.

**DISCLAIMER**

This is not finished (it will be when there is parity with [this](https://github.com/mkarajohn/orfium-react-workshop-demo-app/tree/third-pass))

There are still some bugs and unresolved problems


## Things that work

* The api returns html instead of json
* the bloglist on the left loads and is searchable
* The blog content shows and closes based on selected blog item from the list
* You can create a new blogpost and submit it

## Things that don't work

* The preview panel during blog creation