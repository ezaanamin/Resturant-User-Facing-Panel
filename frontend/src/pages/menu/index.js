import React, { useState,useEffect } from 'react'
import axios from "axios"
import "./menu.css"
import{
    Box,
    Card,
    CardAction,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery,
    
    
    
    }  from '@mui/material'
    import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';  
    import { useDispatch, useSelector } from "react-redux";
 import { fetchStarters,fetchBreakfast,fetchLunch,fetchDinner,fetchDersert,fetchBeverage } from '../../redux/slice/data';
 import { addToCart } from '../../redux/slice/cart';
 import Slideshow from '../../component/SlideShow';
import TestiMonials from '../../component/ReviewSlideShow';
import Modal1 from '../../component/modal';
import { UserContext } from '../../context/context';
import { useContext } from "react";
import { RingLoader } from 'react-spinners';
import ProductModal from '../../component/ProductModal';
import ReviewModals from '../../component/ReviewModal';
const Product=({
    id,
    name,
    img,
    price
    
    })=>{
      const{customers,SetCustomers,log,SetLog,modal,SetModal,productModal,SetProductModal,name1,SetName,img1,SetImg,price1,SetPrice,id1,SetId,SetNavCart}=useContext(UserContext)
      const dispatch = useDispatch();
  
      const state = useSelector((state) => state);
const checkUser=([id,name,img,price])=>{
 console.log(id,name,img,price)

 if (log === false) {
  SetNavCart(false);
  SetModal(true);
} else {

  SetProductModal(true);
  SetName(name);
  SetPrice(price);
  SetImg(img);
  SetId(id);
}
  


}
    
    return(
     <>
    
    <Card
    sx={{backgroundImage:"none",
    borderRadius:"0.55rem",
    height:"400px",
    width:"250px",
    backgroundColor:"#213246",
    border: '1px solid #7fa142' 
    }}
    >
    
    
    <CardContent >
     

            <Typography variant="h5"  className='menu_text' component="div">
              {name.substring(0,20)}... 
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
             color=	"white" 
              gutterBottom
            >
             
            </Typography>
            <img src={`http://localhost:4000/upload/${img}`} style={{width:'200px',height:'200px'}}/>
           
                     <Rating style={{position:"relative",left:50,marginTop:10}} value={3.5} readOnly />
    
            <Typography  style={{color:"white",position:"relative",left:70}} sx={{ mb: "1.5rem" }}>
  ${price}   
           
     <AddShoppingCartIcon   onClick={() => checkUser([id,name,`http://localhost:4000/upload/${img}`,price])} style={{color:"white",position:"relative",left:80}} color={"#7fa142"}/>     
     </Typography>     
          </CardContent>
        

    
    </Card>
   
    </> 
    
    
    )
    
    }

 
function Menu() {






  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { cart } = useSelector((state) => state);
  const [ring,SetRing]=useState(false);
  const{toogle1,SetToogle1,ReviewModal,SetReviewModal,customers,SetCustomers,log,SetLog,modal,SetModal,productModal,SetProductModal,name1,SetName,img1,SetImg,price1,SetPrice,id1,SetId,nav_cart,SetNavCart}=useContext(UserContext)
  useEffect(()=>{
    dispatch( fetchStarters())
    dispatch(fetchBreakfast())
    dispatch(fetchLunch())
    dispatch(fetchDinner())
    dispatch(fetchDersert())
    dispatch(fetchBeverage())


    
      },[!state.data])
    
  const handle = (log) => {
  if (log === true) {

    SetToogle1(7);
    SetReviewModal(true);
  } else {

    SetNavCart(false);
    SetModal(true);
  }
};

  



  const [toogle,SetToogle]=useState(1) 
  return (
    
    <div className='menu'>

      {
        ReviewModal?
        <ReviewModals heading={"Leave a Review"}/>
        :null
      }
    <ProductModal id={id1} name={name1} img={img1} price={price1} />
{!nav_cart?
<Modal1 heading={"Please Login in"} desc={"PLease login in order to add item to cart"} button_display={true}/>:
<Modal1 heading={"Please add items to cart"} desc={"PLease add items to cart in order to proceed forward"} button_display={false}/>
}


<h1 className='menu_text'>Our Menu</h1>
<Slideshow/>
<TestiMonials/>  

<Box  
       mt="20px"
       display={"flex"}
       justifyContent="center"
       marginBottom={10}
       

    
 
    >

<button className={toogle1==7?"selected":"menu_button"} onClick={()=>handle()}>Leave a Review </button>

    </Box>




<Box  
       mt="20px"
       display={"flex"}
       justifyContent="center"
       marginBottom={10}
       

    
 
    >


      <button className={toogle==1?"selected":"menu_button"} onClick={()=>SetToogle(1)}>Starters</button>
      <button className={toogle==2?"selected":"menu_button"} onClick={()=>SetToogle(2)}>Breakfast</button>
      <button  className={toogle==3?"selected":"menu_button"} onClick={()=>SetToogle(3)}>Lunch</button>
      <button className={toogle==4?"selected":"menu_button"} onClick={()=>SetToogle(4)}>Dinner</button>
      <button  className={toogle==5?"selected":"menu_button"}onClick={()=>SetToogle(5)}>Dessert</button>
      <button  className={toogle==6?"selected":"menu_button"} onClick={()=>SetToogle(6)}>Beverage</button>
      {!state.data.dersert && !state.data.breakfast && !state.data.starters && !state.data.lunch && !state.data.dinner  && !state.data.beverage ? <RingLoader  size={150} color='#7fa142' className='ring_style' />:null}
    </Box>
<Box  
       mt="10px"
       display="grid"
       gridTemplateColumns="repeat(6,minmax(0,1fr))"
    
         rowGap="20px"
     position="relative"
  
     
 
    >
      {state.data.breakfast  && toogle==2?
   
   state.data.breakfast .map((s) => (
    <div className='ani'>
   <Product id={s._id} name={s.name}
    price={s.price}
    img={s.img}
    />
    </div>

 
  ))
    :null
    
    
    }
          {state.data.starters  && toogle==1?
   
   state.data.starters .map((s) => (
    <div className='ani'>
   <Product id={s._id} name={s.name}
    price={s.price}
    img={s.img}
    />
    </div>

 
  ))
    :null
    
    
    }
           {state.data.lunch  && toogle==3?
   
   state.data.lunch .map((s) => (
    <div className='ani'>
   <Product id={s._id} name={s.name}
    price={s.price}
    img={s.img}
    />
    </div>

 
  ))
    :null
    
    
    }
           {state.data.dinner  && toogle==4?
   
   state.data.dinner .map((s) => (
    <div className='ani'>
   <Product id={s._id} name={s.name}
    price={s.price}
    img={s.img}
    />
    </div>

 
  ))
    :null
    
    
    }
             {state.data.dersert  && toogle==5?
   
   state.data.dersert.map((s) => (
    <div className='ani'>
   <Product id={s._id} name={s.name}
    price={s.price}
    img={s.img}
    />
    </div>

 
  ))
    :null
    
    
    }


{state.data.beverage  && toogle==6?
   
   state.data.beverage .map((s) => (
    <div className='ani'>
   <Product id={s._id} name={s.name}
    price={s.price}
    img={s.img}
    />
    </div>

 
  ))
    :null
    
    
    }




</Box>

  

    </div>
  )
}

export default Menu