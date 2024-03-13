const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadOnCloudinary(file) {
    try {
        if (!file) return null;
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) {
                    console.error('Error uploading image:', error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }).end(file);
        });
        return result      
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = uploadOnCloudinary;
