import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        birthDate: true,
        role: {
          select: {
            id: true,
             name: true },
        },
      },
    });
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const data: any = {
      ...dto,
    };
  
    // Convert birthDate nếu có
    if (dto.birthDate) {
      data.birthDate = new Date(dto.birthDate);
    }
  
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
  async getPermissions(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
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
  
    return user?.role?.permissions.map((rp) => rp.permission.name);
  }
  async findAll() {
    return this.prisma.user.findMany({
      include: {
        role: true,
      },
    });
  }
  async getUserRole(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: true,
      },
    });
  
    if (!user) throw new NotFoundException('User not found');
    return { role: user.role };
  }
  async updateUserRole(userId: number, roleId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Người dùng không tồn tại');
  
    return this.prisma.user.update({
      where: { id: userId },
      data: { roleId },
    });
  }
}
