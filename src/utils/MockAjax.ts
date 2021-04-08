const result = {
  success: true,
  message: 'mock date',
  data: '',
};

interface Result {
  success: boolean,
  code: number,
  message: string,
  data: string,
}

const mockPromise = (callback: any) => {
  return new Promise<Result>(resolve => {
    setTimeout(callback, 1000, resolve);
  });
};

class MockAjax {

  getCurrentUser() {
    return mockPromise((resolve: Function) => {
      result.success = true;
      result.data = '1';
      resolve(result);
    });
  }

  login(username: string, password: string) {
    return mockPromise((resolve: Function) => {
      if (username === 'admin' && password === 'admin') {
        result.success = true;
        result.data = username;
        resolve(result);
      } else {
        result.success = false;
        result.message = 'ユーザー名かパスワードが無効';
        resolve(result);
      }
    });
  }
}


export default MockAjax;
