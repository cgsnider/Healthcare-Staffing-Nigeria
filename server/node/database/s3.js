
require('dotenv').config('../.env')

const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

async function upload(file) {

    const fileStream = fs.createReadStream(file.path);

    const uploadData = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    
    fs.unlinkSync(file.path)

    return s3.upload(uploadData).promise()
}

async function download(file) {

  const downloadData = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}

module.exports.upload = upload;