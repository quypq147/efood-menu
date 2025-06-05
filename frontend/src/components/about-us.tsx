import React from 'react'

function AboutUs() {
  return (
    <div className="max-w-2xl mx-auto p-6   rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Về Efood Menu</h1>
      <p className="mb-2">
        <b>Efood Menu</b> là nền tảng quản lý thực đơn và đặt món ăn trực tuyến dành cho nhà hàng, quán ăn và khách hàng hiện đại.
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Quản lý thực đơn dễ dàng, cập nhật món ăn nhanh chóng.</li>
        <li>Khách hàng có thể xem menu, chọn món và đặt hàng trực tuyến.</li>
        <li>Hỗ trợ quản lý đơn hàng, đánh giá món ăn và in hóa đơn tiện lợi.</li>
        <li>Phân quyền tài khoản: Admin, Nhân viên, Khách hàng.</li>
      </ul>
      <p className="mb-2">
        Chúng tôi hướng tới việc số hóa quy trình phục vụ, giúp nhà hàng tiết kiệm thời gian, tăng hiệu quả và mang lại trải nghiệm tốt nhất cho khách hàng.
      </p>
      <p>
        Mọi thắc mắc hoặc góp ý, vui lòng liên hệ: <a href="mailto:support@efoodmenu.vn" className="text-blue-600 underline">support@efoodmenu.vn</a>
      </p>
    </div>
  )
}

export default AboutUs