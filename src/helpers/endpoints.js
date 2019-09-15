export const endpoints = {
  users: {
    login: "/users/login", // POST
    register: "/users/register", // POST
    weightUpdate: "/users/weight", // POST
    weightInsert: "/users/weight", // PUT
    delete: "/users/delete" // DELETE
  },
  goals: {
    add: "/goals/add", // POST
    update: "/goals/update", // PUT
    delete: "/goals/delete" // DELETE
  },
  workouts: {
    add: "/workouts/add", // POST
    update: "/workouts/update", // PUT
    done: "/workouts/done", // PUT
    delete: "/workouts/delete" // DELETE
  },
  exercises: {
    update: "/exercises/update" // PUT
  },
  ping: "/ping" // GET
};

export const getEndPoint = (URL, endpoint) => {
  return URL + endpoint;
};
