import React from "react";

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
    
  }
}));

function SimpleModal() {

  const{modalcart,SetModalCart}=useContext(UserContext)
  const [modalStyle] = useState(getModalStyle);

  const nav=useNavigate()

  const handleClick = async ()=>
  {
    SetModalCart(false)
    nav("/menu")
  }

  const CustomModal = () => {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={modalcart}
        onClose={modalcart}
      >
        <div style={modalStyle} className={classes.paper}>
          <CloseIcon onClick={()=>handleClick()}   style={{position:"absolute",right:0,top:0}}/>
          <Typography style={{textAlign:"center"}} variant="h4" id="modal-title">
        
          Add to cart
          </Typography>
          <Typography style={{textAlign:"center"}} variant="subtitle1" id="simple-modal-description">
           There is no item in your cart to order
          </Typography>
         
          <Link to={"/menu"}>   <button  className='button_modal' variant="contained">
          Add to cart
        </button></Link>
    

          

        </div>
      </Modal>
    ) 
  };


  const classes = useStyles();

  return (


      <CustomModal />

  );
}

export default SimpleModal;
