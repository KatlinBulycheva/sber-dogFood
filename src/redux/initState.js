import { REDUX_LS_KEY } from "../utils/constants";

export const initState = {
  user: {
    group: '',
    name: '',
    email: '',
    about: '',
    avatar: '',
    id: '',
    token: ''
  }
};

export const getInitState = () => {
  const dataFromLS = localStorage.getItem(REDUX_LS_KEY);

  return dataFromLS ? JSON.parse(dataFromLS) : initState;
};
