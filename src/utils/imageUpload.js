// Image Upload Utility
// Handles image conversion to base64 and management

export const imageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const uploadImage = async (file, maxSizeKB = 500) => {
  if (!file) return null;

  // Validate file size
  if (file.size > maxSizeKB * 1024) {
    throw new Error(`Rasm ${maxSizeKB}KB dan kichik bo'lishi kerak`);
  }

  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Faqat JPEG, PNG, GIF yoki WebP formatdagi rasmlar qabul qilinadi');
  }

  try {
    const base64 = await imageToBase64(file);
    return base64;
  } catch (error) {
    throw new Error(`Rasm yuklashda xato: ${error.message}`);
  }
};

export const compressImage = async (file, quality = 0.8, maxWidth = 1200) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = () => reject(new Error('Rasmni yuklashda xato'));
    };
    reader.onerror = () => reject(new Error('Faylni o\'qishda xato'));
  });
};

export const deleteImage = (imageUrl) => {
  // If it's a base64 or local URL, we don't need to delete from server
  // Just return success
  return Promise.resolve();
};
