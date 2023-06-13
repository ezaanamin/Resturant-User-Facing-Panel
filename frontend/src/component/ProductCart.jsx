import React from 'react'
import "./product_cart.css"  
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { RemoveCart } from '../redux/slice/cart';
import { useDispatch } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
function ProductCart({ id,title, img, price,order_id,order=false}) {

  const dis=useDispatch()

  return (


<>
<div className="items-info">

        <div className="product-img">
        {!order?
          <img src={img} alt="iamge" />
          :
          <img src={`http://localhost:4000/upload/${img}`} alt="iamge" />
        }
        </div>

        <div className="title">
          <h3>{title}</h3>

        </div>


        <div className="price">
          <h4>${price}</h4>
        </div>

        <div className="remove-item">
          {!order?
        <RemoveShoppingCartIcon className='remove_cart'
            onClick={()=>dis( RemoveCart(id))}></RemoveShoppingCartIcon>
            :
            <div className='remove_cart'>

              #{order_id}
              </div>
          }
        </div>
      </div>

      <hr />

</>
  )
}

export default ProductCart