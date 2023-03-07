import { Router } from "express";
import { NoteController } from "../controllers/note.controller";
import { UserController } from "../controllers/user.controller";
import { NoteMiddleware } from "../middlewares/note.middleware";
import { UserValidatorMiddleware } from "../middlewares/user.middleware";

export const userRoutes = () => {
  const app = Router();
  app.post(
    "/users",
    UserValidatorMiddleware.validateRegister,
    new UserController().create
  );

  app.post(
    "/login",
    UserValidatorMiddleware.validateLogin,
    new UserController().login
  );

  app.get(
    "/:id/notes",
    NoteMiddleware.validUser,
    new NoteController().listAllNotes
  );

  app.post(
    "/:id/notes",
    NoteMiddleware.validUser,
    NoteMiddleware.validFieldsCreate,
    new NoteController().create
  );

  app.put(
    "/:id/notes/:noteId",
    NoteMiddleware.validUser,
    new NoteController().update
  );

  app.delete(
    "/:id/notes/:noteId",
    NoteMiddleware.validUser,
    new NoteController().delete
  );

  return app;
};
