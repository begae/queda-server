import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { RefreshToken } from '../entity/refresh-token.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async signup(email: string, password: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let error: Error;
    try {
      const user = await this.userService.findOneByEmail(email);
      if (user) throw new BadRequestException('email already registered');
      const userEntity = queryRunner.manager.create(User, { email, password });
      await queryRunner.manager.save(userEntity);
      const accessToken = this.generateAccessToken(userEntity.id);
      const refreshToken = this.generateRefreshToken(userEntity.id);
      const refreshTokenEntity = queryRunner.manager.create(RefreshToken, {
        user: { id: userEntity.id },
        token: refreshToken,
      });
      await queryRunner.manager.save(refreshTokenEntity);
      await queryRunner.commitTransaction();
      return { id: userEntity.id, accessToken, refreshToken };
    } catch (e) {
      await queryRunner.rollbackTransaction();
      error = e;
    } finally {
      await queryRunner.release();
      if (error) throw error;
    }
  }

  async signin(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException();
    const match = password == user.password;
    if (!match) throw new UnauthorizedException();
    const refreshToken = this.generateRefreshToken(user.id);
    await this.updateRefreshToken(user.id, refreshToken);
    return {
      accessToken: this.generateAccessToken(user.id),
      refreshToken,
    };
  }

  async refresh(token: string, userId: string) {
    const entity = await this.refreshTokenRepository.findOneBy({ token });
    if (!entity) throw new BadRequestException();
    const accessToken = this.generateAccessToken(userId);
    const refreshToken = this.generateRefreshToken(userId);
    entity.token = refreshToken;
    await this.refreshTokenRepository.save(entity);
    return { accessToken, refreshToken };
  }

  private generateAccessToken(userId: string) {
    const payload = { sub: userId, tokenType: 'access' };
    return this.jwtService.sign(payload, { expiresIn: '1d' });
  }

  private generateRefreshToken(userId: string) {
    const payload = { sub: userId, tokenType: 'refresh' };
    return this.jwtService.sign(payload, { expiresIn: '30d' });
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    let entity = await this.refreshTokenRepository.findOneBy({
      user: { id: userId },
    });
    if (entity) {
      entity.token = refreshToken;
    } else {
      entity = this.refreshTokenRepository.create({
        user: { id: userId },
        token: refreshToken,
      });
    }
    await this.refreshTokenRepository.save(entity);
  }
}
