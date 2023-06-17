import logo from './logo.svg';
import './App.css';
import Homepage from "./pages/Homepage"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useState } from 'react';
import { UserContext } from './context/context';
import store from "../src/redux/store.js"
import Login from "./pages/login/index"
import About from "./pages/About us/index"
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './component/Navbar';
import Contact from "./pages/Contact us/index"
import Signin from "./pages/SignIn/index"
import Menu from "./pages/menu/index"
import Cart from "./pages/cart/index"
import Orders from "./pages/Order";
import SucessPage from './component/SucessPage';
import Modal1 from "./component/modal"

function App() {
  const [customers,SetCustomers]=useState([])
  const[log,SetLog]=useState(false)
  const [modal,SetModal]=useState(false)
  const [name1,SetName]=useState("")
  const [img1,SetImg]=useState("")
  const [price1,SetPrice]=useState(0)
  const [id1,SetId]=useState("")
  const [nav_cart,SetNavCart]=useState(false)
  const [cart_state,SetCartState]=useState(true)
 const [transactions,Settransactions]=useState("")
 const[productModal,SetProductModal]=useState(false)
 const [paymentMethod, setPaymentMethod] = useState("COD");
 const [ButtonDisable,SetButtonDisable]=useState(false);
 const [modalcart,SetModalCart]=useState(false)
 const [modal1,SetModal1]=useState(false);
 const [orderNumber,SetOrderNumber]=useState(0)
 const[ReviewModal,SetReviewModal]=useState(false)
 const [toogle1,SetToogle1]=useState(0)

   const  value={toogle1,SetToogle1,ReviewModal,SetReviewModal,modal1,SetModal1,customers,SetCustomers,log,SetLog,modal,SetModal,productModal,SetProductModal,name1,SetName,img1,SetImg,price1,SetPrice,id1,SetId,nav_cart,SetNavCart,cart_state,SetCartState,transactions,Settransactions,paymentMethod, setPaymentMethod,ButtonDisable,SetButtonDisable,modalcart,SetModalCart,orderNumber,SetOrderNumber}

  const router = createBrowserRouter([
    {
        path:'/',
       element: (
            <div>   
<Homepage/>   
{!nav_cart?
<Modal1 heading={"Please Login in"} desc={"PLease login in order to add item to cart"} button_display={true}/>:
<Modal1 heading={"Please add items to cart"} desc={"PLease add items to cart in order to proceed forward"} button_display={false}/>
}
        
      
            </div>
          ),
      


    },
    {
        
      path:'/login',
     element: (
          <div>  
           
         <Login/>
      
          </div>
        ),
        
    
    
    },
    {
        
      path:'/about',
     element: (
          <div>  
           <Navbar/>
         <About/>
         {!nav_cart?
<Modal1 heading={"Please Login in"} desc={"PLease login in order to add item to cart"} button_display={true}/>:
<Modal1 heading={"Please add items to cart"} desc={"PLease add items to cart in order to proceed forward"} button_display={false}/>
}
      
          </div>
        ),
        
    
    
    },
    {
        
      path:'/contact',
     element: (
          <div>  
           <Navbar/>
         <Contact/>
         {!nav_cart?
<Modal1 heading={"Please Login in"} desc={"PLease login in order to add item to cart"} button_display={true}/>:
<Modal1 heading={"Please add items to cart"} desc={"PLease add items to cart in order to proceed forward"} button_display={false}/>
}
      
          </div>
        ),
        
    
    
    },

    {
        
      path:'/signup',
     element: (
      <div>
<Signin/>
      
          </div>
        ),
        
    
    
    },
    {
        
      path:'/menu',
     element: (
          <div>  
            <Navbar menu={true}/> 
         <Menu/>
      
    
          </div>
        ),
        
    
    
    },
    {
      
        
        path:'/cart',
       element: (
            <div>  
       
      <Cart/>
        
      
            </div>
          ),
          
      
      
      },
      {
      
        
        path:'/orders',
       element: (
            <div>  
       
      <Orders/>
        
      
            </div>
          ),
          
      
      
      },

      {
        path:"/sucess",
        element:(

          <div>

<SucessPage order_number={orderNumber}/>

          </div>
        )
      }
    


])

  return (
    <div className="App">
    <UserContext.Provider value={value}>
 <GoogleOAuthProvider clientId={"6867272994-733nlidndvavpaclj0thmala90pf6kd2.apps.googleusercontent.com"}>

<RouterProvider router={router} />
</GoogleOAuthProvider>
</UserContext.Provider>
   </div>
  );
}

export default App;
