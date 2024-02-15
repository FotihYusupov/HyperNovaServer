import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return { message: 'Server is run on port 5001!' };
  }
}
