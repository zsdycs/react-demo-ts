export const loginSuccessCreator = (userName: any) => {
  return {type: 'LOGIN_SUCCESS', userName: userName};
};

export const initLoginState = {
  login: false,
  userName: 'Not login',
};

export const loginReducer = (state = initLoginState, action: any) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {login: true, userName: action.userName};
    default:
      return state;
  }
};
