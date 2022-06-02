const callApi = async <T>(api: string, method: string, data: T) => {
  const headers = new Headers({ "Content-type": "application/json" });
  const accessToken = window.localStorage.getItem("todo-token");

  if (accessToken) {
    headers.append("Authorization", `Bearer ${accessToken}`);
  }

  const options = {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  };

  const res = await fetch(process.env.REACT_APP_API_BASE_URL + api, options);
  const item = await res.json();
  if (item.token) {
    window.localStorage.setItem("todo-token", item.token);
  }
  if (res.status === 403) {
    throw new Error(item.error);
  }
  if (!res.ok) {
    throw new Error(item.error);
  }
  return item;
};

export const signin = async (userInfo: { email: string; password: string }) => {
  const res = await callApi("/auth/signin", "POST", userInfo);
  return res;
};

export const signup = async (userInfo: { username: string; email: string; password: string }) => {
  const res = await callApi("/auth/signup", "POST", userInfo);
  return res;
};

export default callApi;
