export interface User{
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface CreateUserDTO extends Omit<User, 'id'>{}
