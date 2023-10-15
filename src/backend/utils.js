import { bloglistItemHTML } from './html-components.js';

export function generateBlogPosts(db, activeID = '', searchTerm = '') {
  const bloglistItem = bloglistItemHTML;
  let bloglistItems = '';

  for (const id in db.blogposts) {
    const post = db.blogposts[id];
    if (post.title.toLowerCase().includes(searchTerm)) {
      bloglistItems += bloglistItem
        .replaceAll('{$selectedClass}', activeID == id ? 'selected' : '')
        .replaceAll('{$title}', post.title)
        .replaceAll(
          '{$toggle}',
          post.description ? `<button data-bloglist-item-desc-toggle tabindex="0">+</button>` : ''
        )
        .replaceAll(
          '{$desc}',
          post.description
            ? `<div data-bloglist-item-desc class="hidden">${post.description}</div>`
            : ''
        )
        .replaceAll('{$id}', `${id}`);
    }
  }

  return bloglistItems;
}
