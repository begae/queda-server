import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    return null;
  }

  async signup(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user) throw new BadRequestException('email already registered');
    const newUser = await this.userService.create(email, password);
    return newUser;
  }

  async signin(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException();
    const match = password == user.password;
    if (!match) throw new UnauthorizedException();
    return {
      accessToken: this.jwtService.sign({ sub: user.id }),
    };
  }
}
