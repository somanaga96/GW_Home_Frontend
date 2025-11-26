const API = "http://localhost:8080/api/quotes";

export async function getQuote(id){
  const res = await fetch(`${API}/${id}`);
  return res.json();
}
export async function createQuote(payload){
  const res = await fetch(API, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  return res.json();
}
export async function updateQuote(id, payload){
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  return res.json();
}
