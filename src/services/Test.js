let BASE_API_URL = "http://127.0.0.1:8000/api/";

export class Test {
  async store(data) {
    let response = await fetch(`${BASE_API_URL}storeTest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
    return response;
  }
}
