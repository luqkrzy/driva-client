export interface User {
  type?: string;
  token?: string;
  id?: number;
  username: string;
  email: string;
  roles?: string[];
}
