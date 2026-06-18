export default function cloudinaryLoader({ src, width, quality }) {
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];
  
  if (src.includes('res.cloudinary.com')) {
    // A standard Cloudinary URL has '/upload/' in it.
    const uploadIndex = src.indexOf('/upload/');
    if (uploadIndex !== -1) {
      // Split the URL at '/upload/' and insert our transformation parameters
      const beforeUpload = src.substring(0, uploadIndex + 8); // includes '/upload/'
      const afterUpload = src.substring(uploadIndex + 8);
      
      // If there are already transformations (like v123456789/), keep them
      return `${beforeUpload}${params.join(',')}/${afterUpload}`;
    }
  }

  // If it's a local image (e.g., /logo.png), append the width/quality to satisfy Next.js loader requirements
  // The Next.js static server will simply ignore the query parameters and serve the original image
  return `${src}?w=${width}&q=${quality || 75}`;
}
