'use client';

import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import { ProductImage } from '@/components';



interface Props {
  images: string[];
  title: string;
  className?: string;
}



export const ProductMobileSlideshow = ( { images, title, className }: Props ) => {


  return (
    <div className={ className }>

      <Swiper
        style={{
          width: '100vw',
          height: '500px'
        }}
        pagination
        autoplay={{
          delay: 2500
        }}
        modules={ [ FreeMode, Autoplay, Pagination ] }
        className="mySwiper2"
      >

        {images.length > 0 ? (
          images.map(image => (
            <SwiperSlide key={image}>
              <ProductImage
                width={300}
                height={300}
                src={image}
                alt={title}
                className="rounded-lg object-fill"
              />
            </SwiperSlide>
          ))
        ) : (
            <SwiperSlide key='/imgs/placeholder.jpg'>
              <Image
                src={'/public/imgs/placeholder.jpg'}
                alt={"palceholder"}
                className="w-full object-cover rounded"
                width={300}
                height={300}

              />
          </SwiperSlide>
        )}
      </Swiper>



    </div>
  );
};