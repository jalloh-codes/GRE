require('dotenv').config() 
const  S3 =  require('aws-sdk/clients/s3')

const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;
const propertyBucketName = process.env.BUCKET_NAME_PROPERTY;
const profileBucketName = process.env.BUCKET_NAME_PROFILE;


const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
})


const propertyImageUpload = async (file, fileName) =>{
    try {
        const uploadParams = {
            Bucket: propertyBucketName,
            Body: file,
            Key: fileName,   
        }
        
        return s3.upload(uploadParams).promise()
    } catch (error) {
        return error
    }
}

const profileImageUpload = async (file, fileName) =>{
    try {
        const uploadParams = {
            Bucket: profileBucketName,
            Body: file,
            Key: fileName,   
        }
        return s3.upload(uploadParams).promise()
    } catch (error) {
        return error
    }
}




module.exports ={propertyImageUpload, profileImageUpload}