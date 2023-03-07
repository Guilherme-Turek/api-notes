import { v4 as createUuid } from "uuid";

export enum NoteStatus {
  ACTIVE = "active",
  FILED = "filed",
}

export class Note {
  private _id: string;
  private _title: string;
  private _content: string;
  private _status: NoteStatus;

  constructor(
    title: string,
    content: string,
    status: NoteStatus = NoteStatus.ACTIVE
  ) {
    this._id = createUuid();
    this._title = title;
    this._content = content;
    this._status = status;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get status(): NoteStatus {
    return this._status;
  }

  set status(value: NoteStatus) {
    this._status = value;
  }
}
