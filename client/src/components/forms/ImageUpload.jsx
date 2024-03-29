import React from 'react';
import Resizer from "react-image-file-resizer";
import axios from "axios";
import {Avatar} from "antd"





export default function ImageUpload({ad,setAd}) {

    const handleUpload = async (e) => {
        try {
            let files = e.target.files;
            files = [...files];
            if(files?.length){
                // console.log(files);
                setAd({ ...ad, uploading: true });
                files.map(file => {
                    //upload image
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
                                const { data } = await axios.post('/upload-image',{
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
    
    const handleDelete = async (file) => {
        const answer = window.confirm("Delete image?");
        if(!answer) return;
        setAd({ ...ad, uploading: true });
        try {
            const { data } = await axios.post('/remove-image', file);
            if (data?.ok) {
                setAd((prev) => ({ ...prev, photos: prev.photos.filter((photo) => photo.Key !== file.Key),
                uploading: false,
                }));
            }
        } catch (err) {
            console.log(err);
            setAd({ ...ad, uploading: false });
        }
    };

  return (
    <>
        <label className="btn btn-primary my-4">
            {ad.uploading ? "Processing..." : "Upload Photos"}
        <input onChange={handleUpload} type="file" accept="image/*" multiple hidden/>
        </label>
        {ad.photos?.map((file, index) => (
            <Avatar 
                key={index} 
                src={file?.Location} 
                shape="square" 
                size={46} 
                className="mx-1 pointer" 
                onClick={() => handleDelete(file)} 
            />
        ))}
    </>
  );
}
