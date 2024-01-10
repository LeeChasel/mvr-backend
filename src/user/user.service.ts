import { Get, Injectable } from '@nestjs/common';

type User = {
  username: string;
  password: string;
};

@Injectable()
export class UserService {
  private readonly users: User[] = [
    {
      username: 'admin',
      password: 'admin',
    },
    {
      username: 'user',
      password: 'user',
    },
  ];

  @Get()
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
