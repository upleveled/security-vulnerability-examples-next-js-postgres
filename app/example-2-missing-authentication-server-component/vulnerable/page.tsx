import { getPublishedBlogPosts } from '../../../database/blogPosts';
import Common from '../common';

export const dynamic = 'force-dynamic';

export default async function MissingAuthenticationServerComponentPage() {
  const blogPosts = await getPublishedBlogPosts();

  return <Common blogPosts={blogPosts} />;
}
