import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <ol>
        <li>
          <Link href="/example-1-missing-authentication-route-handler/vulnerable">
            Example 1: Missing Authentication - Route Handler
          </Link>
        </li>
        <li>
          <Link href="/example-2-missing-authentication-server-component/vulnerable">
            Example 2: Missing Authentication - Server Component
          </Link>
        </li>
        <li>
          <Link href="/example-3-missing-authorization-route-handler/vulnerable-1">
            Example 3: Missing Authorization - Route Handler
          </Link>
        </li>
        <li>
          <Link href="/example-4-missing-authorization-server-component/vulnerable-1">
            Example 4: Missing Authorization - Server Component
          </Link>
        </li>
        <li>
          <Link href="/example-5-secrets-exposure/vulnerable">
            Example 5: Data Exposure
          </Link>
        </li>
        <li>
          <Link href="/example-6-cross-site-scripting/vulnerable">
            Example 6: Cross-Site Scripting (XSS)
          </Link>
        </li>
      </ol>
    </div>
  );
}
