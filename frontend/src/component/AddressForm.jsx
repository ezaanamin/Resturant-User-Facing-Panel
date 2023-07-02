import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import "./modal.css"
import { UserContext } from "../context/context";
import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

import logo from "../Logo/address.jpg"
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from "axios";
import "yup-phone-lite";

function getModalStyle() {


    return {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  }
  
  const useStyles = makeStyles(theme => ({
    paper: {
      position: "absolute",
      width: 1000,
      backgroundColor:"#213246",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
      outline: "none",
      color:"#7fa142"
      
    },
        
    textfield:{
      width:300,
      borderRadius: 12,
      backgroundColor: "white",
      borderColor:"white",
      position:"relative",
      left:290,
      top:500
    }
  }));

  const useStyles1 = makeStyles({
    
    textfield:{
       width:600,
       borderRadius: 12,
       backgroundColor: "white",
       borderColor:"white",
       position:"relative",
       left:200,


      
    },

  });
  

function AddressForm() {
  const handle = async (address,phone,customers_id) => {

    const response1= await axios.post('http://localhost:5000/customers/update',{address:address,phone:phone,customers_id:customers_id})

 if(response1 && response1.data)
 {
  console.log(response1.data)
  if(response1.data==="sucessful")
  {
    SetModal1(false)
  }
 }

 
 
   
  
   
   }
  const validationSchema = yup.object({

    phone: yup.string()
    .phone("PK",true, "Please enter a valid phone number")
    .required("A phone number is required"),
    address: yup
    .string('Enter your address')
    .required('address is required')


  });
  const formik = useFormik({
    initialValues: {
      address:'',
      phone:'',

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //  alert(JSON.stringify(values, null, 2));
      // alert(customers._id)
       handle(values.address,values.phone,customers._id)


      
    },
  });

    const{customers,modal1,SetModal1}=useContext(UserContext)
    const [modalStyle] = useState(getModalStyle);
  
    const classes1=useStyles1()


  

    useEffect(()=>{
console.log(customers)
    })
  
    const CustomModal = () => {
      return (
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={modal1}
          onClose={modal1}
        >
          <div style={modalStyle} className={classes.paper}>
            <Typography style={{textAlign:"center",marginBottom:20}} variant="h4" id="modal-title">
            Customer Information
          
            <img alt="Logo" style={{width:1000,height:300}} src={logo}/>
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">

            </Typography>
            <form onSubmit={formik.handleSubmit}>
        <div>
      
            <TextField
   
   id="address"
   name="address"
   label="address"
   className={classes1.textfield}
   value={formik.values.address}
   onChange={formik.handleChange}
   error={formik.touched.address && Boolean(formik.errors.address)}
   helperText={formik.touched.address && formik.errors.address}

  

     margin="normal"
     variant="outlined"
   />
      
      </div>
      <div>
            <TextField
   
   id="phone"
   name="phone"
   label="phone"
   className={classes1.textfield}
     margin="normal"
     variant="outlined"
     value={formik.values.phone}
     onChange={formik.handleChange}
     error={formik.touched.phone && Boolean(formik.errors.phone)}
     helperText={formik.touched.phone && formik.errors.phone}
 
    
   />
      
      </div>    
      
      <button type="submit" className="button_address">Upgrade Customers</button>
          </form>      
            

    
          </div>


        </Modal>
        
      ) 
    };
  
  
    const classes = useStyles();
  
    return (
  
  
        <CustomModal />
  
    );
  }
  


export default AddressForm