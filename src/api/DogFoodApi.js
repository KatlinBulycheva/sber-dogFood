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
    }).then((res) => {
      if (res.status === 404) return { _id: id };
      return res.json();
    })));
  }

  async getProductById(id, token) {
    this.checkToken(token);

    const res = await fetch(`${this.baseURL}/products/${id}`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
      }
    });

    return res.json();
  }

  async getUserById(id, token) {
    this.checkToken(token);

    const res = await fetch(`${this.baseURL}/v2/sm9/users/${id}`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
      }
    });

    return res.json();
  }

  async postNewProduct(values, token) {
    this.checkToken(token);

    const res = await fetch(`${this.baseURL}/products`, {
      method: "POST",
      headers: {
        authorization: this.getAuthorizationHeader(token),
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (res.status === 400) {
      throw new Error(`Не корректно заполнено одно из полей`);
    }

    return res.json();
  }

  async postNewReview(values, token, productId) {
    this.checkToken(token);

    const res = await fetch(`${this.baseURL}/products/review/${productId}`, {
      method: "POST",
      headers: {
        authorization: this.getAuthorizationHeader(token),
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (res.status === 400) {
      throw new Error(`Не корректно заполнено одно из полей`);
    }

    return res.json();
  }

  async deleteReview(productId, token, reviewId) {
    this.checkToken(token);

    const res = await fetch(`${this.baseURL}/products/review/${productId}/${reviewId}`, {
      method: "DELETE",
      headers: {
        authorization: this.getAuthorizationHeader(token)
      }
    });

    if (res.status === 403) {
      throw new Error(`Невозможно удалить отзыв`);
    }

    return res.json();
  }

  async patchEditProduct(token, productId, values) {
    this.checkToken(token);

    const res = await fetch(`${this.baseURL}/products/${productId}`, {
      method: "PATCH",
      headers: {
        authorization: this.getAuthorizationHeader(token),
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });

    return res.json();
  }

  async deleteProduct(token, productId) {
    this.checkToken(token);

    const res = await fetch(`${this.baseURL}/products/${productId}`, {
      method: "DELETE",
      headers: {
        authorization: this.getAuthorizationHeader(token),
      }
    });

    return res.json();
  }

  async getReviewsByProductId(token, productId) {
    this.checkToken(token);

    const res = await fetch(`${this.baseURL}/products/review/${productId}`, {
      headers: {
        authorization: this.getAuthorizationHeader(token),
      }
    });

    return res.json();
  }
}

export const dogFoodApi = new DogFoodApi({ baseURL: 'https://api.react-learning.ru' });
