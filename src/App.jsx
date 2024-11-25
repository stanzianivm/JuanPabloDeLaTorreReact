import Header from "./components/Header";
import Guitar from "./components/Guitar";
import Footer from "./components/Footer";
import useCart from "./hooks/useCart";

function App() {

  const { 
    data,
    cart,
    addToCart,
    removeFromCart,
    increanseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal
  } = useCart();

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increanseQuantity={increanseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
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
