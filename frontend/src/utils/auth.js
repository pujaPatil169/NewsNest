// export const setAuthToken = (token) => {
//   if (token) {
//     localStorage.setItem('token', token);
//   } else {
//     localStorage.removeItem('token');
//   }
// };

// export const getAuthToken = () => {
//   return localStorage.getItem('token');
// };


export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};
