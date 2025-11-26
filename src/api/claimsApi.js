const API = "http://localhost:8080/api/claims";

export const saveClaims = async (data) =>
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then((r) => r.json());

export const getClaims = async (id) =>
  fetch(`${API}/${id}`).then((r) => r.json());
