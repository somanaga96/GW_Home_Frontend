const API = "http://localhost:8080/api/property";

export const saveProperty = async (data) =>
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then((r) => r.json());

export const updateProperty = async (id, data) =>
  fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then((r) => r.json());

export const getProperty = async (id) =>
  fetch(`${API}/${id}`).then((r) => r.json());
