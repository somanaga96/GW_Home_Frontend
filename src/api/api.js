// -----------------------------------------
// API BASE URL
// -----------------------------------------
const API = "http://localhost:8080/api";


// -----------------------------------------
// SEARCH ACCOUNTS
// GET /api/accounts?brandName=...&firstName=...
// -----------------------------------------
export async function searchAccounts(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value && value.trim() !== "") {
      query.append(key, value);
    }
  });

  const res = await fetch(`${API}/accounts?${query.toString()}`);
  return res.json();
}


// -----------------------------------------
// CREATE ACCOUNT
// POST /api/accounts
// -----------------------------------------
export async function createAccount(data) {
  const res = await fetch(`${API}/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error("Failed to create account:", await res.text());
    throw new Error("Account creation failed");
  }

  return res.json();
}


// -----------------------------------------
// GET ACCOUNT BY ID
// GET /api/accounts/{id}
// -----------------------------------------
export async function getAccount(id) {
  const res = await fetch(`${API}/accounts/${id}`);

  if (!res.ok) {
    console.error("Failed to fetch account:", await res.text());
    throw new Error("Account not found");
  }

  return res.json();
}
