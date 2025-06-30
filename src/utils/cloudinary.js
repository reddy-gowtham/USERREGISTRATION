import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const uploadOncloudinary= async (localFilePath)=>{
        try {
            if(!localFilePath) return null;
            cloudinary.uploader.upload(localFilePath,{
                resource_type:"auto"
            })
        } catch (error) {
            fs.unlinkSync(localFilePath)
            return null;
        }
    }

    export { uploadOncloudinary }
    //  const uploadResult = await cloudinary.uploader
    //    .upload(
    //        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
    //            public_id: 'shoes',
    //        }
    //    )
    //    .catch((error) => {
    //        console.log(error);
    //    });
    
    // console.log(uploadResult);

    //npm i multer