export interface User{
  id: string;
  email: string;
  name: string;
  password: string;
  role: 'customer' | 'admin';
}

export interface CreateUserDTO extends Omit<User, 'id'>{}
