import express from 'express';
import fs from 'fs';
import { match } from 'node-match-path';
import path from 'path';
import {
  bloglistItemHTML,
  blogpostFormHTML,
  blogpostHTML,
  cancelCreateBlogButtonHTML,
  createBlogButtonHTML,
  indexHTML,
  noContentHTML,
  notFoundHTML,
} from './html-components.js';
import { generateBlogPosts } from './utils.js';

const serverPort = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

app.get('/', async function (req, res) {
  const { default: db } = await import('./db.json', { assert: { type: 'json' } });
  const bloglistItems = generateBlogPosts(db);

  if (req.get('hx-request')) {
    res.append('HX-Trigger', 'noSelection');
    res.send(noContentHTML);
  } else {
    res.send(
      indexHTML
        .replace('{$blogslist}', bloglistItems)
        .replace('{$content}', noContentHTML)
        .replace('{$action}', createBlogButtonHTML)
    );
  }
});

app.get('/:id', async (req, res) => {
  const { default: db } = await import('./db.json', { assert: { type: 'json' } });
  const blogposts = db.blogposts;
  const entry = blogposts[req.params.id];

  if (entry) {
    const blogpost = blogpostHTML
      .replaceAll('{$title}', entry.title)
      .replaceAll('{$desc}', entry.description)
      .replaceAll('{$content}', entry.content);

    if (req.get('hx-request')) {
      res.send(blogpost + createBlogButtonHTML);
    } else {
      const bloglistItems = generateBlogPosts(db, req.params.id);
      res.send(
        indexHTML
          .replace('{$content}', blogpost)
          .replace('{$blogslist}', bloglistItems)
          .replace('{$action}', createBlogButtonHTML)
      );
    }
  } else {
    if (req.get('hx-request')) {
      console.log('here');
      res.send(404, notFoundHTML);
    } else {
      console.log('not here');
      const bloglistItems = generateBlogPosts(db, req.params.id);
      res.send(
        404,
        indexHTML
          .replace('{$content}', notFoundHTML)
          .replace('{$blogslist}', bloglistItems)
          .replace('{$action}', createBlogButtonHTML)
      );
    }
  }
});

app.post('/blogposts/search', async (req, res) => {
  const searchTerm = req.body.search.toLowerCase();
  const { default: db } = await import('./db.json', { assert: { type: 'json' } });

  const currentURL = new URL(req.get('Hx-Current-Url'));
  const matched = match('/:id', currentURL.pathname);
  const activeID = matched.matches ? matched.params.id : '';

  const bloglistItems = generateBlogPosts(db, activeID, searchTerm);

  res.append('HX-Trigger', 'blogpostsRefetched');
  res.send(bloglistItems);
});

app.get('/blogposts/create', async (req, res) => {
  // Prevent vieweing "non-view" endpoints
  if (!req.get('hx-request')) {
    res.redirect('/');
  } else {
    res.send(blogpostFormHTML + cancelCreateBlogButtonHTML);
  }
});

app.post('/blogposts/create/submit', async (req, res) => {
  const { default: db } = await import('./db.json', { assert: { type: 'json' } });

  const newEntry = {
    title: req.body.title,
    description: req.body.desc || '',
    content: req.body.content,
  };

  if (!newEntry.title || !newEntry.content) {
    res.send(500, 'Title and content cannot be empty');
  }

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

      const newBlogListItemHTML =
        '<div data-oob-wrapper hx-swap-oob="beforeend:#blog-list-container">' +
        bloglistItemHTML
          .replaceAll('{$selectedClass}', 'selected')
          .replaceAll('{$title}', newEntry.title)
          .replaceAll(
            '{$toggle}',
            newEntry.description
              ? `<button data-bloglist-item-desc-toggle tabindex="0">+</button>`
              : ''
          )
          .replaceAll(
            '{$desc}',
            newEntry.description
              ? `<div data-bloglist-item-desc class="hidden">${newEntry.description}</div>`
              : ''
          )
          .replaceAll('{$id}', `${newEntryID}`) +
        '</div>';

      res.append('HX-Trigger-After-Settle', 'postSubmitted');
      res.append('HX-Push-Url', `/${newEntryID}`);
      res.send(
        blogpostHTML
          .replaceAll('{$title}', newEntry.title)
          .replaceAll('{$desc}', newEntry.description)
          .replaceAll('{$content}', newEntry.content) +
          createBlogButtonHTML +
          newBlogListItemHTML
      );
    }
  );
});

app.get('/blogposts/create/cancel', async (req, res) => {
  // Prevent vieweing "non-view" endpoints
  if (!req.get('hx-request')) {
    res.redirect('/');
  } else {
    const currentURL = new URL(req.get('Hx-Current-Url'));
    const matched = match('/:id', currentURL.pathname);

    if (matched.matches) {
      const { default: db } = await import('./db.json', { assert: { type: 'json' } });
      const blogposts = db.blogposts;
      const entry = blogposts[matched.params.id];

      if (entry) {
        const blogpost = blogpostHTML
          .replaceAll('{$title}', entry.title)
          .replaceAll('{$desc}', entry.description)
          .replaceAll('{$content}', entry.content);

        res.send(blogpost + createBlogButtonHTML);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.send(noContentHTML + createBlogButtonHTML);
    }
  }
});

app.listen(serverPort, function () {
  console.log(`Serving app on port ${serverPort}`);
});
