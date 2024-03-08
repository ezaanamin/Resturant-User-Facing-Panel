import React, { useEffect, useState } from 'react'
import "./contact.css"
import TextField from "@material-ui/core/TextField";
import axios from "axios"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from 'formik';
import {useNavigate} from "react-router-dom"
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { fetchAbout } from '../../redux/slice/data';
import { RingLoader } from 'react-spinners';
function Contact () {
  const nav=useNavigate()


  const dispatch=useDispatch()
  const state = useSelector((state) => state);
  useEffect(()=>{
    dispatch(fetchAbout())
    },[])
const handleClick = async (name,subject,email,message) => {
  const response = await axios.post('http://localhost:5000/about/mail', {name:name,subject:subject,email:email,message:message})
      .catch((error) => console.log('Error: ', error));
  if (response && response.data) {
      console.log(response);
      console.log(response.data);
   if(response.data=="sucess")
   {
 nav('/')
   } 
  
  }

};
const useStyles = makeStyles({
  root: {
    borderRadius: 12,
    backgroundColor: "white",
    borderColor:"white",
    marginRight:25
  },
  textfield:{
     width:450,
     borderRadius: 12,
     backgroundColor: "white",
     borderColor:"white"
  },
  textfield1:{
    width:450,
    height:200,
    borderRadius: 12,
    backgroundColor: "white",
    borderColor:"white"
 }
});

const validationSchema = yup.object({
  name: yup
    .string('Enter your username')
    .required('Username is required'),
  email: yup
    .string('Enter your email')
    .email()

    .required('Email is required'),
    subject:yup.string()
    .required("Enter Subject"),
    message:yup.string().required("Enter aleast 100 words").min(100)



});

const formik = useFormik({
  initialValues: {
   name:'',
   email:'',
   subject:'',
   message:''
  },
  validationSchema: validationSchema,
  onSubmit: (values) => {

    handleClick(values.name,values.subject,values.email,values.message)

  },
});
const classes = useStyles();
  return (
 <div className='contact'>
  <h1 className='contact_heading'>Contact Us</h1>

  <h2 className='contact_heading'>How to get in touch</h2>
  <h3 className='contact_paragarph'>"We value your feedback and would love to hear from you! Whether you have a question, comment, or would like to make a reservation, please don't hesitate to get in touch. You can reach us by phone, email, or by filling out the contact form below. Our team will get back to you as soon as possible. Thank you for considering us for your dining experience."</h3>


  <div className="parent">
      <div className="first">
    <h3 style={{marginBottom:10}}>Address</h3>
  {
    state.data.about?
    state.data.about[0].address:
    <RingLoader color='#7fa142'/>
  }
    <h3 style={{marginBottom:10}}>Phone</h3>
    {
    state.data.about?
  state.data.about[0].phone:
    <RingLoader color='#7fa142'/>
  }
    <h3 style={{marginBottom:10}}>Email</h3>
    {
    state.data.about?
    state.data.about[0].email:
    <RingLoader color='#7fa142'/>
  }

<div>
 <FacebookIcon/>
<TwitterIcon/> 
<GoogleIcon/>
<PinterestIcon/>
</div>

      </div>

      <div className="third">
      <form onSubmit={formik.handleSubmit}>
 
        <div>

      <TextField
   
        id="username"
        name="name"
        label="UserName"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
     className={classes.root}
       
          
     
       
    
          margin="normal"
          variant="outlined"
/>
<TextField
   
   id="username"
   name="email"
   label="Email"
   value={formik.values.email}
   onChange={formik.handleChange}
   error={formik.touched.email && Boolean(formik.errors.email)}
   helperText={formik.touched.email && formik.errors.email}
   className={classes.root}
 

  

     margin="normal"
     variant="outlined"
   />

        </div>
        <div>
        <TextField
   
   id="username"
   name="subject"
   label="Subject"
   value={formik.values.subject}
   onChange={formik.handleChange}
   error={formik.touched.subject && Boolean(formik.errors.subject)}
   helperText={formik.touched.subject && formik.errors.subject}

   className={classes.textfield}

  

     margin="normal"
     variant="outlined"
   />
 </div>

<div>
<TextField
   
   id="username"
   name="message"
   label="Message"
   value={formik.values.message}
   onChange={formik.handleChange}
   error={formik.touched.message && Boolean(formik.errors.message)}
   helperText={formik.touched.message && formik.errors.message}
  
 className={classes.textfield1}
 inputProps={{
  style: {
    fontSize: 14,
    height: 200,
    width: 372,
    padding: '0 14px',
    fontWeight: 'bold'
  },
}}
  

     margin="normal"
     variant="outlined"
   />


</div>
<button  type="submit" className='button_contact' variant="contained">
  Submit
</button>

</form>

      </div>
    </div>


 </div>
       
  )
}

export default Contact 