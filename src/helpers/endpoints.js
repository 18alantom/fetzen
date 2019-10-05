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
    delete: "/workouts/delete", // DELETE
    last: "/workouts/last" // POST
  },
  exercises: {
    update: "/exercises/update", // PUT
    stats: "/exercises/stats" // POSt
  },
  ping: "/ping" // GET
};

export const getEndPoint = (URL, endpoint) => {
  return URL + endpoint;
};
