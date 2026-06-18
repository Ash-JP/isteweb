const cloudinary = require('cloudinary').v2;

// 1. Configure Cloudinary with inline credentials
cloudinary.config({
  cloud_name: 'di9mxfgam',
  api_key: '648983153551674',
  api_secret: 'Dm6i-kZDRuRk-fucetAnYD-LF7U'
});

async function run() {
  try {
    console.log("Uploading image...");
    
    // 2. Upload an image from Cloudinary's demo domains
    const uploadResult = await cloudinary.uploader.upload(
      'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
      { public_id: 'my_sample_image' }
    );
    
    console.log("\n--- Upload Successful ---");
    console.log("Secure URL:", uploadResult.secure_url);
    console.log("Public ID:", uploadResult.public_id);
    
    // 3. Get image details (metadata)
    const { width, height, format, bytes } = uploadResult;
    console.log("\n--- Image Details ---");
    console.log("Width:", width);
    console.log("Height:", height);
    console.log("Format:", format);
    console.log("File Size (bytes):", bytes);
    
    // 4. Transform the image
    // f_auto: Automatic format selection (delivers the best format for the user's browser, like WebP/AVIF)
    // q_auto: Automatic quality (compresses the image as much as possible without visible quality loss)
    const transformedUrl = cloudinary.url(uploadResult.public_id, {
      fetch_format: 'auto',
      quality: 'auto'
    });
    
    console.log("\n--- Transformation ---");
    console.log("Done! Click link below to see optimized version of the image. Check the size and the format.");
    console.log("Transformed URL:", transformedUrl);
    
  } catch (error) {
    console.error("Error during Cloudinary flow:", error);
  }
}

run();
