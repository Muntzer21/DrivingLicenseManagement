import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class AppService {
  //  console.log('msg', msg);

  constructor(private readonly jwtService: JwtService) {}
  async getHello(): Promise<string> {
    const msg: string = 'hi mony';
    const token = await this.jwtService.signAsync({ id: 1, name: 'mohamed' });
    //  console.log('msg', msg);
    console.log('token  : ', token);

    return token;
  }

  
}
