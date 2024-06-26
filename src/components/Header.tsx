import {useContext, useEffect, useState} from "react";
// import sidebar context
import {SidebarContext} from "../contexts/SidebarContext";
// import cart context
import {CartContext} from "../contexts/CartContext";
// import icons
import {BsBag} from "react-icons/bs";
// import link
import {Link} from "react-router-dom";
import Logo from "../img/logo.svg";

const Header = () => {
  // header state
  const [isActive, setIsActive] = useState<boolean>(false);
  const {isOpen, setIsOpen} = useContext(SidebarContext);
  const {itemAmount} = useContext(CartContext);

  // event listener {
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-4"
      } w-full fixed z-10 transition-all`}
    >
      <div className='container mx-auto flex items-center justify-between h-full xs:px-5'>
        {/* logo */}
        <Link to={"/"}>
          <div>
            <img className='w-[40px]' src={Logo} alt='logo' />
          </div>
        </Link>

        {/* cart */}
        <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer flex relative'>
          <BsBag className='text-2xl' />
          <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] text-white rounded-full flex justify-center items-center '>
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
