import { REDUX_LS_KEY } from "../utils/constants";

export const initState = {
  user: {
    name: '',
    about: '',
    avatar: '',
    email: '',
    token: '',
    // productIds: []
  },
  filter: {
    search: ''
  },
  cart: [],
  favorites: []
};

export const getInitState = () => {
  const dataFromLS = localStorage.getItem(REDUX_LS_KEY);

  return dataFromLS ? JSON.parse(dataFromLS) : initState;
};
