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

export const getGoalAddJson = ({ uid: u_id, id: g_id, title: g_title, detail: g_detail, deadline, complete }) => {
  const goal = {
    u_id,
    g_id,
    g_title,
    g_detail,
    g_deadline: deadline.toISOString().split("T")[0],
    g_complete: complete ? 1 : 0
  };
  return JSON.stringify(goal);
};

export const getGoalDeleteJson = g_id => {
  return JSON.stringify({ g_id });
};

export const getGoalUpdateJson = ({ id: g_id, complete, dateCompleted }) => {
  const goal = {
    g_id,
    g_complete: complete ? 1 : 0,
    g_date_completed: complete ? dateCompleted.toISOString().split("T")[0] : ""
  };
  return JSON.stringify(goal);
};
