import uuid from "uuid/v1";
export const getLoginJson = ({ username: u_uname, password: u_passw }) => {
  const user = { u_uname, u_passw };
  return JSON.stringify(user);
};

export const getRegisterJson = ({ username: u_uname, password: u_passw, height, weight, "first name": u_first_name, "last name": u_last_name }) => {
  const user = {
    u_id: uuid(),
    u_uname,
    u_passw,
    u_first_name,
    u_last_name,
    u_height: parseFloat(height),
    u_weight: parseFloat(weight),
    u_date_created: new Date().toISOString().split("Z")[0]
  };
  return JSON.stringify(user);
};
