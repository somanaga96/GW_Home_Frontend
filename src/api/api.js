const API = "http://localhost:8080/api";

export async function searchAccounts(params) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([k, v]) => {
    if (v) query.append(k, v);
  });

  const res = await fetch(`${API}/accounts?${query.toString()}`);
  return res.json();
}

// ✅ ADD THIS
export async function createAccount(form) {
  const res = await fetch(`${API}/accounts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  return res.json();
}
