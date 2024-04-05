import { apiUrl } from "./get-events";

type CreateUser = {
  name: string;
  email: string;
  password: string;
};

export function createUser(input: CreateUser) {
  return fetch(apiUrl + "/auth/signup", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  }).then((res) => {
    return res.json();
  });
}

type LogInInput = {
  email: string;
  password: string;
};
export function siginUser(input: LogInInput) {
  return fetch(apiUrl + "/auth/signin", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  }).then((res) => {
    return res.json();
  });
}
