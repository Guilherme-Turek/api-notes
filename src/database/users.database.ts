import { User } from "../models/user.model";
import { users } from "./users";

export class UserDatabase {
  public findByUsername(username: string): User | undefined {
    return users.find((user) => user.name === username);
  }

  public findById(id: string): User | undefined {
    return users.find((user) => user.id === id);
  }

  public addUser(user: User): void {
    users.push(user);
  }

  public verifyLogin(username: string, password: string): User | undefined {
    return users.find(
      (user) => user.name === username && user.password === password
    );
  }
}
