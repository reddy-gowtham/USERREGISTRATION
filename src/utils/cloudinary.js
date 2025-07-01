import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";


    // Configuration
    cloudinary.config({ 
        cloud_name: "GowthamReddy",
        api_key: 449998329723929,
        api_secret: "RyCTuy3zjN3cKe5DOfH_ElvwqNQ"
    });

    const uploadOnCloudinary= async (localFilePath)=>{
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

    export { uploadOnCloudinary }
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