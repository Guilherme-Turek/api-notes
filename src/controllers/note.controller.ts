import { Request, Response } from "express";
import { Note, NoteStatus } from "../models/note.model";
import { UserDatabase } from "../database/users.database";
import { SuccessResponse } from "../util/sucess.response";
import { ServerError } from "../errors/server.errors";
import { RequestError } from "../errors/request.error";

export class NoteController {
  public create(req: Request, res: Response): Response {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const user = new UserDatabase().findById(id);

      const note = new Note(title, content);

      user?.notes.push(note);

      return SuccessResponse.created(res, "Note created", note);
    } catch (error) {
      return ServerError.genericError(res, error);
    }
  }

  public update(req: Request, res: Response): Response {
    try {
      const { id, noteId } = req.params;
      const { title, content, status } = req.body;

      const user = new UserDatabase().findById(id);

      const note = user?.notes.find((note) => note.id === noteId);

      if (!note) {
        return RequestError.notFound(res, "Note not found");
      }

      if (title) {
        note.title = title;
      }
      if (content) {
        note.content = content;
      }
      if (status) {
        if (status in NoteStatus) {
          note.status = status;
        } else {
          return RequestError.invalidData(res, "Invalid status");
        }
      }

      return SuccessResponse.ok(res, "Note updated", note);
    } catch (error) {
      return ServerError.genericError(res, error);
    }
  }

  public delete(req: Request, res: Response): Response {
    try {
      const { id, noteId } = req.params;

      const user = new UserDatabase().findById(id);
      if (!user) {
        return RequestError.notFound(res, "User not found");
      }
      const notes = user.notes;
      const noteIndex = notes.findIndex((note) => note.id === noteId);

      if (noteIndex < 0) {
        return RequestError.notFound(res, "Note not found");
      }

      user?.notes.splice(noteIndex, 1);

      return SuccessResponse.ok(res, "Note deleted", user?.notes);
    } catch (error) {
      return ServerError.genericError(res, error);
    }
  }

  public listAllNotes(req: Request, res: Response): Response {
    try {
      const { id } = req.params;

      const user = new UserDatabase().findById(id);

      const notes = user?.notes.map((note) => ({
        id: note.id,
        title: note.title,
        content: note.content,
        status: note.status,
      }));

      return SuccessResponse.ok(res, "Notes listed", notes);
    } catch (error) {
      return ServerError.genericError(res, error);
    }
  }
}
