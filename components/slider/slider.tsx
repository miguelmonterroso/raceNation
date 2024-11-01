import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import 'swiper/css'
import Image from "next/image";

export default function Slider(){
    return(
        <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        className="h-[30vh]"
        autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
      >
            <SwiperSlide className="flex items-center justify-center">
                <Image src="https://images.unsplash.com/photo-1487480769727-0c01c8d362b6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" layout="fill" objectFit="cover" priority alt="headerImage"/>
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
                <Image src="https://images.unsplash.com/photo-1670187670852-c002186baf04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" layout="fill" objectFit="cover" priority alt="headerImage"/>
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center">
                <Image src="https://images.unsplash.com/photo-1597588560977-8d49c452a773?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" layout="fill" objectFit="cover" priority alt="headerImage"/>
            </SwiperSlide>
        ...
        </Swiper>
    );
}