
/**
 * Utility to create a resized thumbnail from a Data URL or Image element.
 * Helps prevent localStorage/IndexedDB bloat.
 */
export const createThumbnail = (
  imageSrc: string,
  maxWidth: number = 400,
  maxHeight: number = 400
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      // Calculate new dimensions maintaining aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context failed'));
        return;
      }
      
      ctx.drawImage(img, 0, 0, width, height);
      
      // Use JPEG with 0.7 quality for good compression-to-quality ratio
      resolve(canvas.toDataURL('image/jpeg', 0.7));
    };
    
    img.onerror = (err) => reject(err);
  });
};
