import { v4 as createUuid } from "uuid";
import { Note, NoteStatus } from "./note.model";

export class User {
  private _id: string;
  private _username: string;
  private _password: string;
  private _notes: Note[];

  constructor(name: string, password: string) {
    this._id = createUuid();
    this._username = name;
    this._password = password;
    this._notes = [];
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._username;
  }

  set name(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get notes(): Note[] {
    return this._notes;
  }

  set notes(value: Note[]) {
    this._notes = value;
  }
}
