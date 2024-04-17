// import images
import WomanImg from "../img/woman_hero.png";
// import links
import {Link} from "react-router-dom";

const Hero = () => {
  return (
    <section className='bg-hero h-[800px] bg-no-repeat bg-cover bg-center py-24'>
      <div className='container mx-auto flex justify-around h-full'>
        {/* text */}
        <div className='flex flex-col justify-center'>
          {/* pretitle */}
          <div className='font-semibold uppercase flex items-center'>
            <div className='w-10 h-[2px] bg-red-700 mr-4'></div>
            New Trend
          </div>
          {/* title */}
          <h1 className='text-[70px] leading-[1.1] font-light mb-4 xs:text-[50px]'>
            AUTUMN SALE STYLISH <br />
            <span className='font-semibold'>WOMENS</span>
          </h1>
          <Link to='/' className='self-start uppercase font-semibold border-b-2 border-primary'>
            Discover More
          </Link>
        </div>
        {/* image */}
        <div className='hidden lg:block mt-1'>
          <img src={WomanImg} alt='woman' />
        </div>
      </div>
    </section>
  );
};

export default Hero;
