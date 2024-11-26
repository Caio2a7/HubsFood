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
    <div style={{ padding: "10px", backgroundColor: "transparent" }}>
      <Swiper
        spaceBetween={10} // Espaçamento ajustado entre os itens
        slidesPerView={4} // Mostra quatro hubs por slide
        autoplay={{
          delay: 2000, // 2 segundos entre os slides
          disableOnInteraction: false,
        }}
        loop={true} // Repetição infinita
        navigation // Botões de navegação (prev/next)
        modules={[Navigation, Autoplay]}
        style={{
          width: "37%", // Largura do slider alinhada com o conteúdo
          margin: "auto",
          paddingTop: '30px', // Centralizado na página
          background: "transparent", // Fundo transparente
        }}
      >
        {hubs.map((hub, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                display: "flex",
                flexDirection: "column", // Alinha a imagem e o texto verticalmente
                alignItems: "center", // Centraliza os itens
                justifyContent: "center", // Centraliza verticalmente
                backgroundColor: "transparent", // Fundo transparente
              }}
            >
              <img
                src={hub.imagePath}
                alt={hub.name}
                style={{
                  width: "100px", // Largura da imagem ajustada
                  height: "100px", // Altura proporcional
                  objectFit: "contain", // Garante que a imagem não distorça
                }}
              />
              <p
                style={{
                  marginTop: "10px", // Espaço entre imagem e texto
                  color: "#000", // Cor do texto
                  fontWeight: "normal",
                  fontSize: "12px", // Tamanho ajustado do texto
                  textAlign: "center", // Centraliza o texto
                }}
              >
                {hub.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
