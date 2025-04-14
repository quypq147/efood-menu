// auth.service.ts
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
  [x: string]: any;
  constructor(
    private prisma: PrismaService,
    private MailService: MailService,
    private jwtService: JwtService,
  ) {}

  async register(data: { name: string; email: string; password: string }) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new Error('Email đã được đăng ký.');
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
        name: data.name,
        email: data.email,
        password: hashed,
        roleId: defaultRole.id,
        isEmailVerified: false,
        emailVerifyToken: token,
      },
    });
    await this.MailService.sendVerifyEmail(user.email, token);
    return { message: 'Đăng ký thành công', user };
  }

  async login(data: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
      include: { role: true }, // ✅ thêm dòng này
    });
    

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Sai email hoặc mật khẩu');
    }

    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Bạn chưa xác minh email.');
    }

    const payload = { sub: user.id, email: user.email, role: user.roleId };
    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        roleName : user.role.name,
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
}
