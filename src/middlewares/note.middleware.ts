import { Request, Response, NextFunction } from "express";
import { UserDatabase } from "../database/users.database";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.errors";

export class NoteMiddleware {
  public static validUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = new UserDatabase().findById(id);

      if (!user) {
        return RequestError.notFound(res, "User not found");
      }
      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public static validFieldsCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return RequestError.fieldNotProvided(
          res,
          "Title and content are required"
        );
      }
      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public static validFieldsUptade(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id, noteId } = req.params;

      const user = new UserDatabase().findById(id);

      const note = user?.notes.find((note) => note.id === noteId);

      if (!note) {
        return RequestError.notFound(res, "Note not found");
      }
      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
