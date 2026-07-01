// json-server calls (localhost:3001) - run with: npm run server
const BASE_URL = "http://localhost:3001";

async function request(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Local server request failed (${res.status})`);
  }
  // delete comes back empty, don't let .json() choke on it
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export function getAll(resource) {
  return request(`${BASE_URL}/${resource}`);
}

export function createItem(resource, item) {
  return request(`${BASE_URL}/${resource}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
}

export function updateItem(resource, id, item) {
  return request(`${BASE_URL}/${resource}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
}

export function deleteItem(resource, id) {
  return request(`${BASE_URL}/${resource}/${id}`, {
    method: "DELETE",
  });
}
