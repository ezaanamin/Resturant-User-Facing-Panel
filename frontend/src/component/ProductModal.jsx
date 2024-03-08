import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import "./modal.css"
import { UserContext } from "../context/context";
import { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import CloseIcon from '@material-ui/icons/Close';
import { addToCart } from "../redux/slice/cart";
import { useDispatch, useSelector } from "react-redux";
function ProductModal({id,name,img,price}) {
  const dispatch = useDispatch();
  
  const state = useSelector((state) => state);




const Add=(id,name,img,price)=>{

const product={id:id,name:name,price:price,img:img}
     dispatch(addToCart(product))
     SetProductModal(false)
}
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
 
      const{productModal,SetProductModal,SetCartState}=useContext(UserContext)
      const [modalStyle] = useState(getModalStyle);
   
    
  
  useEffect(()=>{

    if(state.cart.cartItems.length!=0)
    {
      SetCartState(false)
    }

  },[])
    
    
      const classes = useStyles();
    
  return (
    <Modal
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open={productModal}
    onClose={productModal}
  >
    <div style={modalStyle} className={classes.paper}>
   <CloseIcon  style={{position:"absolute",right:0,top:0}}  onClick={()=>SetProductModal(false)} />
      <Typography  variant="h4" id="modal-title">
       {name}

      </Typography>
      <Typography variant="subtitle1" id="simple-modal-description">
      <img alt="img" style={{width:400}} src={img}/>
      </Typography>
    <p style={{marginBottom:20}}>${price}</p>
            <button onClick={()=>Add(id,name,img,price)}  type="submit" className='button_cart1' variant="contained">

  Add to Cart
</button>

    </div>


  </Modal>

  )
}

export default ProductModal