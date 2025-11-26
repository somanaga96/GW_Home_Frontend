const API = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

async function request(path, opts = {}) {
  const res = await fetch(API + path, opts);
  if (!res.ok) throw new Error(`API ${res.status} ${res.statusText}`);
  return res.json();
}

export const getPolicies = () => request("/policies");
export const getPolicy = (id) => request(`/policies/${id}`);
export const createPolicy = (payload) => request("/policies", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
});
export const updatePolicy = (id, payload) => request(`/policies/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
});
