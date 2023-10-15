import fs from 'fs';

export const indexHTML = fs.readFileSync('src/backend/index.html', 'utf-8');
export const bloglistItemHTML = fs.readFileSync(
  'src/backend/components/bloglist-item.html',
  'utf-8'
);
export const blogpostHTML = fs.readFileSync('src/backend/components/blogpost.html', 'utf-8');
export const noContentHTML = fs.readFileSync('src/backend/components/no-content.html', 'utf-8');
export const notFoundHTML = fs.readFileSync('src/backend/components/not-found.html', 'utf-8');
export const blogpostFormHTML = fs.readFileSync(
  'src/backend/components/create-blogpost.html',
  'utf-8'
);
export const createBlogButtonHTML = fs.readFileSync(
  'src/backend/components/create-blog-button.html',
  'utf-8'
);
export const cancelCreateBlogButtonHTML = fs.readFileSync(
  'src/backend/components/cancel-create-blog-button.html',
  'utf-8'
);
