"use client";

import { useEffect } from "react";

export default function OwlCarouselInitializer() {
  useEffect(() => {
    const initializeCarousels = () => {
      const carousels = ['#carousel1', '#carousel2', '#carousel3', '#carousel4', '#carousel5'];
      carousels.forEach((id) => {
        if ($(id).length) {
          $(id).owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            dots: true,
            navText: ['←', '→'], // Ícones para navegação
            responsive: {
              0: { items: 1 },
              600: { items: 2 },
              1000: { items: 3 },
            },
          });
        }
      });
    };

    // Aguarda o DOM estar pronto para inicializar
    if (typeof window !== "undefined" && typeof $ !== "undefined") {
      $(document).ready(initializeCarousels);
    }
  }, []);

  return null;
}
