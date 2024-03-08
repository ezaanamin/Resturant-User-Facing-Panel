import React, { useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import { Link } from "react-router-dom";
import "./modal.css"
import { UserContext } from "../context/context";
import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import CloseIcon from '@material-ui/icons/Close';
import { useNavigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from "axios"



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
    width: 400,
    backgroundColor:"#213246",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none",
    color:"#7fa142"
    
  },
  textfield:{
    width:450,
    borderRadius: 12,
    backgroundColor: "white",
    borderColor:"white"
 },
 root: {
    borderRadius: 12,
    backgroundColor: "white",
    borderColor:"white",
    marginRight:25
  },
  textfield:{
     width:350,
     borderRadius: 12,
     backgroundColor: "white",
     borderColor:"white"
  },
  textfield1:{
    width:350,
    height:200,
    borderRadius: 12,
    backgroundColor: "white",
    borderColor:"white"
 }
}));

function ReviewModals({heading}) {


    const handleClick1 = async (message) => {
        const response = await axios.post('http://localhost:5000/review//post/review', {name:customers.name,review:message})
            .catch((error) => console.log('Error: ', error));
        if (response && response.data) {
            console.log(response);
            console.log(response.data);
         if(response.data=="Sucess")
         {
       nav('/')
       SetReviewModal(false)

         } 
        
        }
      
      };

    const validationSchema = yup.object({
   
          message:yup.string().required("Enter aleast 100 words").min(100)
      
      
      
      });

      const formik = useFormik({
        initialValues: {
         message:''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
      
          handleClick1(values.message)
      
        },
      });
      

  const{ReviewModal,SetReviewModal,toogle1,SetToogle1,customers}=useContext(UserContext)
  const [modalStyle] = useState(getModalStyle);
  const [message,SetMessage]=useState("")

  const nav=useNavigate()



  const handleClick = async ()=>
  {
    SetReviewModal(false)
    SetToogle1(0)
    nav("/menu")
  }

  const CustomModal = () => {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={ReviewModal}
        onClose={ReviewModal}
      >
        <div style={modalStyle} className={classes.paper}>
          <CloseIcon onClick={()=>handleClick()}   style={{position:"absolute",right:0,top:0}}/>
          <Typography style={{textAlign:"center"}} variant="h4" id="modal-title">
        
          {heading}
          </Typography>
          <Typography style={{textAlign:"center"}} variant="subtitle1" id="simple-modal-description">
      

          <form onSubmit={formik.handleSubmit}>

          <TextField
   autoFocus
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
    width: 300,
    padding: '0 14px',
    fontWeight: 'bold'
  },
}}
  

     margin="normal"
     variant="outlined"
   />
     <button  className='button_modal' variant="contained">
          Submit 
        </button>
   </form>

          </Typography>
     

    

        </div>
      </Modal>
    ) 
  };


  const classes = useStyles();

  return (


      <CustomModal />

  );
}

export default ReviewModals;
