import { notFound } from 'next/navigation';
import { getBlogPostById } from '../../../database/blogPosts';
import Common from '../common';

export const dynamic = 'force-dynamic';

export default async function CrossSiteScriptingPage() {
  const blogPost = await getBlogPostById(6);

  if (!blogPost) {
    notFound();
  }

  return (
    <>
      <Common />

      <h2>{blogPost.title}</h2>
      <div>Published: {String(blogPost.isPublished)}</div>

      <div>{blogPost.textContent}</div>
    </>
  );
}
