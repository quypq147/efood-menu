import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { MailService } from '../mail/mail.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  @Post('register')
  register(
    @Body()
    body: {
      fullname: string;
      email: string;
      password: string;
      username?: string;
    },
  ) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(
    @Body()
    body: { emailOrUsername: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, user } = await this.authService.login(body);

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });

    // Sửa dòng này:
    return { user, token: accessToken };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return this.authService.logout();
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return { message: 'Email khôi phục đã được gửi.' };

    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 30);

    await this.prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExp: expires,
      },
    });

    await this.mailService.sendResetPasswordEmail(email, token);
    return { message: 'Email khôi phục đã được gửi.' };
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: { token: string; password: string }) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: dto.token,
        resetTokenExp: { gte: new Date() },
      },
    });

    if (!user) {
      throw new BadRequestException('Token không hợp lệ hoặc đã hết hạn');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashed,
        resetToken: null,
        resetTokenExp: null,
      },
    });

    return { message: 'Đặt lại mật khẩu thành công' };
  }
  @Post('verify-email')
verifyEmail(@Body('token') token: string) {
  return this.authService.verifyEmail(token);
}
  @Post('resend-verify-email')
  async resendEmail(@Body('emailOrUsername') value: string) {
    return this.authService.resendVerificationEmail(value);
  }
  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(
    @Req() req,
    @Body() body: { currentPassword: string; newPassword: string },
  ) {
    return this.authService.changePassword(req.user.id, body);
  }
}
