import fs from 'fs';
import path from 'path';

let bloglistItemHTML = null;

export const endpoint = '/api/blogposts/search';
export const callback = async (req, res) => {
  const searchTerm = req.body.search.toLowerCase();

  function sendResponse(html) {
    let bloglistItems = '';

    for (const id in db.blogposts) {
      const post = db.blogposts[id];

      if (post.title.toLowerCase().includes(searchTerm)) {
        bloglistItems += html
          .replaceAll('{$title}', post.title)
          .replaceAll('{$desc}', post.description)
          .replaceAll('{$id}', `${id}`);
      }
    }

    res.appendHeader('HX-Trigger', { listLoaded: true });
    res.send(bloglistItems);
  }

  const { default: db } = await import('../../../db.json', { assert: { type: 'json' } });

  if (bloglistItemHTML) {
    console.log('using cached file contents');
    sendResponse(bloglistItemHTML);
  } else {
    fs.readFile(path.resolve('src/backend/components/bloglist-item.html'), 'utf-8', (err, data) => {
      console.log('read file contents for the 1st time');
      bloglistItemHTML = data;
      sendResponse(data);
    });
  }
};
