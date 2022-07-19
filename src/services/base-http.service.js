/**
 * Clase base para llamar al backend:
 */

export default class HttpService {
  endpoint = process.env.VUE_APP_API_URL;

  async get() {
    const response = await fetch(this.endpoint);
    const data = response.json();

    return data;
  }

  async post(body) {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },

      body: JSON.stringify(body),
    });
    const data = response.json();

    return data;
  }

  async patch(id, body) {
    const response = await fetch(`${this.endpoint}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = response.json();

    return data;
  }

  async delete(id) {
    const response = await fetch(`${this.endpoint}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  }
}
