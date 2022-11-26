let BASE_API_URL = "http://127.0.0.1:8000/api";

export class Answer {
  async store(data) {
    let response = await fetch(`${BASE_API_URL}/answer/store`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));

    return response;
  }

  async find(test_id) {
    let response = await fetch(
      `${BASE_API_URL}/answer/find?test_id=${test_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .catch((error) => console.error(error));

      return response;
  }
}
