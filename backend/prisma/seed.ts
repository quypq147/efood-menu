import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const permissions = [
  'Đăng Kí Tài Khoản',
  'Đăng Nhập Tài Khoản',
  'Xóa Tài Khoản',
  'Quản lý tài khoản',
  'Chỉnh Sửa Tài Khoản',
  'Tạo Menu',
  'Xem Menu',
  'Xem Thông Tin Đơn Đặt Hàng',
  'Cập nhật Menu',
  'Thêm món ăn vào Menu',
  'Sửa món ăn trong Menu',
  'Xóa món ăn khỏi Menu',
  'Chọn món ăn trên Menu',
  'Thanh Toán',
  'In hóa đơn',
  'Đánh Giá Món Ăn',
];

// Gán permission theo tên role
const rolePermissionsMap: Record<string, string[]> = {
  Admin: permissions, // full quyền
  Staff: [
    'Đăng Kí Tài Khoản',
    'Đăng Nhập Tài Khoản',
    'Xóa Tài Khoản',
    'Quản lý tài khoản',
    'Chỉnh Sửa Tài Khoản',
    'Tạo Menu',
    'Xem Menu',
    'Xem Thông Tin Đơn Đặt Hàng',
    'Cập nhật Menu',
    'Thêm món ăn vào Menu',
    'Sửa món ăn trong Menu',
    'Xóa món ăn khỏi Menu',
    'In hóa đơn',
  ],
  Customer: [
    'Đăng Kí Tài Khoản',
    'Đăng Nhập Tài Khoản',
    'Chỉnh Sửa Tài Khoản',
    'Xem Menu',
    'Xem Thông Tin Đơn Đặt Hàng',
    'Chọn món ăn trên Menu',
    'Thanh Toán',
    'Đánh Giá Món Ăn',
  ],
};

async function main() {
  // Step 1: Tạo permissions nếu chưa có
  const createdPermissions = await Promise.all(
    permissions.map((perm) =>
      prisma.permission.upsert({
        where: { name: perm },
        update: {},
        create: { name: perm },
      })
    )
  );

  // Step 2: Gán quyền cho từng role
  for (const [roleName, permissionNames] of Object.entries(rolePermissionsMap)) {
    const role = await prisma.role.findUnique({
      where: { name: roleName },
    });

    if (!role) {
      console.warn(`❌ Vai trò "${roleName}" chưa tồn tại!`);
      continue;
    }

    // Xóa các quyền cũ nếu có
    await prisma.rolePermission.deleteMany({
      where: { roleId: role.id },
    });

    const matchedPermissions = createdPermissions.filter((p) =>
      permissionNames.includes(p.name)
    );

    // Gán mới
    await prisma.rolePermission.createMany({
      data: matchedPermissions.map((perm) => ({
        roleId: role.id,
        permissionId: perm.id,
      })),
    });

    console.log(`✅ Gán quyền cho role: ${roleName}`);
  }

  console.log('🌱 Seed permissions & role-permissions completed!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi seed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());



