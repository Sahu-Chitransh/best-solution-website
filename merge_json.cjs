const fs = require('fs');

const myBlog = JSON.parse(fs.readFileSync('my_blog.json', 'utf8'));
const chitranshBlog = JSON.parse(fs.readFileSync('chitransh_blog.json', 'utf8'));

// We want to combine them.
// Chitransh's blog has 6 posts with full content.
// My blog has 11 posts, with `image` and `bgColor`.

const mergedPosts = [];

for (let i = 0; i < myBlog.posts.length; i++) {
  const myPost = myBlog.posts[i];
  const chitranshPost = chitranshBlog.posts.find(p => p.id === myPost.id);
  
  if (chitranshPost) {
    // Merge: keep Chitransh's rich content, add my image/bgColor
    mergedPosts.push({
      ...chitranshPost,
      image: myPost.image,
      bgColor: myPost.bgColor
    });
  } else {
    // Just use my post
    mergedPosts.push(myPost);
  }
}

const finalBlog = { posts: mergedPosts };
fs.writeFileSync('src/content/blog.json', JSON.stringify(finalBlog, null, 2), 'utf8');
console.log('Merged successfully!');
