import { useEffect, useState } from 'react'
import { Guitar } from './components/Guitar'
import { db } from './data/db'
import { Header } from './components/Header';

function App() {

  const initialCart = ()=>{
    const actualCart = localStorage.getItem('cart');
    return actualCart? JSON.parse(actualCart): []
  }
  const [ data ] = useState(db);
  const [ cart, setCart ] = useState(initialCart);
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;


  const handleAddToCart = (item) =>{
    const indexItemExist = cart.findIndex(element =>{
      return item.id === element.id
    })

    if(indexItemExist === -1) {
      item.quantity = 1
      setCart([...cart, item])
    } else {
      if(item.quantity >= MAX_ITEMS) return
      const newCart = [...cart]
      newCart[indexItemExist].quantity++
      setCart([...newCart])
    }
  }

  function deleteFromCart (id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity (id) {
    const newCart = cart.map( item => {
      if(item.id === id && item.quantity < MAX_ITEMS ) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }

      return item
    }) 
    setCart([...newCart])
  }

  function decreaseQuantity(id){
    const newCart = cart.map(guitar => {
      if(guitar.id===id && guitar.quantity > MIN_ITEMS) {
        return {
          ...guitar,
          quantity: guitar.quantity - 1
        }
      }

      return guitar
    })

    setCart([...newCart])
  }

  function clearCart() {
    setCart([])
  }

  useEffect(()=> {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(()=>{
    const carts = JSON.parse(localStorage.getItem('cart'))
    if(carts){
      setCart(carts)
    }
  },[])

  return (
    <>
      
      <Header
        cart = {cart}
        deleteFromCart = { deleteFromCart}
        increaseQuantity = { increaseQuantity }
        decreaseQuantity = { decreaseQuantity }
        clearCart = { clearCart }
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            data.map((guitar)=>(
              <Guitar
                key={guitar.id}
                guitar={guitar}
                addToCart = { handleAddToCart }
              />
            ))
          }
         
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </>
  )
}

export default App
