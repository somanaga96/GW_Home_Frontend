// const API = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

// async function request(path, options = {}) {
//   const res = await fetch(API + path, options);
//   if (!res.ok) throw new Error(`API Error ${res.status}`);
//   return res.json();
// }

// // ✔ Get all submissions
// export const getSubmissions = () =>
//   request(`/submission`);

// // ✔ Get one submission
// export const getSubmission = (id) =>
//   request(`/submission/${id}`);

// // ✔ Create submission for an account
// export const createSubmission = (accountId) =>
//   request(`/submission/create/${accountId}`, {
//     method: "POST",
//   });

// // ✔ Update submission
// export const updateSubmission = (id, payload) =>
//   request(`/submission/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });
