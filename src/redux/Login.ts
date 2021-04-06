export const loginSuccessCreator = (userName: any) => {
  return {type: 'LOGIN_SUCCESS', userName: userName};
};

const initLoginState = {
  login: false,
  userName: 'Not login',
};

const loginReducer = (state = initLoginState, action: any) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {login: true, userName: action.userName};
    default:
      return state;
  }
};

export { initLoginState, loginReducer };
