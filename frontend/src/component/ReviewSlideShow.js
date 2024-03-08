import React, { useEffect, useState } from 'react';
import TestiMonialsDetails from '../component/reviewDetail'
import OwlCarousel from 'react-owl-carousel';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from '../redux/slice/data';
import './review.css'
import { RingLoader } from 'react-spinners';
const TestiMonials = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    useEffect(()=>{
        dispatch(fetchReviews())

    },[])
  

    //Owl Carousel Settings
    const options = {
        loop: true,
        center: true,
        items: 3,
        margin: 0,
        autoplay: true,
        dots: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 3
            }
        }
    };
    return (
        <section >
            <div>
                <div className="text-center">
                    <h3 className="slide_heading">What Our Clients are Saying?</h3>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <OwlCarousel style={{marginBottom:0}} id="customer-testimonoals" className="owl-carousel owl-theme" {...options}>
                            {
                              !state.data.reviews ?
                               
                                  <RingLoader className='loader'   color="#7fa142" />  
                                 :
                                     state.data.reviews.map(testiMonialDetail => {
                                        return (
                                            <TestiMonialsDetails testiMonialDetail={testiMonialDetail} key={testiMonialDetail._key} />

                                        )
                                    })
                            }
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestiMonials;