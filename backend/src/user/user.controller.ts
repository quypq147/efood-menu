import {
  Controller,
  Get,
  Patch,
  Req,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';
import { RequestWithUser } from '../common/interfaces/request-with-user';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req: RequestWithUser) {
    return this.userService.getUserById(req.user.id);
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  updateMe(@Req() req: RequestWithUser, @Body() dto: any) {
    return this.userService.updateUser(req.user.id, dto);
  }

  @Get(':id')
  getUserById(@Req() req: any) {
    return this.userService.getUserById(+req.params.id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('me/permissions')
  getUserPermissions(@Req() req: any) {
    return this.userService.getPermissions(req.user.id);
  }
  @Get()
  @UseGuards(JwtAuthGuard) // hoặc để public nếu cần
  findAll() {
    return this.userService.findAll();
  }
  @Get(':id/role')
  async getUserRole(@Param('id') id: number) {
    return this.userService.getUserRole(+id);
  }
  @Patch(':id/role')
  async updateUserRole(
    @Param('id') id: number,
    @Body() dto: { roleId: number },
  ) {
    return this.userService.updateUserRole(+id, dto.roleId);
  }
}
