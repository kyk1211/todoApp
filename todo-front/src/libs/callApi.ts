const callApi = async <T>(api: string, method: string, data: T) => {
  const options = {
    method,
    headers: { "Content-type": "application/json" },
    body: data ? JSON.stringify(data) : null,
  };

  try {
    const res = await fetch(process.env.REACT_APP_API_BASE_URL + api, options);
    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error: ${error.message}`);
    }
  }
};

export default callApi;
