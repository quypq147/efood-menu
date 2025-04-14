// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST ?? 'smtp.gmail.com',
    port: process.env.MAIL_PORT ?? 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  async sendVerifyEmail(to: string, token: string) {
    const url = `${process.env.APP_URL}/auth/verify-email?token=${token}`;
    await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject: 'Xác minh tài khoản Efood',
      html: `
        <h3>Xác minh tài khoản</h3>
        <p>Bấm vào nút bên dưới để xác minh tài khoản:</p>
        <a href="${url}" style="padding:10px 20px;background:#ff6b5c;color:white;border-radius:6px;text-decoration:none;">Xác minh</a>
        <p>Hoặc sao chép liên kết: <br/><code>${url}</code></p>
      `,
    });
  }

  async sendResetPasswordEmail(to: string, token: string) {
    const url = `${process.env.APP_URL}/auth/reset-password?token=${token}`;
    await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject: 'Khôi phục mật khẩu Efood',
      html: `
        <h3>Đặt lại mật khẩu</h3>
        <p>Bạn đã yêu cầu đặt lại mật khẩu.</p>
        <a href="${url}" style="padding:10px 20px;background:#ff6b5c;color:white;border-radius:6px;text-decoration:none;">Đặt lại mật khẩu</a>
        <p>Liên kết có hiệu lực trong 30 phút.</p>
      `,
    });
  }
}


