import cookie from 'cookie';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { deleteSessionByToken } from '../../../database/sessions';

export async function GET(): Promise<NextResponse<null>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  if (token) {
    await deleteSessionByToken(token.value);
  }

  return NextResponse.json(null, {
    status: 307,
    headers: {
      'Set-Cookie': cookie.serialize('sessionToken', '', {
        maxAge: -1,
        expires: new Date(Date.now() - 10000),
      }),
      location: '/',
    },
  });
}
