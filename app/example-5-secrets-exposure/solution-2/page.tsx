import { getUsers } from '../../../database/users';
import SecretsExposure from './SecretsExposure';

export const dynamic = 'force-dynamic';

export default async function SecretsExposurePage() {
  const users = await getUsers();

  return <SecretsExposure users={users} />;
}
