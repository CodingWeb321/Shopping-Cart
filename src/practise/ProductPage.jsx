import React, { useEffect, useReducer} from 'react';
import axios from 'axios';
import Cart from './Cart';
import ProductReducer, {CartReducer} from './Reducer';


function ProductPage() {

  const initialState = {
    product: [],
    error : null,
    loading:true
  }

  const [state,dispatch] = useReducer(ProductReducer, initialState)

  const [cart, cartDispatch] =useReducer(CartReducer,[])

    // const [loading, setLoading] = useState(true);

    //list of products fetched 
    // const [product, setProduct] = useState([]);

    // const [error,setError] =useState(null);

    //cart item added list
    // const [cart,setCart] = useState([])
    // const [item,setItem] = useState(0)
    // console.log(`cart items :`,  cart);
   
    
    

    //add cart item
    const addCartClick = (id)=>{
        console.log(`this item is clicked for add to cart......... `,id);
         const newList = state.product.find((item)=>item.id===id);
         console.log(`it is from product list `,newList);
         cartDispatch({type:"ADD_CART", payload : newList})
         

        //  const arleadyInCard =cart.some(item=>item.id===id)
        //  console.log(`checking if it is in cart already or not: `,arleadyInCard);
         
        //  if(arleadyInCard){
        //     setCart(cart.map((item)=>item.id === id ?{...item, quantity: item.quantity + 1, }:item))
        //  }else{
        //     setCart([...cart,{...newList, quantity: 1}])
        //  }
         
        
    }

    const handleIncrease = (id)=>{
      cartDispatch({type:"INCREASE", payload: id })
    }
   

     const handleDecrease = (id)=>{
           cartDispatch({type:"DECREASE", payload:id})
    }
   
   
    useEffect(()=>{
      
        const getProducts = async ()=>{
         
        try {
             dispatch({type:"SET_LOADING", payload:true})
            // setLoading(true)    
            const res = await axios('https://fakestoreapi.com/products')
  
            console.log(`fetched data inside useeffect  ........`,res .data)
            dispatch({type:"SET_PRODUCTS", payload:res.data})
            // setProduct(res.data)
                    
        } catch (error) {
            console.log(`catch runed .........`);
            console.log(error);
            dispatch({type:"ERROR",payload : 'Unable to fetch product list encounter an error.'})
            // setError(`Failed to load proudcts`)
        }finally{
             dispatch({type:"SET_LOADING", payload:false})
            // setLoading(false)
        }
        }

        getProducts()
      

    },[])

    if(state.error)return(
        <h1>{state.error}</h1>
    )


    if (state.loading) return (
  <div className="flex flex-col items-center justify-center min-h-screen gap-3">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    <p className="text-gray-500">Loading products...</p>
  </div>
)
    
    return (
      <div className='flex flex-col lg:flex-row gap-2 px-4'>
        <div className='py-2 w-full lg:w-full'>
          <h2 className=' bg-green-400 text-2xl text-center py-2'>
            Product Page
          </h2>
          <div className='flex flex-col gap-4 items-center  py-2'>
            {state.product.map((item) => (
              <div
                key={item.id}
                className='w-60 text-center border p-4 rounded-lg shadow'
              >
                <h3>ID: {item.id}</h3>
                <h2>Category: {item.category}</h2>
                <br />
                <div className='flex justify-center'>
                  <img
                    src={item.image}
                    alt={item.category}
                    className='w-40 h-40 object-contain'
                  />
                </div>
                <br />
                <p>Title : {item.title}</p>
                <h3>Price: {item.price}</h3>
                <h5>Rating : {item.rating.rate}</h5>
                <br />
                <hr />

                <button 
                  className={
                    cart.some((cartItem) => cartItem.id === item.id)
                      ? 'bg-green-500 border p-2 rounded-2xl py-2 my-2 cursor-not-allowed'
                      : 'bg-blue-500 border p-2 rounded-2xl py-2 my-2 cursor-pointer'
                  }
                  disabled={cart.some((cartItem) => cartItem.id === item.id)}
                  onClick={() => addCartClick(item.id)}
                >
                  {cart.some((cartItem) => cartItem.id === item.id)
                    ? 'Added to cart '
                    : 'Add to cart'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* cart */}

        {cart.length > 0 && (
          <div className='w-full'>
            <Cart
            cart={cart}
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
          />
          </div>
        )}
      </div>
    );
}

export default ProductPage;