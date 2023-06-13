import React, { useContext} from 'react'
import TextField from "@material-ui/core/TextField";
import * as yup from 'yup';
import { useFormik } from 'formik';
import Cookies from 'universal-cookie';
import jwt from "jwt-decode"
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./login.css"
import {Link} from "react-router-dom"
import { UserContext } from '../../context/context';
import GoogleButton from 'react-google-button'
import { useGoogleLogin } from '@react-oauth/google';

function Login() {


 const{SetCustomers,SetLog,SetModal}=useContext(UserContext)
 const googleLogin = useGoogleLogin  ( {
  onSuccess: (codeResponse) => {
    console.log(codeResponse)
    axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResponse.access_token}`,
      
         ).then((res) => {
      handle(res.data)
  }).catch((err) => console.log(err));
},


});

  const handle = async (object) => {
  console.log(object)
   const response1= await axios.post('http://localhost:5000/customers/google/signin',{information:object})


    if(response1 && response1.data)
    {
      SetLog(true)
      console.log(response1.data)
      const decoded=jwt(response1.data.token)
      SetCustomers(response1.data.customers)
   
      cookies.set("jwt_authorization",response1.data.token,{
  
        expires:new Date(decoded.exp*1000),
    })
  


  }
  SetModal(false)
  navigate('/menu')
  
  }

    const useStyles = makeStyles({
    
        textfield:{
           width:300,
           borderRadius: 12,
           backgroundColor: "white",
           borderColor:"white",
           position:"relative",
           left:290,
           top:500

          
        },

      });
      const classes = useStyles();
  const cookies=new Cookies()
  const navigate = useNavigate();



  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .required('email is required').email(),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });


  const handleClick = async (email,password1) => {
 
    const response= await axios.post('http://localhost:5000/customers/signin',{email:email,password:password1})
    .catch((error) => console.log('Error: ', error));
   
    if (response && response.data) {
     
     if(response.data!="Wrong password")
     {
       SetLog(true)
       SetCustomers(response.data.customers)
   
       const decoded=jwt(response.data.token)
    
       cookies.set("jwt_authorization",response.data.token,{
   
         expires:new Date(decoded.exp*1000),
       });
       SetModal(false)
       navigate('/menu')
   
     }
     else
     {
      alert(response.data)
     }
   
   
    }
   };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
       //alert(JSON.stringify(values, null, 2));
      // Setemail()
      // SetPassword()
      handleClick(values.email,values.password)
      
    },
  });
  return (
    <div  className='login' >

<form onSubmit={formik.handleSubmit}>
      <h1 className='heading_login'>Login</h1>
 
{/* <GoogleLogin 
  onSuccess={credentialResponse => {
  var object=jwtDecode(credentialResponse.credential)
  //  SetData(object)
  //  SetGoogleState(true)
  //console.log(object)
  handle(object)

  }}
  onError={() => {
    console.log('Login Failed');
  }}
/> */}

<GoogleButton
 style={{position:"relative",top:350,left:320}}
  label='Sign in with Google '
  onClick={() => googleLogin()}
/>



      <p className='login_paragraph'>Or</p>
      <div>
      <TextField
   
   id="email"
   name="email"
   label="email"
   value={formik.values.email}
   onChange={formik.handleChange}
   error={formik.touched.email && Boolean(formik.errors.email)}
   helperText={formik.touched.email && formik.errors.email}
   className={classes.textfield}
  


  

     margin="normal"
     variant="outlined"
   /></div>
        <TextField
               
                 id="password"
                 name="password"
                 label="Password"
                 type="password"
                 value={formik.values.password}
                 onChange={formik.handleChange}
                 error={formik.touched.password && Boolean(formik.errors.password)}
                 helperText={formik.touched.password && formik.errors.password}
                 className={classes.textfield}
                 margin="normal"
                 variant="outlined"
 


   />
   <button className='button_login' type="submit"   variant="contained">
Login
</button>

      <div>

        
    </div>
    </form>
    { formik.errors.password && formik.touched.email ?
  <h3 style={{position:"relative",top:170,left:310,color:"#7fa142"}}>Don't have an account ? <Link to={'/signup'}> <a className='link-decoration'>Sign Up</a></Link> </h3>
:
<h3 style={{position:"relative",top:200,left:310,color:"#7fa142"}}>Don't have an account ? <Link to={'/signup'}> <a className='link-decoration'>Sign Up</a></Link> </h3>


    }
  

    </div>
  )
}

export default Login