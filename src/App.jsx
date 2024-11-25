import Header from "./components/Header";
import Guitar from "./components/Guitar";
import Footer from "./components/Footer";
import { db } from "./data/db";
import { useEffect, useState } from "react";

function App() {
  const initialCart = () => {
    const localStorageCart = getLocalStorage();
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [data, setData] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const MIN_ITEMS = 1;
  const MAX_ITEMS = 5;

  useEffect(() => {
    saveLocalStorage();
  }, [cart])
  

  function addToCart(item) {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
    
    if (itemExist >= 0) {
      const updateCart = [...cart];

      if (cart[itemExist].quantity >= MAX_ITEMS) return;
      
      updateCart[itemExist].quantity++;
      setCart(updateCart);
    } else {
      item.quantity = 1;
      setCart( prevCart => [...prevCart, item]);
    }
  }

  function removeFromCart(id) {
    setCart( prevCart => prevCart.filter( guitar => guitar.id !== id))
  }

  function increanseQuantity(id) {
    const updateCart = cart.map( item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }

      return item;
    });
    setCart(updateCart);
  }

  function decreaseQuantity(id) {
    const updateCart = cart.map( item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        }        
      }

      return item;
    });
    setCart(updateCart);
  }

  function clearCart() {
    setCart([]);
    removeLocalStorage();
  }

  function saveLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function getLocalStorage() {
    localStorage.getItem('cart');
  }

  function removeLocalStorage() {
    localStorage.removeItem('cart');
  }

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increanseQuantity={increanseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((data) => (
            <Guitar
              key={data.id}
              guitar={data}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App
