import React, {useEffect, useState} from 'react';
import './Image'
import Image from "./Image";
import "./Images.css"
import StackGrid from "react-stack-grid";
import globalVar from "../GlobalVar";

export default function Images() {

    const [allImages, setAllImages] = useState([])
    const [count, setCount] = useState(1)
    const [pageData, setPageData] = useState([])
    const [lazyData, setLazyData] = useState([])
    const [images, setImages] = useState([])

    useEffect(() => {
        let url = globalVar.apiServer + "birdImages/"
        fetch(url)
            .then(res => res.json())
            .then(data => setAllImages(data))
    }, [])

    useEffect(() => {
        setLazyData(pageData[0])
    }, [pageData])

    useEffect(() => {
        setPageData(paging(allImages, 10))
    },[allImages])

    const paging = (sourceData, pageSize) => {
        if (sourceData.length === 0) return new Array()
        const pageNum = Math.ceil(sourceData.length / pageSize)
        return new Array(pageNum).fill([]).map((item, index) => (
            sourceData.slice(index * pageSize, (index + 1) * pageSize)
        ))
    }

    const handleScroll = (e) => {
        console.log('scrolling')
        const { scrollTop, scrollHeight, clientHeight } = e.target
        console.log(scrollHeight - scrollTop === clientHeight)
        return scrollHeight - scrollTop === clientHeight
    }

    const lazyLoad = (e) => {
        if (handleScroll(e) && pageData[count]) {
            setLazyData(prevState => {
                prevState.push(pageData[count])
            })

            setCount(count + 1)
        }
    }

    function handleClick() {
        if(lazyData.length === allImages.length) return 0
        for(let i = 0; i < pageData[count].length; i++){
            setLazyData(prevState => [...prevState, pageData[count][i]])
        }
        setImages(
            lazyData.map(image => {
                    return (
                        <Image
                            postId={image.postId}
                            displayName={image.displayName}
                            path={image.path}
                        />
                    )
                }
            )
        )
        setCount(count + 1)
    }

    useEffect(() => {
        if(lazyData !== undefined){
            setImages(
                lazyData.map(image => {
                        return (
                            <Image
                                postId={image.postId}
                                displayName={image.uploaderName}
                                path={image.path}
                            />
                        )
                    }
                )
            )
        }
    }, [lazyData])

    return (
        <div onScroll={(e) => { lazyLoad(e) }}>
            <StackGrid className="images" monitorImagesLoaded={true} columnWidth={300}>
                {images}
            </StackGrid>
            <button className="load-more" onClick={handleClick}>
                  <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                  </span>
                <span className="button-text">Load More</span>
            </button>
        </div>
    )
}