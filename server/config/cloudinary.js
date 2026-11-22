import cloudinary from 'cloudinary.v2';
import CloudinaryStorage from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params : {
        folder : 'cafe_spot_hn',
        allowed_formats : ['jpg', 'jpeg', 'png', 'webp'],
    }
});

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: {fileSize: 5 * 1024 * 1024},
    fileFilter: (req,file,cb) => {
        if(!file.mimetype.startsWith("image/")){
            return cb(new Error("Chỉ cho phép file ảnh"))
        }
        cb(null,true);
    }

 });

export default  { cloudinary, upload };
