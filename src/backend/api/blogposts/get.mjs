import fs from 'fs';
import path from 'path';

let bloglistItemHTML = null;

export const endpoint = '/api/blogposts';
export const callback = async (req, res) => {
  function sendResponse(html) {
    let bloglistItems = '';

    for (const id in db.blogposts) {
      const post = db.blogposts[id];
      bloglistItems += html
        .replaceAll('{$title}', post.title)
        .replaceAll('{$desc}', post.description)
        .replaceAll('{$id}', `${id}`);
    }

    res.append('HX-Trigger', 'listLoaded');
    console.log(res);
    res.send(bloglistItems);
  }

  const { default: db } = await import('../../db.json', { assert: { type: 'json' } });

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
