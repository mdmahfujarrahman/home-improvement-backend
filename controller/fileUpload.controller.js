import AWS from "aws-sdk";

export const uploadImage =async (req, res) => {
    try {
               
                const s3 = new AWS.S3({
                    accessKeyId: process.env.ACCESS_KEY_ID,
                    secretAccessKey: process.env.SECRET_ACCESS_KEY,
                    region: process.env.AWS_REGION,
                });
                if (req.file) {
                    let file = req.file;
                    // Read content from the file
                    // const fileContent = fs.readFileSync(file.buffer);

                    // Setting up S3 upload parameters
                    const params = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: Date.now() +"-" +file.originalname,
                        Body: file.buffer,
                        ACL: "public-read",
                    };

                    // Uploading files to the bucket
                    s3.upload(params, function (err, data) {
                        if (err) {
                            throw err;
                        }
                        res.json({
                            msg: "Image Uploaded Successfully",
                            link: `${data.Location}`,
                        });
                    });
                } else {
                    throw new Error("File not found!");
                }
            } catch (error) {
                res.status(400).json({
                    error: error.message,
                });
            }

}
