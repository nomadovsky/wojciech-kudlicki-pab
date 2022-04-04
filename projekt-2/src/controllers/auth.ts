import { Request, Response, RequestHandler } from "express";
import { readUsersFromFile, saveUsersToken } from "../fileOperations";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET = "SECRET_CODE_HERE";
const USERS_PATH = "data/users.json";

export const login: RequestHandler = async (req, res, next) => {
  const usersList = await readUsersFromFile(USERS_PATH);
  const { login, password } = req.body;
  try {
    const user = usersList.find((user) => user.login === login);
    if (!user) throw new Error(`User '${login}' not found`);

    const isUserValid = user.password === password;
    if (!isUserValid) throw new Error("Incorrect password");

    const token = jwt.sign({ userName: login }, SECRET);
    res
      .status(200)
      .send(`200 ${login} you are logged in. \n {"token": "${token}"}`);
  } catch {
    res.sendStatus(401);
  }
};

export const authenticateToken = (req: Request, res: Response) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) throw Error("Authorization header not found");
    const token: string = authHeader && authHeader.split(" ")[1];
    if (token === null || token === undefined) res.sendStatus(401);
    const payload = jwt.verify(token, SECRET) as { userName: string };
    if (payload) return payload.userName;

    // return payload.userName;
  } catch (err) {
    res.sendStatus(401);
  }
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
