"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface CarouselProps {
  hubs: { name: string; imagePath: string }[]; // Array de hubs com nome e caminho da imagem
}

const Carousel: React.FC<CarouselProps> = ({ hubs }) => {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 my-12">
      <h3 className="text-center text-orange-500 font-bold text-2xl mb-6">Hubs Cadastrados</h3>
      <Swiper
        spaceBetween={20} // Espaçamento entre os slides
        slidesPerView={4} // Mostra quatro hubs por slide
        autoplay={{
          delay: 3000, // 3 segundos entre os slides
          disableOnInteraction: false,
        }}
        loop={true} // Repetição infinita
        navigation // Botões de navegação (prev/next)
        modules={[Navigation, Autoplay]}
        className="h-full"
      >
        {hubs.map((hub, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center py-4 px-2">
            <div className="flex flex-col items-center justify-center bg-transparent p-2 rounded-lg shadow-md">
              <img
                src={hub.imagePath}
                alt={hub.name}
                className="w-40 h-42 object-cover py-5"
                style={{
                  imageRendering: "auto", // Garante maior nitidez
                }}
              />
              <p className="text-center text-black font-semibold text-base">{hub.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
