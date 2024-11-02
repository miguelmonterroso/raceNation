import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import { Autoplay } from "swiper/modules";
import { MagicCard } from "@/components/ui/magic-card";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import 'swiper/css/pagination'

export default function Multi(){
    return(
        <Swiper 
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
            clickable: true,
        }}
        breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          loop={true}
        >
            <SwiperSlide className="w-full h-full items-center justify-center">
            <MagicCard className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl h-72 mt-10 w-full relative">
                <div className="absolute w-full h-full flex items-center justify-center opacity-100">
                  <p>Drag</p>
                </div>
                <Image
                  src="https://images.unsplash.com/photo-1682428585045-02f49f3ce1f0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={520}
                  height={520}
                  priority
                  className="rounded-md transition-all duration-300 opacity-30"
                  alt="image"
                />
              </MagicCard>
            </SwiperSlide>
            <SwiperSlide>
            <MagicCard className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl h-72 mt-10 w-full relative">
                <div className="absolute w-full h-full flex items-center justify-center opacity-100">
                  <p>Drift</p>
                </div>
                <Image
                  src="https://images.unsplash.com/photo-1686282230012-ffff123c96b4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={520}
                  height={520}
                  priority
                  className="rounded-md transition-all duration-300 opacity-30"
                  alt="image"
                />
              </MagicCard>
            </SwiperSlide>
            <SwiperSlide>
            <MagicCard className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl h-72 mt-10 w-full relative">
                <div className="absolute w-full h-full flex items-center justify-center opacity-100">
                  <p>Tunning</p>
                </div>
                <Image
                  src="https://images.unsplash.com/photo-1563456161948-ed14607c972e?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={520}
                  height={520}
                  priority
                  className="rounded-md transition-all duration-300 opacity-30"
                  alt="image"
                />
              </MagicCard>
            </SwiperSlide>
            <SwiperSlide>
            <MagicCard className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl h-72 mt-10 w-full relative">
                <div className="absolute w-full h-full flex items-center justify-center opacity-100">
                  <p>Circuit</p>
                </div>
                <Image
                  src="https://images.unsplash.com/photo-1624457500204-a47bebfdb725?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={520}
                  height={520}
                  priority
                  className="rounded-md transition-all duration-300 opacity-30"
                  alt="image"
                />
              </MagicCard>
            </SwiperSlide>
        </Swiper>
    )
}