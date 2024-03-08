import React, { useEffect} from 'react'
import { UserContext } from '../../context/context'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SimpleModal from '../../component/modal'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import "./cart.css"
import SubTotal from "../../component/SubTotal"
import { GetTotal } from '../../redux/slice/cart'
import ProductCart from '../../component/ProductCart'
import { Scrollbars } from "react-custom-scrollbars-2";
import CustomersInformation from '../../component/CustomersInformation'
import EditIcon from '@mui/icons-material/Edit';
import AddressForm from '../../component/AddressForm'
import { fetchStarters,fetchBreakfast,fetchLunch,fetchDinner,fetchDersert,fetchBeverage  } from '../../redux/slice/data'
import Recommended from '../../component/Recommended'

function Cart() {

  const now = new Date();
const currentHour = now.getHours();
 const nav=useNavigate()

  const{log,SetModal,SetNavCart,SetModal1}=useContext(UserContext)
  
  const state = useSelector((state) => state);
  const dis=useDispatch()


  useEffect(()=>{
dis(fetchBeverage())
dis(fetchBreakfast())
dis (fetchLunch())
dis (fetchDinner())
dis(fetchDersert())

  console.log('ezaan', state.data);



  },[])

useEffect(()=>{
 dis(GetTotal())
},[])

useEffect(() => {
  if (log !== true) {
    SetNavCart(false);
    SetModal(true);
    nav("/menu");
  }
}, [log, SetNavCart, SetModal, nav]);



  return (
    <>
    <div><SimpleModal heading={"Add items to your cart"} desc={"Please add item to your cart in order to procced forward"}/>
    
    <AddressForm/>
    </div>
   <div className='cart'>
<h1 style={{color:"#7fa142"}}>My Cart </h1>

       
          <p style={{marginBottom:10,color:"white",marginTop:5,marginBottom:30}} className="total-items">
            you have <span className="total-items-count">{state.cart.cartItems.length} </span>{" "}
            items in shopping cart
          </p>
      
<div className='cart_product'>
  {state.cart.cartItems.length!=0?
<Scrollbars>
{
     state.cart.cartItems.map((s) => (
  

  <ProductCart styles={{marginBottom:125}} id={s.id} title={s.name} price={s.price} img={s.img}/>
  
   
    ))
}
</Scrollbars>
:
<div>
<h1  style={{position:"relative",top:300}}>No Item's in Basket</h1>

<Link to={'/menu'}><button className='button_cart'>Add To Cart</button>
</Link>
</div>


}
<h3 style={{marginTop:100,color:"#7fa142",marginBottom:20,position:"relative",left:600,bottom:state.cart.cartItems.length==0?150:1050}}>Recommended</h3>

{((currentHour >= 6 && currentHour < 12)) && state.cart.cartItems.length === 0 ? (
  state.data.breakfast && state.data.breakfast.slice(0, 3).map((b) => (
    <div className='recommended' key={b._id}>
      <Recommended name={b.name} price={b.price} img={b.img} />
    </div>
  ))
) : null}

{(currentHour >= 12 && currentHour < 17) && state.cart.cartItems.length === 0 ? (
  state.data.lunch && state.data.lunch.slice(0, 3).map((l) => (
    <div className='recommended' key={l._id}>
      <Recommended name={l.name} price={l.price} img={l.img} />
    </div>
  ))
) : null}

{(currentHour >= 17 && currentHour < 21) && state.cart.cartItems.length === 0 ? (
  state.data.dinner && state.data.dinner.slice(0, 3).map((d) => (
    <div className='recommended' key={d._id}>
      <Recommended name={d.name} price={d.price} img={d.img} />
    </div>
  ))
) : null}

{(currentHour > 21 || currentHour < 6) && state.cart.cartItems.length === 0 ? (
  state.data.dersert && state.data.dersert.slice(0, 3).map((s) => (
    <div className='recommended' key={s._id}>
      <Recommended name={s.name} price={s.price} img={s.img} />
    </div>
  ))
) : null}

{
 state.cart.cartItems.length!=0?


 state.data.beverage.slice(0, 3).map((s) => (
  <div className='recommended1'>
    <Recommended  id={s._id} name={s.name}
    price={s.price}
    img={s.img}
    
    />
    </div>
  ))


  :null
}

</div>

<div className='checkout_right'>
  
<SubTotal/>
<h3 style={{marginTop:50,color:"#7fa142",marginBottom:20}}>Customer's Information <EditIcon/></h3>
<CustomersInformation/>






</div>



</div>

    </>
  )
}

export default Cart