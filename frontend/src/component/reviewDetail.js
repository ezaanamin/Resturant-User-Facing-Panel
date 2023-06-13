import React from 'react';

const TestiMonialsDetails = ({testiMonialDetail}) => {
    const {name, review, img} = testiMonialDetail;

    return (
        <div class="item">
            <div class="shadow-effect">
                <img class="img-circle"src={`http://localhost:4000/upload/${img}`}/>
                <p>{review}</p>
            </div>
            <div class="testimonial-name">
                <h5>{name}</h5>
             
            </div>
        </div>
    );
};

export default TestiMonialsDetails;