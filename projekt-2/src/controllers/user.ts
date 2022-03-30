import { RequestHandler } from "express";
import { readUsersFromFile, saveUsersToken } from "../fileOperations";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

const SECRET = "SECRET_CODE_HERE";
const USERS_PATH = "data/users.json";
const USERSTOKEN_PATH = "data/auth/";

const checkUserAndPassword = (
  users: User[],
  typedLogin: string,
  typedPassword: string
) => {
  const selecteduser = users.find((user) => user.login === typedLogin);
  if (selecteduser && selecteduser.password === typedPassword) return true;
  return false;
};

export const login: RequestHandler = async (req, res, next) => {
  const usersList = await readUsersFromFile(USERS_PATH);
  const user = req.body.login;
  const password = req.body.password;

  if (checkUserAndPassword(usersList, user, password)) {
    res.status(200).send(`200 ${user} you are logged in`);
    const token = jwt.sign({ userName: user }, SECRET);
    saveUsersToken(`${USERSTOKEN_PATH}${user}.json`, token);
  } else res.sendStatus(401);
};

/*

pobieranie danych z nagłówków http - obiekt req.headers (np. req.headers.authorization)

tworzenie tokenu:
  const token = jwt.sign(payload, secret)
weryfikacja tokenu:
  const payload = jwt.verify(token, secret)
jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' }, function(err, token) {
  console.log(token);
});
const authData = req.headers.authorization
const token = authData?.split(' ')[1]?? '';
const payload = jwt.verify(token,secret)

*/
