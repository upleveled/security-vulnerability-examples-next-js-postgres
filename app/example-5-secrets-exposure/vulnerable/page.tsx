import { getUsersWithPasswordHash } from '../../../database/users';
import SecretsExposure from './SecretsExposure';

export const dynamic = 'force-dynamic';

export default async function SecretsExposurePage() {
  const users = await getUsersWithPasswordHash();

  return <SecretsExposure apiKey={process.env.API_KEY!} users={users} />;
}
