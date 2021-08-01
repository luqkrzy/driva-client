export interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  phoneNumber?: number;
  token?: string;
  roles?: string[];
}

export class User implements IUser {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public username?: string,
    public email?: string,
    public phoneNumber?: number,
    public token?: string,
    public roles?: string[],
  ) {
  }
}
