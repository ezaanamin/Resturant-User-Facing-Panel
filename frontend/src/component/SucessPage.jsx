import React from 'react';
import { Checkmark } from 'react-checkmark'
import "./sucess.css"
import { useNavigate } from 'react-router-dom';

const SucessPage = ({order_number}) => {
    const nav=useNavigate();

    const menu=()=>{
 nav('/menu')
    }

    const orders=()=>{
        nav('/orders')
    }
    
    return (
        <div style={{backgroundColor:"#213246",width:"100%",height:"100vh"}}>
            <div style={{position:"relative",top:200}}>
               <Checkmark size='256px' color='#7fa142'/>
<h1 style={{textAlign:"center",marginTop:25,color:"#7fa142"}}>Your Order #{order_number} has been placed and will arrive within 30 min </h1>


<div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:30}}>
<button onClick={()=>menu()} className='button_sucess'>Back to Menu</button>

<button onClick={()=>orders()} className='button_sucess'>My Orders</button>

</div>
</div>
        </div>
    );
}

export default SucessPage;


