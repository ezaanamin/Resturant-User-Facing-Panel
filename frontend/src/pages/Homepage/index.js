import React, { useEffect } from 'react'
import "./homepage.css"
import img from "../../Logo/homepage_img.png"
import Navbar from '../../component/Navbar'





function Homepage() {

  return (
    <div className='homepage'>
        <Navbar/>
        
         
        <h1 className='home_heading'>Hungry?</h1>
        <h1 className='home_heading'>Don’t wait.</h1>
        <button className='button_home'>Order Now</button>  
    
        <img src={img} className='img'/>
 


   



    </div>
  )
}

export default Homepage