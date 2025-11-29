const API = "http://localhost:8080/api";

async function request(path, options = {}) {
  const res = await fetch(API + path, options);
  if (!res.ok) throw new Error(`API Error ${res.status}`);
  return res.json();
}

export const getSubmission = (id) =>
  request(`/submission/${id}`);

export const createSubmission = (accountId) =>
  request(`/submission/create/${accountId}`, {
    method: "POST",
  });

export const updateSubmission = (id, payload) =>
  request(`/submission/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
