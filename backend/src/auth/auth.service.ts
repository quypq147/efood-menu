import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  async register(data: {
    fullname: string;
    email: string;
    password: string;
    username?: string;
  }) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          data.username ? { username: data.username } : undefined,
        ].filter(Boolean) as any,
      },
    });

    if (existingUser) {
      throw new BadRequestException('Email hoặc username đã được sử dụng.');
    }

    const hashed = await bcrypt.hash(data.password, 10);
    const token = randomBytes(32).toString('hex');

    const defaultRole = await this.prisma.role.findFirst({
      where: { name: 'Customer' },
    });

    if (!defaultRole) {
      throw new Error('Vai trò mặc định Customer chưa được khởi tạo.');
    }

    const user = await this.prisma.user.create({
      data: {
        fullname: data.fullname,
        email: data.email,
        password: hashed,
        username: data.username ?? '',
        roleId: defaultRole.id,
        isEmailVerified: false,
        emailVerifyToken: token,
      },
    });

    await this.mailService.sendVerifyEmail(user.email, token);
    return {
      message: 'Đăng ký thành công. Vui lòng kiểm tra email để xác minh.',
      user,
    };
  }

  async login(data: { emailOrUsername: string; password: string }) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: data.emailOrUsername },
          { username: data.emailOrUsername },
        ],
      },
      include: {
        role: {
          include: {
            permissions: {
              include: { permission: true },
            },
          },
        },
      },
    });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Sai thông tin đăng nhập');
    }

    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Tài khoản chưa xác minh email');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.roleId,
    };

    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        roleId: user.roleId,
        roleName: user.role.name,
        permissions: user.role.permissions.map((rp) => rp.permission.name),
      },
    };
  }

  logout() {
    return { message: 'Đã đăng xuất' };
  }

  async verifyEmail(token: string) {
    const user = await this.prisma.user.findFirst({
      where: { emailVerifyToken: token },
    });

    if (!user) throw new BadRequestException('Token không hợp lệ');

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailVerifyToken: null,
      },
    });

    return { message: 'Xác minh email thành công. Bạn có thể đăng nhập.' };
  }
  async changePassword(
    userId: number,
    body: { currentPassword: string; newPassword: string },
  ) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('Người dùng không tồn tại');

    const passwordMatch = await bcrypt.compare(
      body.currentPassword,
      user.password,
    );
    if (!passwordMatch)
      throw new UnauthorizedException('Mật khẩu hiện tại không đúng');

    const hashed = await bcrypt.hash(body.newPassword, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    return { message: 'Đổi mật khẩu thành công' };
  }
}
