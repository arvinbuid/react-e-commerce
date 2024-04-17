import React, {createContext, useState, useEffect, ReactNode} from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  amount: number;
}

export interface ProductContextType {
  products: Product[];
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

// Define ProductProvider component
const ProductProvider: React.FC<ProductProviderProps> = ({children}) => {
  // products state
  const [products, setProducts] = useState<Product[]>([]);

  // fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return <ProductContext.Provider value={{products}}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
