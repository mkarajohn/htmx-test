import fs from 'fs';
import path from 'path';

let noContentHTML = null;

export const endpoint = '/api/blogposts/close';

export const callback = async (req, res) => {
  function sendResponse(html) {
    res.append('HX-Trigger', 'blogClosed');
    res.send(html);
  }

  if (noContentHTML) {
    sendResponse(noContentHTML);
  } else {
    fs.readFile(path.resolve('src/backend/components/no-content.html'), 'utf-8', (err, data) => {
      noContentHTML = data;
      sendResponse(data);
    });
  }
};
