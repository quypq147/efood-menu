export default function ForbiddenPage() {
  return (
      <div className="h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
          <h1 className="text-6xl font-extrabold">403</h1>
          <p className="mt-4 text-xl text-gray-400">
              Bạn không có quyền truy cập trang này.
          </p>
          <a
              href="/"
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
              Quay lại Trang chủ
          </a>
      </div>
  );
}