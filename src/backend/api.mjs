import cors from 'cors';
import express from 'express';
import * as blogpostGET from './api/blogposts/[id]/get.mjs';
import * as blogpostsCreateGET from './api/blogposts/create/get.mjs';
import * as blogpostsGET from './api/blogposts/get.mjs';
import * as blogpostsPOST from './api/blogposts/post.mjs';
import * as blogpostsSearchPOST from './api/blogposts/search/post.mjs';

const serverPort = process.env.PORT || 3001;
const api = express();

// api.use(express.raw());
api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(cors());

api.get(blogpostsGET.endpoint, blogpostsGET.callback);
api.get(blogpostsCreateGET.endpoint, blogpostsCreateGET.callback);
api.get(blogpostGET.endpoint, blogpostGET.callback);

api.post(blogpostsPOST.endpoint, blogpostsPOST.callback);
api.post(blogpostsSearchPOST.endpoint, blogpostsSearchPOST.callback);

api.listen(serverPort, () => {
  console.log(`API server running on port ${serverPort}`);
});
