import * as config from "../config.js";
import { nanoid } from "nanoid";



export const uploadImage = async (req, res) => {
    try {
        const {image} = req.body;

        //prepare image 
        const base64Image = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), "base64");
        const type = image.split(';')[0].split('/')[1];

        //image params
        const params = {
            Bucket: "homey-realty-bucket",
            Key: `${nanoid()}.${type}`,
            Body: base64Image,
            ACL: "public-read",
            ContentEncoding: "base64",
            ContentType: `image/${type}`,
        };
        config.AWS_S3.upload(params, (err, data) => {
            if(err){
                console.log(err);
                res.sendStatus(400);
            } else {
                // console.log(data);
                res.send(data);
            }
        })
    } catch (err) {
        console.log(err);
        res.json({error: "Upload failed.. try again."});
    }
};

export const removeImage = async (req, res) => {
    try {
        const {Key, Bucket} = req.body;

        //modify s3 bucket
        config.AWS_S3.deleteObject({Bucket, Key}, (err, data) =>{
            if(err){
                console.log(err);
                res.sendStatus(400);
            } else {
                res.send({ ok: true });
            }
        });
    } catch (err) {
        console.log(err);
    }
};