import fs from 'fs';
import path from 'path';

let blogpostHTML = null;

export const endpoint = '/api/blogposts/create/submit';
export const callback = async (req, res) => {
  function sendResponse(html) {
    res.appendHeader('HX-Trigger', 'postSubmitted');
    res.send(html);
  }

  const { default: db } = await import('../../../../db.json', { assert: { type: 'json' } });

  const newEntry = {
    title: req.body.title,
    description: req.body.desc || '',
    content: req.body.content,
  };
  const blogpostIDs = Object.keys(db.blogposts);
  const newEntryID = blogpostIDs.length + 1;

  db.blogposts[newEntryID] = newEntry;

  fs.writeFile(
    path.join(path.resolve(), 'src/backend/db.json'),
    JSON.stringify(db, undefined, '  '),
    (err) => {
      if (err) {
        res.send({ message: 'post failed' });
      }

      if (blogpostHTML) {
        sendResponse(blogpostHTML);
      } else {
        fs.readFile(
          path.resolve('src/backend/components/create-blogpost.html'),
          'utf-8',
          (err, html) => {
            blogpostHTML = html;
            sendResponse(html);
          }
        );
      }
    }
  );
};
