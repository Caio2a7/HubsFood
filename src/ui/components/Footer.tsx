"use client";
import React from "react";

const Footer: React.FC = () => {
  return (
    <>
      <div className="w-full bg-[#FFDED5] px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <img
              src="/imagens/logoInferior.png"
              alt="Logo Inferior"
              className="h-24 md:h-28"
            />
          </div>
          {/* Links e Contatos */}
          <div className="flex flex-col md:flex-row gap-12 me-28">
            {/* Links */}
            <div className="flex flex-col">
              <span className="text-[#FF3700] font-bold text-lg mb-4">Links</span>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg" alt="Instagram" className="h-6" />
                  <a
                    href="https://www.instagram.com/"
                    className="text-[#FF7A55] font-semibold text-base hover:underline hover:text-[#FF3700] transition"
                  >
                    Instagram
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEU7V53///8yUZojR5bi5u+GlL45VZxCXqHd4e01U5tvgLMnSZbO1ORZb6rr7vU3VJwtTZi5wdmSn8SvudT19vrx8/instB/j7weRJR1hraMmsJidq2+xtzX3OrK0OKgrMxbcatPZ6Zleq8ANY9428BgAAAD/ElEQVR4nO3d23KbMBSFYSGwMAgEBp/jHJy+/zsW7LrtRYbIEGlvadZ/05uU8A02iiXAIvlT1ZW5iKW87KoHTNz/6XMtlaLesR9LKanz/j+hqXU8ukdK1+YhzBpJvTtOkk12F5qmod4XRzWNuQnrgnpPnFXUo7DX1PvhMN0Pwjy+k8y/VJ6IKuZDOBzESnRxnkcfyU6UMb9Ih5dpKaJ+G45vROo9QAghhBBCCCGEEEKIvEK2Ok3139JbWrdDUhYq6PVOJbUWL6v9pVqb3fbWbmeybP1avV02/Xu3Or1c8/GHgky1ab66ZMm3bc1rgLOhw9H72Fvo/hTcfLZq225tzQtQ2Ir+GV5wwlbun/SFJVTpYfc0MCShFG/P+0IS6s/tHGA4Qt3N8gUjVMdnT6GBCZW+zAUGIkw3s4FhCPXzo2BYwna1ABiCcLzyLGqhak3kQj17nAhEWLwsA/IXHp/6MBigUB4WArkLVWs/XRGmcPkh5C5Ml74LuQuLj8VA5kK94C/uIIRKzvtYH46wOC0H8hb+xIuUuXDG5GFQwub6A0DWQnl+irI16+qLOK89tfZvw93mcC30l1ErptK2f9CsTzrI+1tVYTkantNAb1tSVzvgZ0u9p3OTpRWwDBZoeSrdpNT7Ob/Wah445BuUrQaLDevR4Ju0zYJoGfI92Lr6HrgN+UVqNYOxDvlFKlKLabZL9MJ9uIOhsBOGfZu5jfAcvXAFIesghJB/EELIPwgh5B+EEPIPQgj5ByGE/ItDqCY6WgmntsDhTud8IptLS8+TWxij9RV2q7xLymin/T0I36IX9rQLGx6ExAsbHoSn6IU17SKxByGpz4fQEK+guhdSr/O7FxIPhx6E1Ov87oXUq+DuhdSXTLkXXok/PrkXtrELDfUlU86Fr9ELL9QXhTkXvkcvJJ+Kcy58ob6C2LmQ/K4u18It9XDoXJiR34vhWkj/RVWuhRvqwcK5kP4aadfCE/Vg4VxYU59KnQupfc6FO/Lh0LWQeirRvZB6KnFIfWbriSxudDYT/z17Jx8shoP49S30935ZrHIfjhMbYACcLo5rMaaCEEL+QQgh/yCEkH8QQsg/CCHkH4QQ8g9CCPkHIYT8gxBC/kEIIf8ghJB/EELIPwgh5B+EEPIPQgj5ByGE/IMQQv5BCCH/IISQfxBCyD8IIeQfhBDyD0II+QchhPzzKCR66pkvocpFGbmwFEQPlPIllJ0geuyZL6GuBNHjBz0JVZ6IpCc5iJ6Euh+ESU3x4DM/wqJORqFpCL5EwYuwacxNmGSF//OpD6Esxl8yChNTa9+nG/dCpWuTPIRJ0udaekW6FSoldd7ftyIem6u60ucXRLkV5mVXPbbyG8lbTVu7+lVZAAAAAElFTkSuQmCC" alt="Facebook" className="h-6" />
                  <a
                    href="https://www.facebook.com/"
                    className="text-[#FF7A55] font-semibold text-base hover:underline hover:text-[#FF3700] transition"
                  >
                    Facebook
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" className="h-6" />
                  <a
                    href="https://github.com/"
                    className="text-[#FF7A55] font-semibold text-base hover:underline hover:text-[#FF3700] transition"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            {/* Segunda seção de Links */}
            <div className="flex flex-col mx-20">
              <span className="text-[#FF3700] font-bold text-lg mb-4">Parceiros</span>
              <ul className="space-y-4">
                <li className="text-[#FF7A55] font-semibold text-base">Bobs</li>
                <li className="text-[#FF7A55] font-semibold text-base">Giraffas</li>
                <li className="text-[#FF7A55] font-semibold text-base">MacDonalds</li>
                <li className="text-[#FF7A55] font-semibold text-base">Burguer King</li>
              </ul>
            </div>
            {/* Terceira seção de Links */}
           
            {/* Contatos */}
            <div className="flex flex-col">
              <span className="text-[#FF3700] font-bold text-lg mb-4">Contatos</span>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <img src="/imagens/pinLocation.png" alt="Localização" className="h-6" />
                  <span className="text-[#FF7A55] font-semibold text-base">
                    3º piso do Instituto Metrópole Digital
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <img src="/imagens/pinPhone.png" alt="Telefone" className="h-6" />
                  <span className="text-[#FF7A55] font-semibold text-base">(84) 9 8888-8888</span>
                </li>
                <li className="flex items-center gap-3">
                  <img src="/imagens/pinEmail.png" alt="Email" className="h-6" />
                  <span className="text-[#FF7A55] font-semibold text-base">
                    hubsfood@gmail.com
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <img src="/imagens/pinHorario.png" alt="Horário" className="h-6" />
                  <span className="text-[#FF7A55] font-semibold text-base">24h</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#FF3700] text-center py-4">
        <span className="text-white text-sm font-bold">
          Copyright @ 2024. Todos os direitos reservados.
        </span>
      </div>
    </>
  );
};

export default Footer;
