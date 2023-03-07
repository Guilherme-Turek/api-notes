import { Request, Response } from "express";
import { User } from "../models/user.model";
import { UserDatabase } from "../database/users.database";
import { SuccessResponse } from "../util/sucess.response";
import { ServerError } from "../errors/server.errors";

export class UserController {
  public create(req: Request, res: Response) {
    const { username, password, confirmPassword } = req.body;

    // Create user and save to database
    try {
      const user = new User(username, password);
      const userDb = new UserDatabase();
      userDb.addUser(user);

      return SuccessResponse.created(res, "User was successfully create", user);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const userDb = new UserDatabase();
      const user = userDb.verifyLogin(username, password);

      return SuccessResponse.ok(res, "User was successfully create", user);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
