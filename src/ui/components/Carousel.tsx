"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

interface CarouselProps {
  hubs: { id: string; name: string; imagePath: string }[];
  carouselTitle: string // Inclui o ID do hub,
  carouselLink: string
}

const Carousel: React.FC<CarouselProps> = ({ hubs, carouselTitle, carouselLink }) => {
  return (
    <div className="py-10 bg-transparent">
      <h3 className="text-center text-orange-600 text-2xl mb-6">{carouselTitle}</h3>
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation
        modules={[Navigation, Autoplay]}
        className="mx-auto"
        style={{
          paddingTop: "30px",
          background: "transparent",
        }}
      >
        {hubs.map((hub) => (
          <SwiperSlide key={hub.id}>
            <Link href={`${carouselLink}${hub.id}`} className="block">
              <div className="flex flex-col items-center justify-center bg-transparent">
                <img
                  src={hub.imagePath}
                  alt={hub.name}
                  className="w-32 h-32 object-contain"
                />
                <p className="mt-3 text-center text-gray-800 font-semibold text-sm">
                  {hub.name}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
