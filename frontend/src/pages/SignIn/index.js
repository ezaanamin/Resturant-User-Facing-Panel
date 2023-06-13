
import React, { useContext,useEffect } from 'react'
import TextField from "@material-ui/core/TextField";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import jwt from "jwt-decode"
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from '../../context/context';
import "./signup.css"
import {Link} from "react-router-dom"
import GoogleButton from 'react-google-button'
import { useGoogleLogin } from '@react-oauth/google';
function SignUp() {

    const{SetCustomers,SetLog}=useContext(UserContext)

    const googleLogin = useGoogleLogin  ( {
      onSuccess: (codeResponse) => {
        axios.get(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResponse.access_token}`,
          
             ).then((res) => {
          //  googleID, gmail, name, etc...
          handle(res.data)
      }).catch((err) => console.log(err));
    },
    
    
    });

        const useStyles = makeStyles({
        
            textfield:{
               width:300,
               borderRadius: 12,
               backgroundColor: "white",
               borderColor:"white",
               position:"relative",
               left:290,
               top:250
    
              
           },
    
          });
          const classes = useStyles();
      const cookies=new Cookies()
      const navigate = useNavigate();
    
    
      const [Error,SetError]=useState("");
      const validationSchema = yup.object({
        email: yup
          .string('Enter your email')
          .required('email is required').email(),
        password: yup
          .string('Enter your password')
          .min(8, 'Password should be of minimum 8 characters length')
          .required('Password is required'),
          confirmPassword: yup.string()
          .oneOf([yup.ref('password'), null], "Passwords don't match!"),
          address: yup.string().required("Enter Address"),
          phone:yup.string().required("Enter Phone Number"),
          name:yup.string().required("Name is required")


      });
    
    
    const handleClick = async (email,password1,address,phone,name) => {
     
     const response= await axios.post('http://localhost:5000/customers/signup',{email:email,password:password1,name:name,phone:phone,address:address})
     .catch((error) => console.log('Error: ', error));


     if(response && response.data)
     {
       if(response.data=="User exists")
       {
        SetError(response.data)

        alert("User Exist")
       }
       else{
        navigate("/login")
       }
     }
    

    
    
     
    };
      const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
          confirmPassword:'',
          name:'',
          address:'',
          phone:'',

        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
           //alert(JSON.stringify(values, null, 2));
          // Setemail()
          // SetPassword()
          handleClick(values.email,values.password,values.address,values.phone,values.name)
          
        },
      });
      const handle = async (object) => {

        const response1= await axios.post('http://localhost:5000/customers/google/signin',{information:object})
     
     
         if(response1 && response1.data)
         {
        
           SetLog(true)
           const decoded=jwt(response1.data.token)
           SetCustomers(response1.data.customers)
        
           cookies.set("jwt_authorization",response1.data.token,{
       
             expires:new Date(decoded.exp*1000),
         })
       
     
     
       }
       navigate('/menu')
       
       }
      return (
        <div  className='sign' >
    
    <form onSubmit={formik.handleSubmit}>
          <h1 className='heading_signup'>Sign up </h1>
          
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
 style={{position:"relative",top:150,left:310}}
  label='Sign in with Google '
  onClick={() => googleLogin()}
/>


          <p className='signin_paragraph'>Or</p>
          <div>
          <TextField
       
       id="name"
       name="name"
       label="Name"
       value={formik.values.name}
       onChange={formik.handleChange}
       error={formik.touched.name && Boolean(formik.errors.name)}
       helperText={formik.touched.name && formik.errors.name}
       className={classes.textfield}
      
    
    
      
    
         margin="normal"
         variant="outlined"
       /></div>

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
                 <div>
          <TextField
       
       id="address"
       name="address"
       label="Address"
       value={formik.values.address}
       onChange={formik.handleChange}
       error={formik.touched.address && Boolean(formik.errors.address)}
       helperText={formik.touched.address && formik.errors.address}
       className={classes.textfield}
      
    
    
      
    
         margin="normal"
         variant="outlined"
       /></div>
                        <div>
          <TextField
       
       id="phone"
       name="phone"
       label="Phone"
       value={formik.values.phone}
       onChange={formik.handleChange}
       error={formik.touched.phone && Boolean(formik.errors.phone)}
       helperText={formik.touched.phone && formik.errors.phone}
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
       <div>
       <TextField
                   
                   id="confirmPassword"
                   name="confirmPassword"
                   label=" Confirm Password"
                   type="password"
                   value={formik.values.confirmPassword}
                   onChange={formik.handleChange}
                   error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                   helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                   className={classes.textfield}
                   margin="normal"
                   variant="outlined"
   
  
  
     />


       </div>
       
       <button className='button_sign' type="submit"   variant="contained">
    Sign Up
    </button>
    
          <div>
    
            
        </div>
        </form>


        { formik.errors.name || formik.errors.email || formik.errors.address||formik.errors.password


|| formik.errors.confirmPassword?
<h3 style={{position:"relative",top:-480,left:330,color:"#7fa142"}}>Have an account ?<Link to={'/login'}><h3 className='link-decoration'>Login</h3></Link></h3>
:
<h3 style={{position:"relative",top:-380,left:330,color:"#7fa142"}}>Have an account ?<Link to={'/login'}><h3 className='link-decoration'>Login</h3></Link></h3>




        }
        </div>
      )
}

export default SignUp