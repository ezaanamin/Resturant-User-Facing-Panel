import React from 'react';
import "./review.css"
import  { addToCart }  from "../redux/slice/cart"
import { useDispatch, useSelector } from "react-redux";
const Recommended = ({id, img,name,price,}) => {



    const state = useSelector((state) => state);
    const dispatch = useDispatch();

 
    const Add=(id,name,img,price)=>{

        const product={id:id,name:name,price:price,img:img}
             dispatch(addToCart(product))
        }


    return (
      
<div>
            
     <img style={{width:70,height:70,marginRight:25}} src={`http://localhost:4000/upload/${img}`}/>


<h2 style={{marginRight:25}}>{name}</h2>


<button onClick={()=>Add(id,name,img,price)}  type="submit"  className='button_Recommended'>Add to Cart</button>
</div>

  
    );
}

export default Recommended;
