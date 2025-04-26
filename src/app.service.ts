import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const msg: string = 'hi mony';
    return msg;
  }
}
