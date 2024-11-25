import { useEffect, useState } from "react";
import { db } from "../data/db";
import { useMemo } from "react";

const useCart = () => {    
    const initialCart = () => {
        const localStorageCart = getLocalStorage();
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }
    
    const [data, setData] = useState(db);
    const [cart, setCart] = useState(initialCart);

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

    // State Derivado
    const isEmpty = useMemo( () => cart.length === 0, [cart] );
    const cartTotal = useMemo( () => cart.reduce( (total, item) => total + (item.quantity * item.price), 0 ), [cart] );
        
    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increanseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
    }
}

export default useCart
