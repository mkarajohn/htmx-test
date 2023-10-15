# Instructions

**Node v18+ required.**

There are no fancy build scripts.

Start the content server with `npm run server`. CSS is served from `public/`

Server restarts automatically on file changes.

CSS generation only runs on server start. If you want to rebuild your CSS you will have to run
`npm run tailwind`

**DISCLAIMER**
This is now considered finished as it has reached feature parity with 
[this](https://github.com/mkarajohn/orfium-react-workshop-demo-app/tree/third-pass)), for the most part

## Things that work

- The api returns html instead of json
- the bloglist on the left loads and is searchable
- The blog content shows and closes based on selected blog item from the list
- You can create a new blogpost and submit it
- The preview panel during blog creation

## Things that don't work (kinda)

- Expanded/collapsed state of the list items is not consistent when the list updates completely (e.g. after a search)
- Adding a new bloglist while in search will show the new entry even if it does not match the search criteria

