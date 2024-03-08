import React from 'react'

import  "./about.css"

import {useEffect,useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchAbout } from '../../redux/slice/data';
import { RingLoader } from 'react-spinners';
function About() {
  // const { data, isLoading }=useGetAboutQuery();

  // const [text,SetText]=useState()

  const dispatch=useDispatch()
  const state = useSelector((state) => state);

  useEffect(()=>{
  dispatch(fetchAbout())
  },[])

  return (
  <>
  <div className='about'>

<h1 style={{ color:"#7fa142",textAlign:"center",fontSize:40}}>About Us</h1>

<p style={{color:"white",fontSize:20,fontWeight:"bold",width:900,textAlign:"center",marginTop:20,position:"relative",left:450}}>  {
    state.data.about?
    state.data.about[0].name:
    <RingLoader className='ring_about' color='#7fa142' width="100px" height="500px"/>
  }</p>
{state.data.about?
<p style={{color:"white",fontWeight:"bold",width:900,textAlign:"center",marginTop:20,position:"relative",left:450}}>  

  Ezaan Amin

  CEO 
  </p>

:
null


}



  </div>




  
  </>
  )
}

export default About