import fs from 'fs';
import path from 'path';

let createBlogpostHTML = null;

export const endpoint = '/api/blogposts/create';
export const callback = async (req, res) => {
  function sendResponse(html) {
    res.append('HX-Trigger', 'formLoaded');
    res.send(html);
  }

  if (createBlogpostHTML) {
    sendResponse(createBlogpostHTML);
  } else {
    fs.readFile(
      path.resolve('src/backend/components/create-blogpost.html'),
      'utf-8',
      (err, data) => {
        createBlogpostHTML = data;
        sendResponse(data);
      }
    );
  }
};
