import React,{useContext, useEffect} from 'react'
import Logo from "../Logo/image.png"
import SearchIcon from '@mui/icons-material/Search';
import ViewListIcon from '@mui/icons-material/ViewList';
import {Link} from "react-router-dom"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import "./navbar.css"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { UserContext } from '../context/context';
import { addToCart } from '../redux/slice/cart';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
function Navbar({menu}) {
  
  const nav=useNavigate();
  const{customers,SetCustomers,log,SetLog,modal,SetModal,nav_cart,SetNavCart}=useContext(UserContext)
  const state = useSelector((state) => state);
  const { cart } = useSelector((state) => state);
  const handleClick = async () => {
    SetLog(false)
    SetCustomers([])
   
   
    }
   
const  handleCart=async()=>{

  if(log==false)
  {
    SetNavCart(false)
    SetModal(true)
  }
  
  if(log==true)
  {

  
    
    nav('/cart')
  }
    
  

}
const handleBasket=async()=>{
  if(log==false)
  {
    SetNavCart(false)
    SetModal(true)
  }
  if(log==true)
  {

  
    
    nav('/orders')
  }

}


useEffect(()=>{




},[state.cart.cartItems.length])

  return (
    <div className=' nav'>
     

      <div style={{display:"flex",marginLeft:40}}>
 <img  style={{width:100,height:100,marginRight:25}} src={Logo}/>

<Link to={'/'}><p  style={{marginRight:20,position:"relative",top:30,color:"#7fa142"}}>Home</p></Link>
<Link to={'/about'}><p style={{marginRight:20,position:"relative",top:30,color:"#7fa142"}}>About</p></Link>
<Link to={'/menu'}><p style={{marginRight:20,position:"relative",top:30,color:"#7fa142"}}>Menu</p></Link>
<Link to={'/contact'}><p style={{marginRight:20,position:"relative",top:30,color:"#7fa142",marginLeft:20}}>Contact Us</p> </Link>  

  <p style={{position:"relative",top:5 , left:1240,color:"#7fa142",marginLeft:25}}>{state.cart.cartItems.length}</p>
  <AddShoppingCartIcon onClick={()=>handleCart()}  style={{position:"relative",top:30 , left:1200,color:"#7fa142",marginLeft:25}}/>
  <ShoppingBasketIcon onClick={()=>handleBasket()}  style={{position:"relative",top:30 , left:1200,color:"#7fa142",marginLeft:25}}/>
   
 
 {
  log==false?<Link to={'/login'}> <LoginIcon  style={{position:"relative",top:30 , left:1200,color:"#7fa142",marginLeft:25}}/></Link>:
  <>
  <ExitToAppIcon     onClick={() => handleClick()} className='logout'/>
  <a className='hide'>Sign Out</a>


  </>
 }

     

   
     
</div>
    </div>
  )
}

export default Navbar