
import * as config from "../config.js";
import { nanoid } from "nanoid";
import slugify from "slugify";
import Ad from "../models/ad.js";
import User from "../models/user.js"

export const uploadImage = async (req, res) => {
    try {
        // console.log(req.body);
        const { image } = req.body;
        const base64Image = new Buffer.from(
            image.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
        );
        const type = image.split(';')[0].split('/')[1];
        //create image params
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
                console.log(data);
                res.send(data);
            }
        });
    } catch (err) {
        console.log(err)
        res.json({error: "Upload failed, try again."})
    }
}



export const removeImage = async (req, res) => {
    try {
        const { Key, Bucket } = req.body;

        config.AWS_S3.deleteObject({Bucket, Key}, (err, data) => {
            if(err) {
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

export const create = async (req, res) => {
    try {
        // console.log(req.body);
        const { photos, description, title, address, price, type, lotsize } = req.body;
        if(!photos?.length){
            return res.json({ error: "Photos are required" })
        }
        if(!price){
            return res.json({ error: "Price are required" })
        }
        if(!type){
            return res.json({ error: "There needs to be a type of property." })
        }
        if(!address){
            return res.json({ error: "Address is required" })
        }
        if(!description){
            return res.json({ error: "Description is required" })
        }
        const geo = await config.GOOGLE_GEOCODER.geocode(address);
        // console.log("geo =>", geo);
        const ad = await new Ad({
            ...req.body,
            postedBy: req.user._id,
            location: {type: 'Point', coordinates: [geo?.[0]?.longitude, geo?.[0]?.latitude],
        },
        googleMap: geo,
        slug: slugify(`${type}-${address}-${price}-${nanoid(6)}`)
        })
        ad.save();

        //make user role as seller
        const user = await User.findByIdAndUpdate(req.user._id, {
           $addToSet: { role: "Seller" }, 
        }, { new: true }
        );

        user.password = undefined;
        user.resetCode = undefined;

        res.json({
            ad,
            user,
        });
        
    } catch (err) {
        res.json({ error: "Something went wrong. Try again." });
        console.log(err);
    }
}

export const ads = async (req, res) => {
    try {
        const adsForSell = await Ad.find({action: "Sell"})
        .select("-googleMap -location -photo.Key -photo.key -photo.ETag")
        .sort({createAt: -1})
        .limit(12);

        const adsForRent = await Ad.find({action: "Rent"})
        .select("-googleMap -location -photo.Key -photo.key -photo.ETag")
        .sort({createAt: -1})
        .limit(12);

        res.json({ adsForSell, adsForRent });
    } catch (err) {
        console.log(err);
    }
}



export const read = async (req, res) => {
    try {
        const ad = await Ad.findOne({ slug: req.params.slug }).populate("postedBy", "name username email phone company photo.location");
        //related ads
        const related = await Ad.find({
            _id: { $ne: ad._id },
            action: ad?.action,
            type: ad?.type,
            address: { $regex: ad.googleMap[0].city, $options: "i", }
        }).limit(3).select('-photos.Key -photos.key -photos.ETag -photos.Bucket -googlemap')
        res.json({ ad, related })
    } catch (err) {
        console.log(err)
    }
}

