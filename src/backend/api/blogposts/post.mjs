import fs from 'fs';
import path from 'path';

let bloglistItemHTML = null;

export const endpoint = '/api/blogposts';

export const callback = async (req, res) => {
  const { default: db } = await import('../../db.json', { assert: { type: 'json' } });
  const newEntry = {
    title: req.body.title,
    description: req.body.description || '',
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

      res.json({ id: newEntryID, ...newEntry });
    }
  );
};
