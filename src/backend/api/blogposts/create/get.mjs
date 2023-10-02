import fs from 'fs';
import path from 'path';

let createBlogpostHTML = null;

export const endpoint = '/api/blogposts/create';
export const callback = async (req, res) => {
  function sendResponse(html) {
    res.appendHeader('HX-Trigger', { createViewLoaded: true });
    res.send(html);
  }

  if (createBlogpostHTML) {
    console.log('using cached file contents');
    sendResponse(createBlogpostHTML);
  } else {
    fs.readFile(
      path.resolve('src/backend/components/create-blogpost.html'),
      'utf-8',
      (err, data) => {
        console.log('read file contents for the 1st time');
        createBlogpostHTML = data;
        sendResponse(data);
      }
    );
  }
};
