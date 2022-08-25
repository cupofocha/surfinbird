import React, {useEffect, useState} from 'react';
import './Image'
import Image from "./Image";

export default function Images() {

    const [allImages, setAllImages] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/birdImages/")
            .then(res => res.json())
            .then(data => setAllImages(data))
    }, [])

    const images = allImages.map(image => {
        return (
            <Image
                path={image.path}
            />
        )
    })

    return (
            <div>
                {images}
            </div>
    )
}