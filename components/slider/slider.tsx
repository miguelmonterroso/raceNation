import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Slider() {
  const { translations } = useThemeLanguage();

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      className="h-[91vh] lg:h-[92vh]"
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
    >
      <SwiperSlide className="flex items-center justify-center relative">
        <Image
          src="https://images.unsplash.com/photo-1722308281308-d88f5508a545?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          layout="fill"
          objectFit="cover"
          priority
          alt="headerImage"
          className="relative"
        />

        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute p-5 w-full h-full flex flex-col justify-center">
          <div className="w-full lg:w-1/2 p-3 text-white">
            <h2 className="font-bold text-3xl mb-2">
              {translations.home.sliders.slider1.title}
            </h2>
            <p className="mb-3 text-lg pr-5">
              {translations.home.sliders.slider1.subTitle}
            </p>
            <Link href="/ranking">
            <Button className="w-1/2 lg:w-1/4 font-bold">
              {translations.home.sliders.slider1.button}
            </Button>
            </Link>
            
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex items-center justify-center relative">
        <Image
          src="https://images.unsplash.com/photo-1531986627054-7f294d095acd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          layout="fill"
          objectFit="cover"
          priority
          alt="headerImage"
          className="relative"
        />

        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute p-5 w-full h-full flex flex-col justify-center">
          <div className="w-full lg:w-1/2 p-3 text-white">
            <h2 className="font-bold text-3xl mb-2">
              {translations.home.sliders.slider2.title}
            </h2>
            <p className="mb-3 text-lg pr-5">
              {translations.home.sliders.slider2.subTitle}
            </p>
            <Link href="/events">
            <Button className="w-1/2 lg:w-1/4 font-bold">
              {translations.home.sliders.slider2.button}
            </Button>
            </Link>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex items-center justify-center relative">
        <Image
          src="https://images.unsplash.com/photo-1611023924323-1e7e18f90c6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          layout="fill"
          objectFit="cover"
          priority
          alt="headerImage"
          className="relative"
        />

        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute p-5 w-full h-full flex flex-col justify-center">
          <div className="w-full lg:w-1/2 p-3 text-white">
            <h2 className="font-bold text-3xl mb-2">
              {translations.home.sliders.slider3.title}
            </h2>
            <p className="mb-3 text-lg pr-5">
              {translations.home.sliders.slider3.subTitle}
            </p>
            <Link href="/blog">
            <Button className="w-1/2 lg:w-1/4 font-bold">
              {translations.home.sliders.slider3.button}
            </Button>
            </Link>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
