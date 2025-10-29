import api from './client';

export const listApplications = async (userId = 1) => {
  const { data } = await api.get('/api/applications', { params: { userId } });
  return data;
};

export const listByStatus = async (status) => {
  const { data } = await api.get('/api/applications', { params: { status } });
  return data;
};

export const getApplication = async (id) => {
  const { data } = await api.get(`/api/applications/${id}`);
  return data;
};

export const createApplication = async ({ userId = 1, loanType, amount, tenure, formData }) => {
  const { data } = await api.post('/api/applications', {
    userId,
    loanType,
    amount,
    tenure,
    formData,
  });
  return data;
};

export const updateApplicationApi = async (id, { fields = {}, formData }) => {
  const { data } = await api.put(`/api/applications/${id}`, { fields, formData });
  return data;
};

export const sendToChecker = async (id) => {
  const { data } = await api.post(`/api/applications/${id}/send-to-checker`);
  return data;
};

export const approveApplication = async (id) => {
  const { data } = await api.post(`/api/applications/${id}/approve`);
  return data;
};

export const rejectApplication = async (id, remarks) => {
  const { data } = await api.post(`/api/applications/${id}/reject`, { remarks });
  return data;
};
