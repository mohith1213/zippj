import client from './client';

export async function listCustomerApplications(customerId) {
  const res = await client.get(`/loans/customer/${customerId}`);
  return res.data;
}

export async function listMakerQueue() {
  const res = await client.get('/loans/maker');
  return res.data;
}

export async function listCheckerQueue() {
  const res = await client.get('/loans/checker');
  return res.data;
}

export async function getApplicationDetails(id) {
  const res = await client.get(`/loans/${id}`);
  return res.data;
}

export async function applyLoan(payload) {
  const res = await client.post('/loans/apply', payload);
  return res.data;
}

export async function resubmitLoan(payload) {
  const res = await client.post('/loans/resubmit', payload);
  return res.data;
}

export async function makerApprove(id, userId, remarks) {
  const res = await client.post(`/loans/${id}/maker/approve`, { userId, remarks });
  return res.data;
}

export async function makerReject(id, userId, remarks) {
  const res = await client.post(`/loans/${id}/maker/reject`, { userId, remarks });
  return res.data;
}

export async function checkerApprove(id, userId, remarks) {
  const res = await client.post(`/loans/${id}/checker/approve`, { userId, remarks });
  return res.data;
}

export async function checkerReject(id, userId, remarks) {
  const res = await client.post(`/loans/${id}/checker/reject`, { userId, remarks });
  return res.data;
}
