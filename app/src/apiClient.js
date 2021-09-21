export const getTasks = () => _get("/api/tasks");
export const getContacts = () => _get("/api/contacts");

export const addTask = (name) => _post("/api/tasks", { name });

export const addContact = (name, email, phone, notes) =>
  _post("/api/contacts", { name, email, phone, notes });

const _get = async (url) => (await fetch(url)).json();

const _post = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let result;
  try {
    result = await response.json();
  } catch {}

  return result;
};
