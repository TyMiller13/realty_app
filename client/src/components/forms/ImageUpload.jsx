import React from 'react';
import Resizer from "react-image-file-resizer";
import axios from "axios";




export default function ImageUpload({ad,setAd}) {

    const handleUpload = async (e) => {
        try {
            let files = e.target.files;
            files = [...files];
            if(files?.length){
                // console.log(files);
                setAd({...ad, uploading: true});
                files.map(file => {
                    new Promise((resolve) => {
                        Resizer.imageFileResizer(
                            file,
                            1080,
                            720,
                            "JPEG",
                            100,
                            0,
                            async (uri) => {
                              try {
                                const data = await axios.post('/upload-image',{
                                    image: uri,
                                });
                                setAd((prev) => ({
                                  ...prev,
                                  photos: [data, ...prev.photos],
                                  uploading: false,
                                }))
                              } catch (err) {
                                console.log(err);
                                setAd({...ad, uploading: false});
                              }
                            },
                            "base64"
                          );
                    })
                })
            }
    
        } catch (err) {
            console.log(err);
            setAd({...ad, uploading: false});
        }
    }
    
    const handleDelete = async () => {
        try {
            setAd({...ad, uploading: true});
        } catch (err) {
            console.log(err);
            setAd({...ad, uploading: false});
        }
    }
  return (
    <>
        <label className="btn btn-primary my-4">
            Upload Images
        <input type="file" accept="image/*" multiple onChange={handleUpload} hidden/>
        </label>
    </>
  )
}