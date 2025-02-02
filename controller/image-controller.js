const Image = require('../model/image');
const { uplaodToCloudinary } = require('../helpers/cloudinary-helper')

const uploadImageController = async (req, res) => {

    try{
        //check file is missing in req object
        if(!req.file){
            return res.status(400).json({
                success: false,
                message: 'File is required. Please upload an image'
            });
        }

        //upload to cloudinary
        const { url, publicId } = await uplaodToCloudinary(req.file.path);

        //store the image url and public id along with the uploaded user id in database
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        })

        await newlyUploadedImage.save();

        res.status(201).json({
            success: true,
            message: 'Image uploaded successflly!',
            image: newlyUploadedImage
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong! Please try again.'
        });
    }
       
};

module.exports = { uploadImageController };