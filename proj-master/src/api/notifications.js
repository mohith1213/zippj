import client from './client';

export async function listUserNotifications(userId) {
  const res = await client.get(`/notifications/user/${userId}`);
  return res.data;
}
