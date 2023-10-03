import cors from 'cors';
import express from 'express';
import * as blogpostGET from './api/blogposts/[id]/get.mjs';
import * as blogpostCloseGET from './api/blogposts/close/get.mjs';
import * as blogpostsCancelCreateGET from './api/blogposts/create/cancel/get.mjs';
import * as blogpostsCreateGET from './api/blogposts/create/get.mjs';
import * as blogpostsSubmitPOST from './api/blogposts/create/submit/post.mjs';
import * as blogpostsGET from './api/blogposts/get.mjs';
import * as blogpostsPOST from './api/blogposts/post.mjs';
import * as blogpostsSearchPOST from './api/blogposts/search/post.mjs';

const serverPort = process.env.PORT || 3001;
const api = express();

// api.use(express.raw());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(cors());

api.use(function (req, res, next) {
  res.append('Access-Control-Expose-Headers', 'hx-trigger');
  next();
});

api.get(blogpostsGET.endpoint, blogpostsGET.callback);
api.get(blogpostsCreateGET.endpoint, blogpostsCreateGET.callback);
api.get(blogpostsCancelCreateGET.endpoint, blogpostsCancelCreateGET.callback);
api.get(blogpostCloseGET.endpoint, blogpostCloseGET.callback);
api.get(blogpostGET.endpoint, blogpostGET.callback);

api.post(blogpostsPOST.endpoint, blogpostsPOST.callback);
api.post(blogpostsSearchPOST.endpoint, blogpostsSearchPOST.callback);
api.post(blogpostsSubmitPOST.endpoint, blogpostsSubmitPOST.callback);

api.listen(serverPort, () => {
  console.log(`API server running on port ${serverPort}`);
});
