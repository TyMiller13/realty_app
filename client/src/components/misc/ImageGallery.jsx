import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images'

// const photos = [
//     {
//       src: 'https://homey-realty-bucket.s3.us-east-2.amazonaws.com/1hk9zy8qYEdMnkbi_Zv24.jpeg',
//       width: 4,
//       height: 3
//     },
//     {
//       src: 'https://homey-realty-bucket.s3.us-east-2.amazonaws.com/hA6DYFIrSlSiDfD9pq5q0.jpeg',
//       width: 1,
//       height: 1
//     }
//   ];


export default function ImageGallery({ photos }) {
    //state
    const [current, setCurrent] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    // hooks
    const params = useParams();



    const openLightbox = useCallback((event, {photo, index}) => {
        setCurrent(index);
        setIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrent(0);
        setIsOpen(false);
    };

    return <>
        <Gallery photos={photos} onClick={openLightbox}/>;
        <ModalGateway>
            {isOpen ? (
                <Modal onClose={closeLightbox}>
                    <Carousel currentIndex={current} views={photos.map((x)=>({...x, srcset: x.srcSet, caption: x.title,}))}/>
                </Modal>
            ) : null}
        </ModalGateway>
    </>;

  
}
