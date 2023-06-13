import React from 'react'
import { Slide } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'
import "./slide.css"
import Slide1 from "../Logo/slide1.jpg"
import Slide2 from "../Logo/slide2.jpg"
import Slide3 from "../Logo/slide3.jpg"
const proprietes = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true
}


const Slideshow = () => {
    return (
        <div className="containerSlide">
    
            <Slide {...proprietes}>
                <div className="each-slide">
                    <div>
                     <img src={Slide1}/>
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                    <img src={Slide2}/>
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                    <img src={Slide3}/>
                    </div>
                </div>
            </Slide>
        </div>
    )
}

export default Slideshow;


