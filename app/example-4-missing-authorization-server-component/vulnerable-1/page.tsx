import { getUnpublishedBlogPosts } from '../../../database/blogPosts';
import Common from '../common';
import MissingAuthorizationServerComponent from './MissingAuthorizationServerComponent';

export const dynamic = 'force-dynamic';

export default async function MissingAuthorizationServerComponentPage() {
  const blogPosts = await getUnpublishedBlogPosts();

  return (
    <>
      <Common />

      <MissingAuthorizationServerComponent blogPosts={blogPosts} />
    </>
  );
}
