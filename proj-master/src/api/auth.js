import client from './client';

export async function signup({ email, password, fullName, role = 'CUSTOMER' }) {
  const res = await client.post('/auth/signup', { email, password, fullName, role });
  return res.data;
}

export async function login({ email, password }) {
  const res = await client.post('/auth/login', { email, password });
  return res.data;
}
