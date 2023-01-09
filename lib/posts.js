import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under the directory /posts
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" extension from filename to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file, fullpath
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with id
    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort((a, b) => b.date - a.date);
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // it must be an array of objects
  // Each object must have the params key and contain an object with the id key (because we’re using [id] in the file name).
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });

  // ********* fetch post data from an external API endpoint ***********
  // const res = await fetch('..');
  // const posts = await res.json();
  // return posts.map((post) => {
  //   return {
  //     params: {
  //       id: post.id,
  //     },
  //   };
  // });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
