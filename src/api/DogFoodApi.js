class DogFoodApi {
  constructor({ baseURL }) {
    this.baseURL = baseURL;
  }

  // eslint-disable-next-line class-methods-use-this
  getAuthorizationHeader(token) {
    return `Bearer ${token}`;
  }

  // eslint-disable-next-line class-methods-use-this
  checkToken(token) {
    if (!token) throw new Error('Отсутствует токен');
  }

  async signIn(values) {
    const res = await fetch(`${this.baseURL}/signin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (res.status >= 400) {
      throw new Error(`Неправильные логин или пароль`);
    }
    return res.json();
  }

  async signUp(values) {
    const res = await fetch(`${this.baseURL}/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (res.status === 400) {
      throw new Error(`Некорректно заполнено одно из полей`);
    }
    if (res.status === 409) {
      throw new Error(`Пользователь c указанным email уже существует`);
    }
    return res.json();
  }

  async getAllProducts(searchValue, token) {
    this.checkToken(token);

    const res = await fetch(`${this.baseURL}/products/search?query=${searchValue}`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
      }
    });

    return res.json();
  }

  async getProductsByIds(ids, token) {
    this.checkToken(token);

    return Promise.all(ids.map((id) => fetch(`${this.baseURL}/products/${id}`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
      }
    }).then((res) => res.json())));
  }
}

export const dogFoodApi = new DogFoodApi({ baseURL: 'https://api.react-learning.ru' });
