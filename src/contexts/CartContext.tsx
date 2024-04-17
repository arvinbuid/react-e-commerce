import {createContext, useState, ReactNode, useEffect} from "react";

// Define the type for the product
interface Product {
  id: number;
  amount: number;
  title: string;
  price: number;
  image: string;
}

// Define the type for the context value
export interface CartContextType {
  cart: Product[];
  addToCart: (product: Product, id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseAmount: (id: number) => void;
  decreaseAmount: (id: number) => void;
  itemAmount: number;
  total: number;
  shoppingTotal: number;
}

// Create cart context
export const CartContext = createContext<CartContextType>(undefined!);

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = ({children}) => {
  // cart state
  const [cart, setCart] = useState<Product[]>([]);
  // cart item amount state
  const [itemAmount, setItemAmount] = useState(0);
  // cart total state
  const [total, setTotal] = useState(0);
  // sidebar shopping cart amount state
  const [shoppingTotal, setShoppingTotal] = useState(0);

  // sidebar shopping bag total amount
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setShoppingTotal(amount);
    }
  });

  // sidebar cart total amount
  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(total);
  });

  // header cart total amount
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  // add to cart
  const addToCart = (product: Product, id: number) => {
    const newItem = {...product, amount: 1};

    // check if the item is already in the cart
    const cartItem = cart.find((item) => item.id === id);

    // if cart item is already in the cart
    if (cartItem) {
      const newCart = cart.map((item) =>
        item.id === id ? {...item, amount: (cartItem.amount || 0) + 1} : item
      );
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  // remove to cart
  const removeFromCart = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  // clear cart
  const clearCart = () => {
    setCart([]);
  };

  // increase amount
  const increaseAmount = (id: number) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      addToCart(cartItem, id);
    }
  };

  // decrease amount
  const decreaseAmount = (id: number) => {
    const cartItem = cart.find((item) => item.id === id);

    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return {...item, amount: cartItem.amount - 1};
        } else {
          return item;
        }
      });
      setCart(newCart);
      if (cartItem.amount < 2) {
        removeFromCart(id);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
        shoppingTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
