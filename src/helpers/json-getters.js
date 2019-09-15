export const getLoginJson = ({ username, password }) => {
  const user = { u_uname: username, u_passw: password };
  return JSON.stringify(user);
};
