import { default as dotenv } from 'dotenv';
dotenv.config();
// import {aws} from 'aws-sdk';
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


const converBase64 = (b64) =>{
    const base64 = b64.replace(/^data:image\/\w+;base64,/, "");
    const image = Buffer.from(base64, 'base64');
    return image

}
const createUploadStream = (key) =>{
    const pass = new stream.PassThrough();
    return {
      writeStream: pass,
      promise: aws
        .upload({
          Bucket: propertyBucketName,
          Key: key,
          Body: pass,
        })
        .promise(),
    };
}

export const propertyImageUpload = async (file, fileName) =>{
    try {

        const { createReadStream } =  await file
        const stream = createReadStream();
        const uploadStream = createUploadStream(fileName);
        stream.pipe(uploadStream.writeStream);
        let  result = await uploadStream.promise;
        return result

    } catch (error) {
        return error
    }
}

export const profileImageUpload = async (file, fileName) =>{
    try {
        const image = converBase64(file)
        const uploadParams = {
            Bucket: profileBucketName,
            Body: image,
            Key: fileName,   
        }
        return aws.upload(uploadParams).promise()
    } catch (error) {
        return error
    }
}




// module.exports ={propertyImageUpload, profileImageUpload}