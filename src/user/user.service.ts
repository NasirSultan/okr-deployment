import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findAll() {
    return [
      { id: 1, name: 'Nasir' },
      { id: 2, name: 'Ali' },
    ];
  }
}
