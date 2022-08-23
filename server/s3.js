require("dotenv").config();
const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// upload file to s3

function uploadFile(file) {
  //   console.log(file.path);
  var buf = file.path;

  // const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: buf,
    Key: file.id,
    ContentEncoding: "base64",
    ContentType: file.mimetype,
  };

  return s3.upload(uploadParams).promise();
}

exports.uploadFile = uploadFile;

// Download a file from s3

function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  console.log(downloadParams, "params");
  return s3.getObject(downloadParams).createReadStream();
}

exports.getFileStream = getFileStream;
