import { default as dotenv } from 'dotenv';
dotenv.config();
import  s3 from 'aws-sdk/clients/s3.js'
import fs from 'fs'
import path from 'path';
const __dirname = path.resolve();
import stream from "stream";

// import S3 from 'aws-sdk/clients/s3';

const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;
const propertyBucketName = process.env.BUCKET_NAME_PROPERTY;
const profileBucketName = process.env.BUCKET_NAME_PROFILE;


const aws = new s3({
    region,
    accessKeyId,
    secretAccessKey,
})


// const converBase64 = (b64) =>{
//     const base64 = b64.replace(/^data:image\/\w+;base64,/, "");
//     const image = Buffer.from(base64, 'base64');
//     return image

// }
const createUploadStream = (fileName, bucketName) =>{
    const pass = new stream.PassThrough();
    return {
      writeStream: pass,
      promise: aws
        .upload({
          Bucket: bucketName,
          Key: fileName,
          Body: pass
        })
        .promise(),
    };
}

export const propertyImageUpload = async (file, fileName) =>{
    try {

        const { createReadStream } =  await file
        const stream = createReadStream();
        const uploadStream = createUploadStream(fileName, propertyBucketName);
        stream.pipe(uploadStream.writeStream);
        let  result = await uploadStream.promise;
        return result

    } catch (error) {
        return error
    }
}


// TODO
// BUCKET  NOT CREATED
export const profileImageUpload = async (file, fileName) =>{
    try {

        const { createReadStream } =  await file
        const stream = createReadStream();
        const uploadStream = createUploadStream(fileName, profileBucketName);
        stream.pipe(uploadStream.writeStream);
        let  result = await uploadStream.promise;
        return result

    } catch (error) {
        return error
    }
}

export const getFileReadStrem =  async (fileKey) =>{
    try{
        const fileParams = {
            Key: fileKey,
            Bucket: propertyBucketName,
            Expires: 60 * 1
        }
        return aws.getSignedUrlPromise("getObject", fileParams)
    }catch(error){
        return error
    }
}




// module.exports ={propertyImageUpload, profileImageUpload}