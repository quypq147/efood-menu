export const uploadImage = async (file: File, name: string): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', name); // Gửi tên món ăn cùng với hình ảnh

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Lỗi khi tải lên hình ảnh: ${response.statusText}`);
    }

    const data = await response.json();
    return data.url; // Trả về URL của hình ảnh
  } catch (error) {
    console.error('Lỗi khi tải lên hình ảnh:', error);
    throw error;
  }
};