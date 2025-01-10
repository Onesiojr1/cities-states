import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth';
import { UserService } from '../user/user.service';

const EXPIRE_TIME = 3600  * 1000

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async login(dto:LoginDto) {
    const user = await this.validateUser(dto)
    const payload = {
      username: user.email,
      sub: {
        name: user.role,
      }
    }

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          secret: process.env.JWT_SECRETKEY,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.JWT_REFRESHTOKEN,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      }
    }
  }

  async validateUser(dto:LoginDto) {
    const user =await this.userService.findByEmail(dto.username);

    if(user && (await compare(dto.password, user.password))) {
      const  { password, ...result } = user

      return result
    }

    throw new UnauthorizedException()
  }

  async refreshToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.sub
    }

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRETKEY,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESHTOKEN,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    }
  }
}
