
export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      // headers: this._headers
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(this._handleResponse)
  }

  setUserInfo({ name, about }) {
    //loading(true);
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      // headers: this._headers,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._handleResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      //method: 'GET',
      // headers: this._headers
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(this._handleResponse)
  }



  setUserAvatar({ avatar }) {

    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      // headers: this._headers,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._handleResponse)
  }

  addCard({ name, link, alt }) {
    //loading(true);
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      // headers: this._headers,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ name, link, alt })
    })
      .then(this._handleResponse)
  }

  putLike(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: 'PUT',
      // headers: this._headers,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(this._handleResponse)
  }

  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      // headers: this._headers,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(this._handleResponse)
  }

  removeLike(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: 'DELETE',
      // headers: this._headers,
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(this._handleResponse)
  }
}

const api = new Api({
  // baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  baseUrl: 'https://apimesto.students.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
    // authorization: '401963c2-8e67-4398-84ba-2d7df4f163fe'
    // authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmJiYmMwZmZlOWE0ZTY0MjZiMGI2Y2EiLCJpYXQiOjE2MDYyMzI2MDMsImV4cCI6MTYwNjgzNzQwM30.zjsSE-HfZLOR3DW8YusvijfMrmQUGC0dVjhiNR3kv8U'
  }
});

export { api }