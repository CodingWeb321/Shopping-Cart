
import { Trash, Plus, Minus } from "lucide-react";

function Cart({cart , handleDecrease, handleIncrease}) {
    // const [cartItemCount, setCartItemCount] =useState(1);
    
   const cartItem = cart.reduce((acc,item)=>{
     const count = acc +item.quantity;
     return count
   },0)
  
   const cartPrice =  cart.reduce((acc,item)=>{
    return acc + (item.price * item.quantity)
    
   },0)


   
   


    return (
           <div className='py-2  w-2/4'>
          <aside className='flex flex-col gap-2 '>
            <h2 className='text-center py-2  bg-red-400'> Cart list</h2>
            <div className="font-bold bg-orange-400 p-2">
              <h3 >Cart Item : {cartItem}</h3>
            <h3>Total Cart Price : {cartPrice.toFixed(2)}</h3>
            </div>


            {cart.map((item) => (
              <div key={item.id} className='w-full text-center border p-4 rounded-lg shadow'>
                <h2>Category: {item.category}</h2>
                
                <h4>Price Item : {item.price}</h4>
                <div className='flex justify-center'>
                  <img
                    src={item.image}
                    alt={item.category}
                    className='w-10 h-10 object-contain'
                  />
                </div>
                <div className='flex justify-center items-center py-5 gap-2'>
                    <button className='cursor-pointer border rounded-2xl px-2 ' 
                    onClick={()=>handleIncrease(item.id)}><Plus/></button>

                 <h5 className='font-bold'> {item.quantity} Quantity </h5>

                <button className={item.quantity === 1 ?   'cursor-pointer' : 'cursor-pointer border rounded-2xl px-2'}
                onClick={()=>handleDecrease(item.id,item.quantity)} 
                >{item.quantity===1 ?<Trash size={45} color="red"/>: <Minus/>}</button>
              
                </div>
                
              </div>
            ))}
          </aside>
        </div>
    );
}

export default Cart;