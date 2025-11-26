const API = "http://localhost:8080/api/your-needs";

export const saveYourNeeds = async (data) =>
  fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then((res) => res.json());

export const getYourNeeds = async (id) =>
  fetch(`${API}/${id}`).then((res) => res.json());
