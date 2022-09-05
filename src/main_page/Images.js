import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import './Image'
import Image from "./Image";
import "./Images.css"
import StackGrid from "react-stack-grid";
import globalVar from "../GlobalVar";
import Loading from "../Loading";

function Images() {
    const [allImages, setAllImages] = useState([])
    const [count, setCount] = useState(1)
    const [pageData, setPageData] = useState([])
    const [lazyData, setLazyData] = useState([])
    const [images, setImages] = useState([])
    const [onBottom, setOnBottom] = useState(false);

    function onScroll() {
        if((window.scrollY + window.innerHeight - document.body.scrollHeight)>95) {
            console.log(window.scrollY + window.innerHeight - document.body.scrollHeight)
            setOnBottom(true)
            setTimeout(3000)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", onScroll)
        return () => {
            window.removeEventListener("scroll", onScroll)
        };
    }, [])

    useEffect(() => {
        if(onBottom) {
            lazyLoad()
        }
    }, [onBottom])

    useEffect(() => {
        let url = globalVar.apiServer + "birdImages/"
        fetch(url)
            .then(res => res.json())
            .then(data => {
                let numArr = []
                let randomizedArr = [{}]
                for(let i = 0; i < data.length; i++){
                    numArr.push(i)
                }
                for(let i = 0; i < data.length; i++){
                    const randNum = Math.floor(Math.random()*numArr.length)
                    randomizedArr.push(data[numArr[randNum]])
                    numArr.splice(randNum, 1)
                }
                setAllImages(randomizedArr)
            })
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

    function lazyLoad() {
        console.log("loaded")
        if(lazyData.length === allImages.length) return 0
        for(let i = 0; i < pageData[count].length; i++){
            setLazyData(prevState => [...prevState, pageData[count][i]])
        }
        setCount(count + 1)
        setOnBottom(false)
    }

    function handleClick() {
        lazyLoad()
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
        <div className="images-container">
            <StackGrid className="images" monitorImagesLoaded={true}
                       columnWidth={300}
                       gutterWidth={20}
                       gutterHeight={10}
            >
                {images}
            </StackGrid>
            {images.length !== 0 &&
                <button className="load-more" onClick={handleClick}>
                  <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                  </span>
                    <span className="button-text">Load More</span>
                </button>
            }
            {images.length === 0 && <Loading />}
        </div>
    )
}

export default Images