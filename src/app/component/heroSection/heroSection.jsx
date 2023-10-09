
import Image from 'next/image';
import React from 'react';

const HeroSection = () => {
  return (
    <div className='pl-2 md:pl-32 pr-2 md:pr-32 bg-alice-blue md:rounded-hero'>
      <div className='flex flex-col md:flex-row items-center justify-between pt-1 pb-1'>
        <div className='p-4 w-full md:w-1/2'>
          <h5 className='text-hover-effect font-normal text-base pt-1 pb-1'>
            Explore, Share, and Connect:
          </h5>
          <h1 className='text-button-color font-semibold sm:text-2xl pt-1 pb-1'>
            Your Hub for Nature, Adventure, and Technology Articles
          </h1>
          <h1 className='text-hover-effect font-normal text-base pt-1 pb-1'>
            AJ.Tech. Blog
          </h1>
          <button className='bg-button-color md:px-6 md:py-4 p-2 rounded-full text-white'>
            Signup for free! & post Article
          </button>
        </div>
        <div className='w-full md:w-1/2'>
          <Image src="/pngegg.png" width={500} height={400} alt='hero section hand pen' />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
