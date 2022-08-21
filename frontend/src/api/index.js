import axios from 'axios';

function registerUser(userData) {
  // 요청할 URL
  const url = 'http://localhost:3000/user/signup';
  return axios.post(url, userData);
}

export { registerUser };

