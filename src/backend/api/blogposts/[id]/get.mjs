import fs from 'fs';
import path from 'path';
// import {fileURLToPath} from 'url';
//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
let blogpostHTML = null;

export const endpoint = '/api/blogposts/:id';

export const callback = async (req, res) => {
  const { default: db } = await import('../../../db.json', { assert: { type: 'json' } });
  const blogposts = db.blogposts;
  const entry = blogposts[req.params.id];

  function sendResponse(html) {
    res.send(
      html
        .replaceAll('{$title}', entry.title)
        .replaceAll('{$desc}', entry.description)
        .replaceAll('{$content}', entry.content)
    );
  }

  if (entry) {
    if (blogpostHTML) {
      sendResponse(blogpostHTML);
    } else {
      fs.readFile(path.resolve('src/backend/components/blogpost.html'), 'utf-8', (err, data) => {
        blogpostHTML = data;
        sendResponse(data);
      });
    }
  } else {
    res.sendStatus(404);
  }
};
