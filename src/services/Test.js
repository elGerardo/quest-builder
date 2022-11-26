let BASE_API_URL = "http://127.0.0.1:8000/api";

export class Test {

  async store(data) {
    let response = await fetch(`${BASE_API_URL}/test/store`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));

    return response;
  }

  async find(id) {
    let response = await fetch(`${BASE_API_URL}/test/find?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));

    return response;
  }

}
