// import useParams
import {useParams} from "react-router-dom";
// import cart context
import {CartContext} from "../contexts/CartContext";
// import product context
import {ProductContext, Product} from "../contexts/ProductContext";
import {useContext} from "react";

const ProductDetails = () => {
  const {id} = useParams<{id: string}>();
  const productContext = useContext(ProductContext);
  const {addToCart} = useContext(CartContext);

  // Check if id is undefined e.g redirect to 404 page
  if (!id) {
    return null;
  }

  // Check if productContext is undefined
  if (!productContext) {
    return <div>Loading...</div>;
  }

  const {products} = productContext;

  // get single product based on the id
  const product = products.find((item: Product) => item.id === parseInt(id));

  // if product is not found/fetching
  if (!product) {
    return <div className='h-screen flex justify-center items-center'>Loading...</div>;
  }

  // destructure product
  const {title, price, description, image} = product;

  return (
    <section className='pt-32 pb-12 lg:py-32 h-screen flex items-center'>
      <div className='container mx-auto'>
        {/* image & text wrapper*/}
        <div className='flex flex-col lg:flex-row items-center md:flex-row'>
          {/* image */}
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
            <img
              className='max-w-[200px] lg:max-w-sm md:max-w-[300px] xs:max-w-[120px]'
              src={image}
              alt='product image'
            />
          </div>
          {/* text */}
          <div className='flex-1 text-center lg:text-left xs:w-[350px] xs:px-4'>
            <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>{title}</h1>
            <div className='text-lg text-red-500 mb-6 font-medium'>$ {price}</div>
            <p className='mb-8 xs:text-[14px]'>{description}</p>
            <button
              onClick={() => {
                addToCart(product, product.id);
              }}
              className='bg-primary text-white py-4 px-8 mb-6'
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
