import { Request, Response, NextFunction } from "express";
import { UserDatabase } from "../database/users.database";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.errors";

export class UserValidatorMiddleware {
  public static validateRegister(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { username, password, confirmPassword } = req.body;

      // Check if username is provided
      if (!username) {
        return RequestError.fieldNotProvided(res, "Username");
      }

      // Check if password is provided
      if (!password) {
        return RequestError.fieldNotProvided(res, "Password");
      }

      // Check if confirm password is provided
      if (!confirmPassword) {
        return RequestError.fieldNotProvided(res, "Confirm password");
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        return RequestError.invalidData(res, "Passwords do not match");
      }

      // Check if user already exists
      const userDb = new UserDatabase();
      const userExist = userDb.findByUsername(username);
      if (userExist) {
        return RequestError.invalidData(res, "User already exists");
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public static validateLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      // Check if username is provided
      if (!username) {
        return RequestError.fieldNotProvided(res, "Username");
      }

      // Check if password is provided
      if (!password) {
        return RequestError.fieldNotProvided(res, "Password");
      }

      // Verify if the user exists and if the password is correct
      const userDb = new UserDatabase();
      const user = userDb.verifyLogin(username, password);
      if (!user) {
        return RequestError.notFound(res, "User not found");
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
