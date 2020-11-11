export const logInRequest = (name = '', password = '') =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (name.toLowerCase() + '$' + password === 'admin$123456') {
        res({ name, role: 'admin' });
      } else if (
        name.toLowerCase() + '$' + password === 'user1$654321' ||
        name.toLowerCase() + '$' + password === 'user2$qwerty'
      ) {
        res({ name, role: 'user' });
      } else {
        rej('Failed');
      }
    }, 1000);
  });

export const addNewsItemRequest = (newsItem) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res(newsItem);
    }, 1000);
  });
