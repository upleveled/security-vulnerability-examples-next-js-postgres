import LinkIfNotCurrent from '../LinkIfNotCurrent';

type Props = {
  error?: string;
};

export default function Common(props: Props) {
  return (
    <>
      <h1>Missing Authorization - Server Component</h1>

      <ul>
        <li>
          <LinkIfNotCurrent href="/example-4-missing-authorization-server-component/vulnerable-1">
            Vulnerable 1
          </LinkIfNotCurrent>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-4-missing-authorization-server-component/vulnerable-2">
            Vulnerable 2
          </LinkIfNotCurrent>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-4-missing-authorization-server-component/solution-1">
            Solution 1
          </LinkIfNotCurrent>
        </li>
        <li>
          <LinkIfNotCurrent href="/example-4-missing-authorization-server-component/solution-2">
            Solution 2
          </LinkIfNotCurrent>
        </li>
      </ul>

      <hr />

      <div>
        Below, a list of unpublished blog posts will appear for logged-in users
        - similar to a "Drafts" list in a CMS.
        <br />
        <br />
        Each unpublished blog post should only be visible for the owner of the
        post.
      </div>

      <h2>Unpublished Blog Posts</h2>

      {!!props.error && <div style={{ color: 'red' }}>{props.error}</div>}
    </>
  );
}
