import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @Post()
  createRole(@Body() dto: { name: string }) {
    return this.roleService.createRole(dto);
  }

  @Patch(':id')
  updateRole(
    @Param('id') id: string,
    @Body()
    dto: {
      name?: string;
      description?: string;
      permissionIds?: number[];
      userIds?: number[];
    },
  ) {
    return this.roleService.updateRole(+id, dto);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: string) {
    return this.roleService.deleteRole(+id);
  }
}
